const Web3EthAbi = require('web3-eth-abi');

const tokenIdsToTypeABI = require('../abi/tokenIdsToType.json');
const apiRequest = require('../lib/apiRequest');

const getNodeType = async (id) => {
  const data = Web3EthAbi.encodeFunctionCall(tokenIdsToTypeABI, [id]);
  const {data: {result: resHex}} = await apiRequest(data);
  const type = Web3EthAbi.decodeParameter('string', resHex);
  return type;
}

module.exports = getNodeType;
