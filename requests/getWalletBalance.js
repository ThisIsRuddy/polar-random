const Web3EthAbi = require('web3-eth-abi');

const contractRequest = require('../lib/contractRequest');
const balanceOf = require('../abi/balanceOf.json');

const getWalletRewards = async (wallet) => {
  const data = Web3EthAbi.encodeFunctionCall(balanceOf, [wallet]);
  const {data: {result: resHex}} = await contractRequest(process.env.POLAR_TOKEN_CONTRACT, data);
  const balance = Web3EthAbi.decodeParameter('uint256', resHex);
  return balance / process.env.TOKEN_DIVISOR;
}

module.exports = getWalletRewards;
