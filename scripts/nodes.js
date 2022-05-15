const updateCache = require("./cache");
const nodesData = require("../data/nodeTypesById.json");
const getNodeCountSummary = require("../lib/getNodeCountSummary");
const getNodeIdsByWallet = require("../requests/getNodeIdsByWallet");
const getNodeById = require("../lib/getNodeById");

const runNodeCountSummary = () => {
  console.info(`Generating node count summary...`);
  const nodes = Object.values(nodesData);
  const counts = getNodeCountSummary(nodes);
  console.info(`Successfully summarised node counts:`);
  console.info(JSON.stringify(counts, null, 2));
}

const runNodesByWallet = async (walletAddr) => {
  console.info(`Finding nodes for wallet ${walletAddr}...`);

  const nodeIds = await getNodeIdsByWallet(walletAddr);
  const getTypePromises = nodeIds.map(async id => await getNodeById(id));

  const nodes = await Promise.all(getTypePromises);
  const summary = getNodeCountSummary(nodes);

  console.info("Successfully found the following nodes:");
  console.info(JSON.stringify(summary, null, 2));
}

const execute = async (paramsArgv) => {
  await updateCache(false);

  const walletAddr = paramsArgv[0];
  if (walletAddr)
    await runNodesByWallet(walletAddr);
  else
    await runNodeCountSummary();
}

module.exports = execute;
