const path = require("path");

const writeFile = require("./writeFile");
const cachedEntries = require("../data/nodeTypesById.json");
const getNodeType = require("../requests/getNodeType");
const getNodeSpeciality = require("../requests/getNodeSpeciality");

const fetchAndCacheNode = async (i) => {
  const type = await getNodeType(i);
  const specialty = await getNodeSpeciality(i);

  const record = {
    id: i,
    type: specialty ? `${specialty} ${type}` : type,
    special: specialty
  }

  cachedEntries[i] = record;

  try {
    await writeFile(path.resolve(__dirname, '../data/nodeTypesById.json'), JSON.stringify(cachedEntries, null, 2));
    console.info(`Cached new node type & speciality for node ${i}.`);
  } catch (e) {
    console.error(`Error storing newEntries to file ../data/nodeTypesById.json:`);
    console.error(e.message);
  }

  return record;
}

module.exports = fetchAndCacheNode;
