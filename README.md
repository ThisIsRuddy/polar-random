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
Done in 0.32s.
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

### Summarises the counts of all cached nodes - summaryOfNodes

Example:

`yarn start summaryOfNodes`

Response

```
Attempting to load script: summaryOfNodes
Successfully summarised node counts:
{
  "total": 35806,
  "fuji": {
    "total": 1764,
    "standard": 1728,
    "silver": 1,
    "gold": 1,
    "diamond": 18,
    "emerald": 16
  },
  "montBlanc": {
    "total": 19998,
    "standard": 19977,
    "silver": 1,
    "gold": 1,
    "diamond": 10,
    "emerald": 9
  },
  "kilimanjaro": {
    "total": 2686,
    "standard": 2657,
    "silver": 1,
    "gold": 1,
    "diamond": 17,
    "emerald": 10
  },
  "ushuaia": {
    "total": 2170,
    "standard": 2153,
    "silver": 1,
    "gold": 1,
    "diamond": 9,
    "emerald": 6
  },
  "everest": {
    "total": 8893,
    "standard": 8596,
    "silver": 1,
    "gold": 1,
    "diamond": 220,
    "emerald": 47,
    "ruby": 28
  },
  "olympus": {
    "total": 295,
    "standard": 276,
    "diamond": 9,
    "emerald": 6,
    "black": 2,
    "egg": 2
  }
}
Done in 0.10s.
```
