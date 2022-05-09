const nodesData = require('../data/nodeTypesById.json');
const summariseNodes = require('../lib/summariseNodes');
const updateCache = require('./updateCache');

const totalNodeSummary = () => {
  const nodes = Object.values(nodesData);
  const summary = summariseNodes(nodes);
  return summary;
}

const execute = async () => {
  await updateCache(false);

  const summary = totalNodeSummary();
  console.info(`Successfully summarised node counts:`);
  console.info(JSON.stringify(summary, null, 2));
}

module.exports = execute;
