const Web3EthAbi = require('web3-eth-abi');

const ownerOfABI = require('../abi/ownerOf.json');
const apiRequest = require('../lib/apiRequest');

const getNodeOwnerWallet = async (id) => {
  const data = Web3EthAbi.encodeFunctionCall(ownerOfABI, [id]);
  const {data: {result: resHex}} = await apiRequest(data);
  const type = Web3EthAbi.decodeParameter('address', resHex);
  return type;
}

module.exports = getNodeOwnerWallet;
