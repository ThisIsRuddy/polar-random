const {PromisePool} = require('@supercharge/promise-pool');

const nodesData = require('../data/nodeTypesById.json');
const getNodeOwnerWallet = require('../requests/getNodeOwnerWallet');

const topWalletsByNode = async (type) => {

  const nodes = Object.values(nodesData).filter(n => n.type.includes(type));
  console.info(`Total ${type} nodes found: ${nodes.length}.`);

  const results = {};
  await PromisePool
    .for(nodes)
    .withConcurrency(50)
    .handleError(async (err, node, pool) => {
      console.error(`Failed to find owner wallet for node ${node.id}:`);
      console.error(err.message);
    })
    .process(async (node, i, pool) => {
      console.info(`[${i}] Processing node: #${node.id}...`);
      const wallet = await getNodeOwnerWallet(node.id);

      !results[wallet] ? results[wallet] = 1 : results[wallet]++;
    });

  const sorted = Object.entries(results)
    .sort((a, b) => (a[1] < b[1]) ? 1 : -1)
    .slice(0, 24);
  return Object.fromEntries(sorted);
}

const execute = async (paramsArgv) => {
  if (!paramsArgv[0]) {
    console.error("You must supply a wallet address to run this function.")
    process.exit(-1);
  }

  const nodeType = paramsArgv[0];
  console.info("Node search type:", nodeType);

  const topWallets = await topWalletsByNode(nodeType);
  console.info(`Successfully found top 25 wallets holding ${nodeType} nodes:`);
  console.info(JSON.stringify(topWallets, null, 2));
}

module.exports = execute;
