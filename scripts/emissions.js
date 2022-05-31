const updateCache = require('./cacheNodes');
const nodesData = require("../data/nodeTypesById.json");
const getNodeCountSummary = require("../lib/getNodeCountSummary");
const getNodeEmissionsSummary = require("../lib/getNodeEmissionsSummary");

const execute = async () => {
  await updateCache(false);
  console.info(`Generating node emissions summary...`);
  const nodes = Object.values(nodesData);
  const counts = getNodeCountSummary(nodes);
  const summary = getNodeEmissionsSummary(counts);
  console.info(`Successfully summarised node emissions:`);
  console.info(JSON.stringify(summary, null, 2));
}

module.exports = execute;
