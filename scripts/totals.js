//const updateNodeCache = require('./cacheNodes');
//const updateOwnerCache = require('./cacheOwners');
//const toFriendlyHex = require('../lib/toFriendlyHex');

const fs = require('fs').promises;

const execute = async () => {
  console.info(`Summarising nodes by wallet...`);

  //await updateNodeCache(false);
  //await updateOwnerCache();

  const nodesData = require('../data/nodeTypesById.json');
  const nodes = Object.values(nodesData);
  console.info(`Total nodes found: ${nodes.length}...`);

  const owners = require('../data/nodeOwnersById.json');

  const summaries = {};
  nodes.forEach(({id, type: nodeType, special: nodeSpecial}) => {
    const wallet = owners[id];
    if (!wallet) return;

    if (!summaries[wallet])
      summaries[wallet] = {
        TotalNodes: 0,
        Emissions: 0
      }

    if (!summaries[wallet][nodeType])
      summaries[wallet][nodeType] = 1;
    else
      summaries[wallet][nodeType]++;

    summaries[wallet].TotalNodes++;

    const rates = require('../data/nodeRates.json');
    let baseType = nodeType.replace(/Egg|Black|Emerald|Diamond|Ruby|Gold|Silver| /gi, '').toLowerCase();
    if(baseType === 'montblanc')
      baseType = 'montBlanc';

    const special = nodeSpecial === '' ? 'standard' : nodeSpecial.toLowerCase();
    const rate = rates[baseType][special];

    if(!rate)
      throw new Error(`Rate not found for basetype: '${baseType}' special: '${special}'`);

    summaries[wallet].Emissions += rate;
  })
  console.info(`Completed summarising...`);

  console.info(`Pivoting results...`);
  const pivot = [];
  for (const [wallet, summary] of Object.entries(summaries)) {
    pivot.push({
      Wallet: wallet,
      ...summary
    });
  }

  console.info(`Writing results to file 'totals.json'...`);
  await fs.writeFile('/var/www/polar-random/totals.json', JSON.stringify(pivot, null, 2));
  await fs.writeFile('/var/www/polar-random/totals.minified.json', JSON.stringify(pivot));
}

module.exports = execute;
