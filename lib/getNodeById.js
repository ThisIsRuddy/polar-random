const nodes = require('../data/nodeTypesById.json');
const fetchAndCacheNode = require('./fetchAndCacheNode');

const getNodeById = async (id) => {
  let node = nodes[id];
  if (!node)
    node = await fetchAndCacheNode(id);
  return node;
}

module.exports = getNodeById;
