const {PromisePool} = require('@supercharge/promise-pool');

const writeFile = require('../lib/writeFile');
const cachedWallets = require('../data/nodeWalletsById.json');
const getNodeOwnersWallet = require("../requests/getNodeOwnersWallet");
const getNodeOwnersCount = require("../requests/getNodeOwnersCount");

const fetchAndCacheWallets = async (idxs, showErrors = true) => {
  const entries = [];
  await PromisePool
    .for(idxs)
    .withConcurrency(50)
    .handleError(async (err, id, pool) => {
      if (showErrors) console.error(`[#${id}] ${err.message}`)
    })
    .process(async (idx, i, pool) => {
      const wallet = await getNodeOwnersWallet(idx);
      entries[idx] = wallet;
      cachedWallets[idx] = wallet;
      console.info(`[${i + 1}/${idxs.length}] #${idx} ${wallet}`);
    });

  return entries;
}

const fetchNewest = async (latestId) => {
  const cachedCount = cachedWallets.length - 1;
  console.info(`Last node wallet idx was #${cachedWallets.length}, latestWalletIdx is #${latestId + 1}.`);

  if (cachedCount === latestId) {
    console.info("Latest node holder wallets are up-to date.");
    return [];
  }

  const ids = Array.from({length: latestId - cachedCount}, (v, k) => cachedCount + (k + 1));
  console.info(`Fetching wallet addresses for ${ids.length} new node holders...`);
  const entries = await fetchAndCacheWallets(ids);

  if (entries.length)
    console.info(`Successfully fetched ${Object.keys(entries).length} new wallet addresses.`);

  if (Object.keys(entries).length !== ids.length)
    console.info(`Failed to fetch ${ids.length - Object.keys(entries).length} wallet addresses.`);

  return entries;
}

const cacheWallets = async () => {
  const count = await getNodeOwnersCount();
  console.log(`There are ${count} node owners.`);

  const newest = await fetchNewest(count - 1);
  await writeFile('../data/nodeWalletsById.json', JSON.stringify(cachedWallets));

  return newest;
}

const execute = async (retryMissing) => {
  const entries = await cacheWallets(retryMissing);
  if (entries.length)
    console.info(`Successfully cached ${Object.keys(entries).length} new node holder wallet addresses.`);
}

module.exports = execute;
