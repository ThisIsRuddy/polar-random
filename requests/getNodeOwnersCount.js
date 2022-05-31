const Web3EthAbi = require('web3-eth-abi');

const contractRequest = require('../lib/contractRequest');
const getNodeOwnersSize = require('../abi/getNodeOwnersSize.json');

const getNodeOwnersCount = async () => {
  const data = Web3EthAbi.encodeFunctionCall(getNodeOwnersSize, []);
  const {data: {result: resHex}} = await contractRequest(process.env.POLAR_NODES_CONTRACT, data);
  const count = Web3EthAbi.decodeParameter('uint256', resHex);
  return parseInt(count);
}

module.exports = getNodeOwnersCount;
