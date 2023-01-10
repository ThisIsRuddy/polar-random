const updateNodeCache = require('./cacheNodes');
const updateOwnerCache = require('./cacheOwners');
//const toFriendlyHex = require('../lib/toFriendlyHex');

const execute = async (paramsArgv) => {
  if (!paramsArgv[0]) {
    console.error("You must supply a node type to run this function.")
    process.exit(-1);
  }

  const nodeType = paramsArgv[0];
  console.info(`Finding top 25 wallets holding ${nodeType} nodes...`);

  await updateNodeCache(false);
  await updateOwnerCache(false);

  const nodesData = require('../data/nodeTypesById.json');
  const nodes = Object.values(nodesData).filter(n => (n.type + ' ' + n.special).includes(nodeType));
  console.info(`Total ${nodeType} nodes found: ${nodes.length}...`);

  const ownersData = require('../data/nodeOwnersById.json');
  const results = {};
  nodes.forEach(n => {
    const wallet = ownersData[n];
    return !results[wallet] ? results[wallet] = 1 : results[wallet]++;
  })

  const sorted = Object.entries(results)
    .sort((a, b) => (a[1] < b[1]) ? 1 : -1)
    .slice(0, 25);

  console.info(`Successfully found top 25 wallets holding '${nodeType}' nodes:`);
  let position = 1;
  for (const [wallet, total] of sorted) {
    console.info(`\t [${position}] ${/*toFriendlyHex(wallet)*/ wallet} ${total}`)
    position++;
  }
}

module.exports = execute;
