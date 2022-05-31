const wallets = require('../data/nodeWalletsById.json');

const getWalletById = async (id) => {
  return wallets[id];
}

module.exports = getWalletById;
