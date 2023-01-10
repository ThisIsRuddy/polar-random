const {PromisePool} = require('@supercharge/promise-pool');

const updateOwners = require("./cacheOwners");
const getWalletBalance = require("../requests/getWalletBalance");
const getWalletRewards = require("../requests/getWalletRewards");
//const toFriendlyHex = require("../lib/toFriendlyHex");

const fetchTokensByWallets = async (wallets) => {
  const entries = [];
  await PromisePool
    .for(wallets)
    .withConcurrency(2)
    .handleError(async (err, id, pool) => {
      console.error(`[${id}] ${err.message}`)
    })
    .process(async (wallet, i, pool) => {

      if ((i + 1) % 100 === 0 || (i + 1) === wallets.length)
        console.info(`[${i + 1}/${wallets.length}] ${(((i + 1) / wallets.length) * 100).toFixed(2)}%`);

      const [balance, pending] = await Promise.all([
        getWalletBalance(wallet),
        getWalletRewards(wallet)
      ]);

      entries.push({
        wallet,
        balance: balance,
        pending: pending,
        total: balance + pending
      });
    });

  return entries;
}

const runTokensSummary = async () => {
  console.info(`Generating tokens summary...`);

  await updateOwners();
  const cachedOwners = require("../data/nodeOwnersById.json");

  const wallets = Object.values(cachedOwners);
  console.log(`Found ${wallets.length} wallet addresses.`);

  const summary = await fetchTokensByWallets(wallets);
  const top50 = summary.sort((a, b) => {
    if (a.total > b.total) return -1;
    if (a.total < b.total) return 1;
    return 0;
  }).slice(0, 50);

  console.info(`Successfully summarised the combined wallet & pending token balances for ${summary.length} wallets.`);
  top50.forEach(({wallet, total}, i) =>
    console.info(`\t [${i + 1}] ${/*toFriendlyHex(wallet)*/ wallet} ${total.toFixed(2)}`)
  );
}

const runTokensByWallet = async (wallet) => {
  console.info(`Finding tokens for wallet ${wallet}...`);

  const results = await Promise.all([
    getWalletBalance(wallet),
    getWalletRewards(wallet)
  ]);

  console.info("Successfully found the following tokens:");
  console.info(JSON.stringify({
    balance: results[0],
    pending: results[1],
    total: results[0] + results[1]
  }, null, 2));
}

const execute = async (paramsArgv) => {
  const wallet = paramsArgv[0];
  if (wallet)
    await runTokensByWallet(wallet);
  else
    await runTokensSummary();
}

module.exports = execute;
