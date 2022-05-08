const path = require('path');
const {PromisePool} = require('@supercharge/promise-pool');

const writeFile = require('../lib/writeFile');
const cachedEntries = require('../data/nodeTypesById.json');
const getNodeType = require('../requests/getNodeType');
const getNodeSpeciality = require('../requests/getNodeSpeciality');
const getNodeTotalCount = require('../requests/getNodeTotalCount');
const cachedNodes = require('../data/nodeTypesById.json');

const updateCachedNodeTypes = async () => {

  const cachedKeys = Object.keys(cachedNodes);
  const cachedCount = cachedKeys.length;
  const lastCachedId = parseInt(cachedKeys[cachedCount - 1]);

  const latestId = await getNodeTotalCount() + 214; //Hacky fix
  const updateCount = latestId - lastCachedId;
  console.info(`Last node cached was #${lastCachedId}, latestNodeId is #${latestId}.`);

  const ids = Array.from({length: updateCount}, (v, k) => lastCachedId + (k + 1));
  const newEntries = [];
  console.info(`Fetching the type & speciality for ${updateCount} new nodes...`);

  await PromisePool
    .for(ids)
    .withConcurrency(50)
    .handleError(async (err, id, pool) => {
      console.error(`Failed to load types for node ${id}.`);
      console.error(err.message);
    })
    .process(async (id, i, pool) => {
      console.info(`[${i}] Processing id: ${id}...`);
      const type = await getNodeType(id);
      const specialty = await getNodeSpeciality(id);

      const record = {
        id,
        type: specialty ? `${type} ${specialty}` : type,
        special: specialty
      }

      newEntries[id] = id;
      cachedEntries[id] = record;
    });

  try {
    await writeFile(path.resolve(__dirname, '../data/nodeTypesById.json'), JSON.stringify(cachedEntries, null, 2));
  } catch (e) {
    console.error(`Error storing newEntries to file ../data/nodeTypesById.json:`);
    console.error(e.message);
  }

  return Object.values(newEntries);
}

const execute = async () => {
  const newEntries = await updateCachedNodeTypes();
  console.info(`Successfully cached ${newEntries.length} new node types & specialities.`);
}

module.exports = execute;
