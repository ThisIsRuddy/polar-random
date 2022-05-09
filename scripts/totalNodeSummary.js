const nodesData = require('../data/nodeTypesById.json');
const summariseNodes = require('../lib/summariseNodes');
const updateCachedNodeTypes = require('./updateCachedNodeTypes');

const totalNodeSummary = () => {
  const nodes = Object.values(nodesData);
  const summary = summariseNodes(nodes);
  return summary;
}

const execute = async () => {
  await updateCachedNodeTypes();
  const summary = totalNodeSummary();
  console.info(`Successfully summarised node counts:`);
  console.info(JSON.stringify(summary, null, 2));
}

module.exports = execute;
