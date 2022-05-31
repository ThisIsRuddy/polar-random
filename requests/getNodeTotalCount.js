const Web3EthAbi = require('web3-eth-abi');

const totalSupplyABI = require('../abi/totalSupply.json');
const contractRequest = require('../lib/contractRequest');

const getNodeTotalCount = async () => {
  const data = Web3EthAbi.encodeFunctionSignature(totalSupplyABI);
  const {data: {result: resHex}} = await contractRequest(process.env.POLAR_NODES_CONTRACT, data);
  const totalCount = Web3EthAbi.decodeParameter('uint256', resHex);
  return parseInt(totalCount);
}

module.exports = getNodeTotalCount;
