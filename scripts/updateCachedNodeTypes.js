const {PromisePool} = require('@supercharge/promise-pool');

const writeFile = require('../lib/writeFile');
const getNodeType = require('../requests/getNodeType');
const getNodeSpeciality = require('../requests/getNodeSpeciality');
const getNodeTotalCount = require('../requests/getNodeTotalCount');
const cachedNodes = require('../data/nodeTypesById.json');

const getMissingIds = (latestId) => {
  const cachedIds = Object.keys(cachedNodes);
  const allIds = Array.from(Array(latestId + 1).keys()).map(n => n.toString());

  const missingIds = allIds.filter(id => !cachedIds.includes(id));
  console.info(`Found ${missingIds.length} missing node types.`);

  return missingIds;
};

const cacheNodes = async (latestId) => {
  const ids = getMissingIds(latestId);
  console.info(`Fetching the type & speciality for ${ids.length} nodes...`);

  const entries = [];
  await PromisePool
    .for(ids)
    .withConcurrency(10)
    .handleError(async (err, id, pool) => console.error(`[${id}] ${err.message}`))
    .process(async (id, i, pool) => {
      const type = await getNodeType(id);
      const specialty = await getNodeSpeciality(id);
      entries.push(id);
      cachedNodes[id] = {
        id,
        type: specialty ? `${type} ${specialty}` : type,
        special: specialty
      };
    });

  console.info(`Successfully fetched ${entries.length} nodes.`);
  return entries;
}

const updateCachedNodeTypes = async () => {

  const cachedKeys = Object.keys(cachedNodes);
  const cachedCount = cachedKeys.length;
  const cachedLastId = parseInt(cachedKeys[cachedCount - 1] ? cachedKeys[cachedCount - 1] : 0);
  const latestId = await getNodeTotalCount() + 216; //Hacky fix
  console.info(`Last node cached was #${cachedLastId}, latestNodeId is #${latestId}.`);

  if (cachedLastId === latestId) {
    console.info("Cached node types & specialities are up-to date.");
    return;
  }

  const newEntries = await cacheNodes(latestId);
  const retriedEntries = await cacheNodes(latestId);

  await writeFile('../data/nodeTypesById.json', JSON.stringify(cachedNodes, null, 2));

  return Object.assign({}, newEntries, retriedEntries);
}

const execute = async () => {
  const entries = await updateCachedNodeTypes();
  if (entries)
    console.info(`Successfully cached ${entries.length} new node types & specialities.`);
}

module.exports = execute;
