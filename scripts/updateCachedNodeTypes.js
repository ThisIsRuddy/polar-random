const path = require('path');
const {PromisePool} = require('@supercharge/promise-pool')

const writeFile = require("../lib/writeFile");
const cachedEntries = require("../data/nodeTypesById.json");
const getNodeType = require("../requests/getNodeType");
const getNodeSpeciality = require("../requests/getNodeSpeciality");
const getNodeTotalCount = require("../requests/getNodeTotalCount");

const updateCachedNodeTypes = async () => {

  const cachedCount = Object.keys(cachedEntries).length;
  const lastCached = cachedEntries[cachedCount - 1].id;
  const totalSupply = await getNodeTotalCount();

  const start = lastCached ? lastCached : 0;
  const end = totalSupply;
  const ids = Array.from({length: end - start}, (v, k) => k + start);

  const newEntries = [];

  console.info(`Fetching the type & speciality for ${end - start + 1} new nodes...`);

  await PromisePool
    .for(ids)
    .withConcurrency(100)
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
        type: specialty ? `${specialty} ${type}` : type,
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
