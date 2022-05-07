const nodesData = require("../data/nodeTypesById.json");
const summariseNodes = require("../lib/summariseNodes");

const execute = async () => {
  const nodes = Object.values(nodesData);
  const summary = summariseNodes(nodes);
  console.info(`Successfully summarised node counts:`);
  console.info(JSON.stringify(summary, null, 2));
}

module.exports = execute;
