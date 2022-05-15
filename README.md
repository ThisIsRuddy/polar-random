## Polar Random
### Installation
1. `yarn install`
2. `yarn start SCRIPT_NAME PARAM_1 PARAM_2 PARAM_3`
3. `yarn start cache`

### Commands
`cache`

`nodes`

`nodes {WALLET_ADR}`

`wallets {NODE_TYPE}`

`emissions`


---

### `cache` - Update the local nodes cache
Each script will automatically get the latest node definitions but will ignore the nodes which could not be loaded. There are currently around ~212 nodes which it is not possible to load via the v3 contract for various reasons. Running this script will attempt to download the data for the missing entries.

Example:

`yarn start cache`

Results:

```
Attempting to load script: cache
Last node cached was #37154, latestNodeId is #37156.
Fetching the type & speciality for 2 new nodes...
Successfully fetched 2 new types.
Attempting to fetch 212 missing node types...
Failed to fetch 212 missing node types.
Attempting to store to file ../data/nodeTypesById.json:
Attempting to store to file ../data/missingNodes.json:
Successfully cached 2 new node types & specialities.
Done in 32.97s.
```

---

### `nodes` - Summarises the counts of all cached nodes 
Amalgamates all node entries into a summarised report broken down by node type & speciality.

Example:

`yarn start nodes`

Results:

```
Attempting to load script: nodes
Generating node count summary...                    
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

---

### `nodes {WALLET_ADR}` - Get nodes by wallet address
Creates a summary break down by node type & speciality for the provided wallet address.

Example:

`yarn start nodes 0x6C1c0319d8dDcb0ffE1a68C5b3829Fd361587DB4`

Results:

```
Attempting to load script: nodes              
Finding nodes for wallet 0x6C1c0319d8dDcb0ffE1a68C5b3829Fd361587DB4...
Successfully found the following nodes:
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

---

### `wallets {NODE_TYPE}` - Find the top 25 wallets by node type
Generates a list of top wallets holding the specified node type.

Examples:

`yarn start wallets Fuji`

`yarn start wallets 'Everest Diamond'`

Results:

```
Attempting to load script: wallets
Finding top 25 wallets holding Olympus nodes...
Total Olympus nodes found: 401...
Searching for node owners...
Successfully found top 25 wallets holding Olympus nodes:
{
  "0xb8656Cf6f863eC38869cdcdB1f9E6E17608DaF20": 2,
  "0x6C1c0319d8dDcb0ffE1a68C5b3829Fd361587DB4": 1,
  ...
}
Done in 0.60s.
```

---

### `emissions` - Emissions summary
Generates a summary of emissions broke down by node type & specialty, includes totals.

Example:

`yarn start emissions Fuji`

Results:

```
Attempting to load script: emissions
Generating node emissions summary...   
Successfully summarised node emissions:
{                                      
  "total": 420106.95375,               
  "fuji": {                            
    "standard": {                      
      "rate": 0.3825,                  
      "count": 1851,                   
      "total": 708.0075                
    },                                 
    "silver": {                        
      "rate": 0.595,                   
      "count": 1,                      
      "total": 0.595                   
    },
    ...
  },
  "montBlanc": {
    "standard": {
      "rate": 0.8415,
      "count": 20787,
      "total": 17492.2605
    },
    "silver": {
      "rate": 1.122,
      "count": 1,
      "total": 1.122
    },
    ...
  },
  ...
}          
Done in 2.5s.
```
