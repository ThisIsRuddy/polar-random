const Web3EthAbi = require('web3-eth-abi');

const tokenIdsToTypeABI = require('../abi/tokenIdsToType.json');
const contractRequest = require('../lib/contractRequest');

const getNodeType = async (id) => {
  const data = Web3EthAbi.encodeFunctionCall(tokenIdsToTypeABI, [id]);
  const {data: {result: resHex}} = await contractRequest(process.env.POLAR_NODES_CONTRACT, data);
  const type = Web3EthAbi.decodeParameter('string', resHex);
  return type;
}

module.exports = getNodeType;
