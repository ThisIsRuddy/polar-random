## Polar Random

1. `yarn install`
2. `yarn start SCRIPT_NAME PARAM_1 PARAM_2 PARAM_3`

### Get nodes by wallet address - nodesByWalletAddress

Example:

`yarn start nodesByWalletAddress 0x6C1c0319d8dDcb0ffE1a68C5b3829Fd361587DB4`

Response:

```
Attempting to load script: nodesByWalletAddress
Wallet address: 0x6C1c0319d8dDcb0ffE1a68C5b3829Fd361587DB4
Nodes found for wallet:
[
    { id: '199', type: 'Everest', special: '' },
    { id: '1186', type: 'Emerald Mont Blanc', special: 'Emerald' },
    { id: '1187', type: 'Mont Blanc', special: '' },
    { id: '1188', type: 'Ruby Everest', special: 'Ruby' },
    { id: '1189', type: 'Mont Blanc', special: '' }
]
Done in 0.80s.
```

### Get the total count of all nodes - totalNodeSupply

Example:

`yarn start totalNodeSupply`

Response

```
Attempting to load script: totalNodeSupply
Successfully found a total of 36004 nodes.
Done in 0.28s.
```

### Download the latest node types - updateCachedNodeTypes

Example:

`yarn start updateCachedNodeTypes`

Response

```
Attempting to load script: updateCachedNodeTypes
Fetching the type & speciality for 213 new nodes...
[0] Processing id: 35798...
[1] Processing id: 35799...
...
Successfully cached 210 new node types & specialities.
Done in 6.92s.
```
