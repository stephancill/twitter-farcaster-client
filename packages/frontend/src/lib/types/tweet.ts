import { Embed as FarcasterEmbed } from '@farcaster/hub-web';
import { Embed as ModEmbed } from '@mod-protocol/core';
import { Cast } from '@selekt/db';
import { TopicType } from './topic';
import { isValidImageExtension } from '../validation';
import type { ImagesPreview } from './file';
import { BaseResponse } from './responses';
import type { User, UsersMapType } from './user';

export type Mention = {
  userId: string;
  position: number;
  username?: string;
  user?: User;
};

export type ExternalEmbed = {
  title?: string;
  text?: string;
  icon?: string;
  image?: string;
  provider?: string;
  url: string;
};

export type Tweet = {
  id: string;
  text: string | null;
  images: ImagesPreview | null;
  embeds: ModEmbed[];
  parent: { id: string; username?: string; userId?: string } | null;
  userLikes: string[];
  createdBy: string;
  user: User | null;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  userReplies: number;
  userRetweets: string[];
  mentions: Mention[];
  client: string | null;
  topic: TopicType | null;
  topicUrl: string | null;
  retweet: { username?: string; userId?: string } | null;
};

type TweetWithUsers = Tweet & { users: UsersMapType<User> };

export type TweetResponse = BaseResponse<TweetWithUsers>;

export const populateTweetUsers = (
  tweet: Tweet,
  users: UsersMapType<User>
): Tweet => {
  // Look up parent tweet username in users object
  const resolvedParent = tweet.parent;
  if (resolvedParent && !tweet.parent?.username && tweet.parent?.userId) {
    tweet.parent.username = users[tweet.parent.userId]?.username;
  }

  // Look up mentions in users object
  const resolvedMentions = tweet.mentions.map((mention) => ({
    ...mention,
    username: users[mention.userId]?.username,
    user: users[mention.userId]
  }));

  // Look up recast username in users object
  const resolvedRetweet = tweet.retweet;
  if (
    resolvedRetweet &&
    !tweet.retweet?.username &&
    tweet.retweet?.userId &&
    users[tweet.retweet.userId]
  ) {
    tweet.retweet.username = users[tweet.retweet.userId]?.username;
  }

  const resolvedUser = users[tweet.createdBy];

  return {
    ...tweet,
    mentions: resolvedMentions,
    parent: resolvedParent,
    retweet: resolvedRetweet,
    user: resolvedUser || null
  };
};

export const tweetConverter = {
  toTweet(cast: Cast & { client?: string }): Tweet {
    // Check if cast.hash is a buffer
    const isBuffer = Buffer.isBuffer(cast.hash);

    let parent: { id: string; userId?: string } | null = null;
    if (cast.parentHash) {
      parent = {
        id: cast.parentHash.toString('hex'),
        userId: cast.parentFid?.toString()
      };
    }

    const embeds = cast.embeds as FarcasterEmbed[];

    const images =
      embeds.length > 0
        ? embeds
            .filter((embed) => embed.url && isValidImageExtension(embed.url))
            .map((embed) => ({
              src: embed.url,
              alt: '',
              id: embed.url
            }))
        : [];

    const externalEmbeds: ModEmbed[] =
      embeds.length > 0
        ? embeds
            .filter((embed) => embed.url && !isValidImageExtension(embed.url))
            .map((embed) => ({
              url: embed.url!,
              status: 'loading'
            }))
        : [];

    const mentions = cast.mentions.map(
      (userId, index): Mention => ({
        userId: userId.toString(),
        position: cast.mentionsPositions[index]!
      })
    );

    return {
      id: isBuffer
        ? cast.hash.toString('hex')
        : Buffer.from((cast.hash as any).data).toString('hex'),
      text: cast.text,
      images: images.length > 0 ? images : null,
      embeds: externalEmbeds,
      parent,
      topic: null,
      topicUrl: cast.parentUrl,
      userLikes: [],
      createdBy: cast.fid.toString(),
      user: null,
      createdAt: cast.timestamp,
      updatedAt: null,
      deletedAt: cast.deletedAt,
      userReplies: 0,
      userRetweets: [],
      mentions,
      client: cast.client || null,
      retweet: null
    } as Tweet;
  }
};
