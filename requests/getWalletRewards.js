const Web3EthAbi = require('web3-eth-abi');

const contractRequest = require('../lib/contractRequest');
const getClaimableRewardsOf = require('../abi/getClaimableRewardsOf.json');

const getWalletRewards = async (wallet) => {
  const data = Web3EthAbi.encodeFunctionCall(getClaimableRewardsOf, [wallet]);
  const {data: {result: resHex}} = await contractRequest(process.env.POLAR_REWARDS_CONTRACT, data);
  const rewards = Web3EthAbi.decodeParameter([
    {type: 'uint256', name: ''},
    {type: 'uint256', name: ''},
  ], resHex);
  return rewards[0] / process.env.TOKEN_DIVISOR;
}

module.exports = getWalletRewards;
