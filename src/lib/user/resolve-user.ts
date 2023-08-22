import { UserDataType } from '@farcaster/hub-web';
import { prisma } from '../prisma';
import { resolveTopic } from '../topics/resolve-topic';
import { InterestType, TopicType } from '../types/topic';
import { User, userConverter, UsersMapType } from '../types/user';

export async function resolveUserFromFid(
  fid: bigint,
  {
    interestsType = 'casts'
  }: { interestsType?: 'casts' | 'reactions' } | undefined = {}
): Promise<User | null> {
  const userData = await prisma.user_data.findMany({
    where: {
      fid: fid
    }
  });

  if (userData.length === 0) {
    return null;
  }

  const userDataRaw = userData.reduce((acc: any, cur) => {
    acc = {
      ...acc,
      [cur.type]: cur.value
    };
    return acc;
  }, {});

  const followers = await prisma.links.findMany({
    where: {
      target_fid: fid,
      type: 'follow'
    },
    distinct: ['target_fid', 'fid']
  });

  const following = await prisma.links.findMany({
    where: {
      fid: fid,
      type: 'follow',
      deleted_at: null
    },
    distinct: ['target_fid', 'fid']
  });

  const castCount = await prisma.casts.aggregate({
    where: {
      fid: fid,
      deleted_at: null
    },
    _count: true
  });

  const interests = await userInterests(fid, interestsType);

  const user = userConverter.toUser({ ...userDataRaw, fid });

  return {
    ...user,
    followers: followers.map((f) => f.fid!.toString()),
    following: following.map((f) => f.target_fid!.toString()),
    totalTweets: castCount._count,
    interests
  };
}

export async function resolveUserAmbiguous(
  idOrUsername: string
): Promise<User | null> {
  let fid = Number(idOrUsername);
  if (isNaN(fid)) {
    const username = (idOrUsername as string).toLowerCase();
    const usernameData = await prisma.user_data.findFirst({
      where: {
        type: UserDataType.USERNAME,
        value: username
      }
    });
    if (usernameData) {
      fid = Number(usernameData.fid);
    } else {
      return null;
    }
  }

  return await resolveUserFromFid(BigInt(fid));
}

// TODO: Combine into one query
export async function resolveUsers(fids: bigint[]): Promise<User[]> {
  const users = await Promise.all(fids.map((fid) => resolveUserFromFid(fid)));
  return users.filter((user) => user !== null) as User[];
}

// TODO: Combine into one query
// TODO: Cache results
// TODO: Only pass minimal user data and fetch on-demand
export async function resolveUsersMap(fids: bigint[]): Promise<UsersMapType> {
  const userOrNulls = await Promise.all(
    fids.map((fid) => resolveUserFromFid(fid))
  );
  const users = userOrNulls.filter(
    (userOrNull) => userOrNull !== null
  ) as User[];
  const usersMap = users.reduce((acc: UsersMapType, cur) => {
    if (cur) {
      acc[cur.id] = cur;
    }
    return acc;
  }, {});
  return usersMap;
}

export async function userInterests(
  fid: bigint,
  type: 'casts' | 'reactions'
): Promise<InterestType[]> {
  let groups: { parent_url: string; volume: number }[] = [];

  if (type === 'casts') {
    groups = (await prisma.$queryRaw`
        SELECT 
            parent_url, 
            COUNT(*) as volume 
        FROM 
            casts 
        WHERE 
            fid = ${fid}  
            AND deleted_at IS NULL 
            AND parent_url IS NOT NULL 
        GROUP BY parent_url
        ORDER BY volume DESC
        LIMIT 5;
      `) as { parent_url: string; volume: number }[];
  } else if (type === 'reactions') {
    groups = (await prisma.$queryRaw`
        SELECT 
            c.parent_url, 
            COUNT(*) as volume 
        FROM 
            reactions r
        INNER JOIN 
            casts c ON r.target_hash = c.hash 
        WHERE 
            r.fid = ${fid}  
            AND c.deleted_at IS NULL 
            AND c.parent_url IS NOT NULL 
        GROUP BY c.parent_url
        ORDER BY volume DESC
        LIMIT 5;
      `) as { parent_url: string; volume: number }[];
  }

  const interests = (
    await Promise.all(
      groups.map(async (group) => {
        const url = group.parent_url!;
        const topic = await resolveTopic(url);
        if (!topic) {
          console.error(`Unresolved topic: ${group.parent_url}`);
        }
        return { topic, volume: Number(group.volume) };
      })
    )
  ).filter(
    ({ topic, volume }) => topic !== null && volume > 5
  ) as InterestType[];

  return interests;
}
