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

const cacheNodes = async (ids, showErrors = true) => {
  const entries = [];
  await PromisePool
    .for(ids)
    .withConcurrency(10)
    .handleError(async (err, id, pool) => {
      if (showErrors) console.error(`[#${id}] ${err.message}`)
    })
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

  return entries;
}

const fetchNewest = async (latestId) => {
  const cachedKeys = Object.keys(cachedNodes);
  const cachedCount = cachedKeys.length;
  const cachedLastId = parseInt(cachedKeys[cachedCount - 1] ? cachedKeys[cachedCount - 1] : 0);
  console.info(`Last node cached was #${cachedLastId}, latestNodeId is #${latestId}.`);

  if (cachedLastId === latestId) {
    console.info("Latest node types & specialities are up-to date.");
    return;
  }

  const ids = Array.from({length: latestId - cachedLastId}, (v, k) => cachedLastId + (k + 1));
  console.info(`Fetching the type & speciality for ${ids.length} new nodes...`);
  const entries = await cacheNodes(ids);

  if (entries.length)
    console.info(`Successfully fetched ${entries.length} new types.`);

  if (entries.length !== ids.length)
    console.info(`Failed to fetch ${ids.length - entries.length} new types.`);

  return entries;

}

const fetchMissing = async (latestId) => {
  const ids = getMissingIds(latestId);
  if (!ids) return [];

  console.info(`Attempting to fetch ${ids.length} missing types...`);
  const entries = await cacheNodes(ids, false);

  if (entries.length)
    console.info(`Successfully fetched ${entries.length} missing types.`);

  if (entries.length !== ids.length)
    console.info(`Failed to fetch ${ids.length - entries.length} missing types.`);

  return entries;
}

const updateCachedNodeTypes = async (retryMissing = true) => {
  const latestId = await getNodeTotalCount() + 223; //Hacky fix

  const newest = await fetchNewest(latestId);
  const retried = retryMissing ? await fetchMissing(latestId) : {};

  await writeFile('../data/nodeTypesById.json', JSON.stringify(cachedNodes));

  return Object.keys(Object.assign({}, newest, retried));
}

const execute = async (retryMissing) => {
  const entries = await updateCachedNodeTypes(retryMissing);
  if (entries.length)
    console.info(`Successfully cached ${entries.length} new node types & specialities.`);
}

module.exports = execute;
