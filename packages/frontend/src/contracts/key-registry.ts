const KEY_REGISTRY_ADDRESS =
  '0x00000000Fc1237824fb747aBDE0FF18990E59b7e' as `0x${string}`;

const KEY_REGISTRY_ABI = [
  {
    inputs: [
      { internalType: 'address', name: '_idRegistry', type: 'address' },
      { internalType: 'address', name: '_initialOwner', type: 'address' }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  { inputs: [], name: 'AlreadyMigrated', type: 'error' },
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      { internalType: 'uint256', name: 'currentNonce', type: 'uint256' }
    ],
    name: 'InvalidAccountNonce',
    type: 'error'
  },
  { inputs: [], name: 'InvalidAddress', type: 'error' },
  { inputs: [], name: 'InvalidKeyType', type: 'error' },
  { inputs: [], name: 'InvalidMetadata', type: 'error' },
  { inputs: [], name: 'InvalidMetadataType', type: 'error' },
  { inputs: [], name: 'InvalidShortString', type: 'error' },
  { inputs: [], name: 'InvalidSignature', type: 'error' },
  { inputs: [], name: 'InvalidState', type: 'error' },
  { inputs: [], name: 'OnlyTrustedCaller', type: 'error' },
  { inputs: [], name: 'Registrable', type: 'error' },
  { inputs: [], name: 'Seedable', type: 'error' },
  { inputs: [], name: 'SignatureExpired', type: 'error' },
  {
    inputs: [{ internalType: 'string', name: 'str', type: 'string' }],
    name: 'StringTooLong',
    type: 'error'
  },
  { inputs: [], name: 'Unauthorized', type: 'error' },
  {
    inputs: [
      { internalType: 'uint32', name: 'keyType', type: 'uint32' },
      { internalType: 'uint8', name: 'metadataType', type: 'uint8' }
    ],
    name: 'ValidatorNotFound',
    type: 'error'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'fid', type: 'uint256' },
      {
        indexed: true,
        internalType: 'uint32',
        name: 'keyType',
        type: 'uint32'
      },
      { indexed: true, internalType: 'bytes', name: 'key', type: 'bytes' },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'keyBytes',
        type: 'bytes'
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'metadataType',
        type: 'uint8'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'metadata',
        type: 'bytes'
      }
    ],
    name: 'Add',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'fid', type: 'uint256' },
      { indexed: true, internalType: 'bytes', name: 'key', type: 'bytes' },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'keyBytes',
        type: 'bytes'
      }
    ],
    name: 'AdminReset',
    type: 'event'
  },
  { anonymous: false, inputs: [], name: 'DisableTrustedOnly', type: 'event' },
  { anonymous: false, inputs: [], name: 'EIP712DomainChanged', type: 'event' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'keysMigratedAt',
        type: 'uint256'
      }
    ],
    name: 'Migrated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferStarted',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'Paused',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'fid', type: 'uint256' },
      { indexed: true, internalType: 'bytes', name: 'key', type: 'bytes' },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'keyBytes',
        type: 'bytes'
      }
    ],
    name: 'Remove',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'oldIdRegistry',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newIdRegistry',
        type: 'address'
      }
    ],
    name: 'SetIdRegistry',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'oldCaller',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newCaller',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      }
    ],
    name: 'SetTrustedCaller',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint32',
        name: 'keyType',
        type: 'uint32'
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'metadataType',
        type: 'uint8'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'oldValidator',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newValidator',
        type: 'address'
      }
    ],
    name: 'SetValidator',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'Unpaused',
    type: 'event'
  },
  {
    inputs: [],
    name: 'ADDTypeHASH',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'REMOVETypeHASH',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'VERSION',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint32', name: 'keyType', type: 'uint32' },
      { internalType: 'bytes', name: 'key', type: 'bytes' },
      { internalType: 'uint8', name: 'metadataType', type: 'uint8' },
      { internalType: 'bytes', name: 'metadata', type: 'bytes' }
    ],
    name: 'add',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'fidOwner', type: 'address' },
      { internalType: 'uint32', name: 'keyType', type: 'uint32' },
      { internalType: 'bytes', name: 'key', type: 'bytes' },
      { internalType: 'uint8', name: 'metadataType', type: 'uint8' },
      { internalType: 'bytes', name: 'metadata', type: 'bytes' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      { internalType: 'bytes', name: 'sig', type: 'bytes' }
    ],
    name: 'addFor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint256', name: 'fid', type: 'uint256' },
          {
            components: [
              { internalType: 'bytes', name: 'key', type: 'bytes' },
              { internalType: 'bytes', name: 'metadata', type: 'bytes' }
            ],
            internalType: 'struct IKeyRegistry.BulkAddKey[]',
            name: 'keys',
            type: 'tuple[]'
          }
        ],
        internalType: 'struct IKeyRegistry.BulkAddData[]',
        name: 'items',
        type: 'tuple[]'
      }
    ],
    name: 'bulkAddKeysForMigration',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint256', name: 'fid', type: 'uint256' },
          { internalType: 'bytes[]', name: 'keys', type: 'bytes[]' }
        ],
        internalType: 'struct IKeyRegistry.BulkResetData[]',
        name: 'items',
        type: 'tuple[]'
      }
    ],
    name: 'bulkResetKeysForMigration',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'disableTrustedOnly',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'domainSeparatorV4',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'eip712Domain',
    outputs: [
      { internalType: 'bytes1', name: 'fields', type: 'bytes1' },
      { internalType: 'string', name: 'name', type: 'string' },
      { internalType: 'string', name: 'version', type: 'string' },
      { internalType: 'uint256', name: 'chainId', type: 'uint256' },
      { internalType: 'address', name: 'verifyingContract', type: 'address' },
      { internalType: 'bytes32', name: 'salt', type: 'bytes32' },
      { internalType: 'uint256[]', name: 'extensions', type: 'uint256[]' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'gracePeriod',
    outputs: [{ internalType: 'uint24', name: '', type: 'uint24' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'structHash', type: 'bytes32' }],
    name: 'hashTypedDataV4',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'idRegistry',
    outputs: [
      { internalType: 'contract IdRegistryLike', name: '', type: 'address' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'isMigrated',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'fid', type: 'uint256' },
      { internalType: 'bytes', name: 'key', type: 'bytes' }
    ],
    name: 'keyDataOf',
    outputs: [
      {
        components: [
          {
            internalType: 'enum IKeyRegistry.KeyState',
            name: 'state',
            type: 'uint8'
          },
          { internalType: 'uint32', name: 'keyType', type: 'uint32' }
        ],
        internalType: 'struct IKeyRegistry.KeyData',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'fid', type: 'uint256' },
      { internalType: 'bytes', name: 'key', type: 'bytes' }
    ],
    name: 'keys',
    outputs: [
      {
        internalType: 'enum IKeyRegistry.KeyState',
        name: 'state',
        type: 'uint8'
      },
      { internalType: 'uint32', name: 'keyType', type: 'uint32' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'keysMigratedAt',
    outputs: [{ internalType: 'uint40', name: '', type: 'uint40' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'migrateKeys',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'nonces',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'bytes', name: 'key', type: 'bytes' }],
    name: 'remove',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'fidOwner', type: 'address' },
      { internalType: 'bytes', name: 'key', type: 'bytes' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      { internalType: 'bytes', name: 'sig', type: 'bytes' }
    ],
    name: 'removeFor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '_idRegistry', type: 'address' }],
    name: 'setIdRegistry',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: '_trustedCaller', type: 'address' }
    ],
    name: 'setTrustedCaller',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint32', name: 'keyType', type: 'uint32' },
      { internalType: 'uint8', name: 'metadataType', type: 'uint8' },
      {
        internalType: 'contract IMetadataValidator',
        name: 'validator',
        type: 'address'
      }
    ],
    name: 'setValidator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'fidOwner', type: 'address' },
      { internalType: 'uint32', name: 'keyType', type: 'uint32' },
      { internalType: 'bytes', name: 'key', type: 'bytes' },
      { internalType: 'uint8', name: 'metadataType', type: 'uint8' },
      { internalType: 'bytes', name: 'metadata', type: 'bytes' }
    ],
    name: 'trustedAdd',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'trustedCaller',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'trustedOnly',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint32', name: 'keyType', type: 'uint32' },
      { internalType: 'uint8', name: 'metadataType', type: 'uint8' }
    ],
    name: 'validators',
    outputs: [
      {
        internalType: 'contract IMetadataValidator',
        name: 'validator',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
] as const;

export const KEY_REGISTRY = {
  address: KEY_REGISTRY_ADDRESS,
  abi: KEY_REGISTRY_ABI
};
