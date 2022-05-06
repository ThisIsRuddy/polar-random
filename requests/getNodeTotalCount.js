const Web3EthAbi = require('web3-eth-abi');

const totalSupplyABI = require("../abi/totalSupply.json");
const apiRequest = require("../lib/apiRequest");

const getNodeTotalCount = async () => {
  const data = Web3EthAbi.encodeFunctionSignature(totalSupplyABI);
  const {data: {result: resHex}} = await apiRequest(data);
  const totalCount = Web3EthAbi.decodeParameter('uint256', resHex);
  return totalCount;
}

module.exports = getNodeTotalCount;
