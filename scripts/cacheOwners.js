const {PromisePool} = require('@supercharge/promise-pool');

const writeFile = require('../lib/writeFile');
const cachedOwners = require('../data/nodeOwnersById.json');
const getNodeOwnerWallet = require("../requests/getNodeOwnerWallet");
const getNodeTotalCount = require("../requests/getNodeTotalCount");

const fetchAndCacheOwners = async (ids, showErrors = true) => {
  const entries = [];
  await PromisePool
    .for(ids)
    .withConcurrency(2)
    .handleError(async (err, id, pool) => {
      if (showErrors) console.error(`[#${id}] ${err.message}`)
    })
    .process(async (id, i, pool) => {
      const startTime = performance.now();
      console.info(`[${i + 1}/${ids.length}] Attempting to fetch owner #${id}...`);

      const owner = await getNodeOwnerWallet(id);
      entries.push(id);
      cachedOwners[id] = owner;
      await writeFile('../data/nodeOwnersById.json', JSON.stringify(cachedOwners));

      const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
      console.info(`[${i + 1}/${ids.length}] Fetch owner #${id} took ${elapsed}s.`);
    });

  return entries;
}

const fetchNewest = async (latestId) => {
  const cachedKeys = Object.keys(cachedOwners);
  const cachedCount = cachedKeys.length;
  const cachedLastId = parseInt(cachedKeys[cachedCount - 1] ? cachedKeys[cachedCount - 1] : 0);
  console.info(`Last node owner was #${cachedLastId}, latestNodeOwner is #${latestId}.`);

  if (cachedLastId === latestId) {
    console.info("Latest node owners are up-to date.");
    return;
  }

  const ids = Array.from({length: latestId - cachedLastId}, (v, k) => cachedLastId + (k + 1));
  console.info(`Fetching the owner for ${ids.length} new nodes...`);
  const entries = await fetchAndCacheOwners(ids);

  if (entries.length)
    console.info(`Successfully fetched ${entries.length} new owners.`);

  if (entries.length !== ids.length)
    console.info(`Failed to fetch ${ids.length - entries.length} new owners.`);

  return entries;
}

const cacheOwners = async () => {
  const latestId = await getNodeTotalCount() + 374; //Hacky fix
  return await fetchNewest(latestId);
}

const execute = async () => {
  const entries = await cacheOwners();
  if (entries.length)
    console.info(`Successfully cached ${Object.keys(entries).length} node owners wallet addresses.`);
}

module.exports = execute;
