const nodes = require('./data/nodeTypesById.json');

const keys = Object.keys(nodes);
const cachedCount = keys.length;
const lastCachedId = keys[cachedCount - 1];
const lastCached = nodes[lastCachedId];

console.info("lastCached:", lastCached.id, lastCached.type);
