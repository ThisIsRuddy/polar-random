const getNodeIdsByWallet = require('../requests/getNodeIdsByWallet');
const getNodeById = require('../lib/getNodeById');
const summariseNodes = require('../lib/summariseNodes');

const nodesByWallet = async (walletAddr) => {
  const nodeIds = await getNodeIdsByWallet(walletAddr);
  const getTypeJobs = nodeIds.map(async id => await getNodeById(id));

  const nodes = await Promise.all(getTypeJobs);
  return nodes;
}

const execute = async (paramsArgv) => {
  if (!paramsArgv[0]) {
    console.error("You must supply a wallet address to run this function.")
    process.exit(-1);
  }

  const walletAddr = paramsArgv[0];
  console.info("Wallet address:", walletAddr);

  const nodes = await nodesByWallet(walletAddr);
  const summary = summariseNodes(nodes);

  console.info("Nodes found for wallet:");
  console.info(JSON.stringify(summary, null, 2));
}

module.exports = execute;
