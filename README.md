## Polar Random

1. `yarn install`
2. `yarn start SCRIPT_NAME PARAM_1 PARAM_2 PARAM_3`
3. `yarn start updateCache`

### updateCache - Download the latest node types
Each script will automatically get the latest node definitions but will ignore the nodes which could not be loaded. There are currently around ~212 nodes which it is not possible to load via the v3 contract for various reasons. Running this script will attempt to download the data for the missing entries.

Example:

`yarn start updateCache`

Results:

```
Attempting to load script: updateCache
Last node cached was #36039, latest totalSupply is 36042.
Fetching the type & speciality for 4 new nodes...
[0] Processing id: 36039...
[1] Processing id: 36040...
[2] Processing id: 36041...
Successfully cached 3 new node types & specialities.
Done in 0.64s.
```

### nodesByWallet - Get nodes by wallet address
Creates a summary break down by node type & speciality for the provided wallet address.

Example:

`yarn start nodesByWallet 0x6C1c0319d8dDcb0ffE1a68C5b3829Fd361587DB4`

Results:

```
Attempting to load script: nodesByWallet
Wallet address: 0xe6570BBC5da67s6d87a8s7d69asd69as6d93
Nodes found for wallet:
{                   
  "total": 120,     
  "fuji": {},       
  "montBlanc": {    
    "total": 15,    
    "standard": 15  
  },                
  ...
}
Done in 0.48s.
```

### totalNodeSupply - Get the total count of all nodes
Calls the totalNodeSupply function from the v3 contract (total differs from totalNodeSummary).
Example:

`yarn start totalNodeSupply`

Results:

```
Attempting to load script: totalNodeSupply
Successfully found a total of 36004 nodes.
Done in 0.28s.
```

### totalNodeSummary - Summarises the counts of all cached nodes 
Amalgamates all node entries into a summarised report broken down by node type & speciality.

Example:

`yarn start totalNodeSummary`

Results:

```
Attempting to load script: totalNodeSummary
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


### walletsByNode - Search for the top 25 wallet holders by node type
Generates a list of wallets holding the specified node type.

Examples:

`yarn start walletsByNode Fuji`

`yarn start walletsByNode 'Everest Diamond'`

Results:

```
Attempting to load script: walletsByNode
Node search type: Fuji Diamond
Total Fuji Diamond nodes found: 18.
[0] Processing node: #0...
[1] Processing node: #3934...
...
Successfully found top 25 wallets holding Everest Diamond nodes:
{
  "0xb8656Cf6f863eC38869cdcdB1f9E6E17608DaF20": 2,
  "0x87E856Fbc4a8642494033471BA63A8398017cda1": 1,
  ...
}
Done in 0.60s.
```
