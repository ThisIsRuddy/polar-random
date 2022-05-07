## Polar Random

1. `yarn install`
2. `yarn start SCRIPT_NAME PARAM_1 PARAM_2 PARAM_3`

### Get nodes by wallet address - nodesByWalletAddress

Example:

`yarn start nodesByWalletAddress 0x6C1c0319d8dDcb0ffE1a68C5b3829Fd361587DB4`

Results:

```
Attempting to load script: nodesByWalletAddress
Wallet address: 0x6C1c0319d8dDcb0ffE1a68C5b3829Fd361587DB4
Nodes found for wallet:
[
    { id: '199', type: 'Everest', special: '' },
    { id: '1186', type: 'Mont Blanc Emerald', special: 'Emerald' },
    { id: '1187', type: 'Mont Blanc', special: '' },
    { id: '1188', type: 'Everest Ruby', special: 'Ruby' },
    { id: '1189', type: 'Mont Blanc', special: '' }
]
Done in 0.32s.
```

### Get the total count of all nodes - totalNodeSupply

Example:

`yarn start totalNodeSupply`

Results:

```
Attempting to load script: totalNodeSupply
Successfully found a total of 36004 nodes.
Done in 0.28s.
```

### Download the latest node types - updateCachedNodeTypes

Example:

`yarn start updateCachedNodeTypes`

Results:

```
Attempting to load script: updateCachedNodeTypes
Last node cached was #36039, latest totalSupply is 36042.
Fetching the type & speciality for 4 new nodes...
[0] Processing id: 36039...
[1] Processing id: 36040...
[2] Processing id: 36041...
Successfully cached 3 new node types & specialities.
Done in 0.64s.
```

### Summarises the counts of all cached nodes - summaryOfNodes

Example:

`yarn start summaryOfNodes`

Results:

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
  ...
}
Done in 0.10s.
```


### Search for the top wallet holders by node type - topWalletsByNode

Examples:

`yarn start topWalletsByNode Fuji`

`yarn start topWalletsByNode 'Everest Diamond'`

Results:

```
Attempting to load script: topWalletsByNode
Node search type: Fuji Diamond
Total Fuji Diamond nodes found: 18.
[0] Processing node: #0...
[1] Processing node: #3934...
...
Successfully found top wallets holding Fuji Diamond nodes:
{
  "0xb8656Cf6f863eC38869cdcdB1f9E6E17608DaF20": 2,
  "0x87E856Fbc4a8642494033471BA63A8398017cda1": 1,
  ...
}
Done in 0.60s.
```
