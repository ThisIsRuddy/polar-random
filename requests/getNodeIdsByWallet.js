const Web3EthAbi = require("web3-eth-abi");

const apiRequest = require("../lib/apiRequest");
const tokensOfOwnerABI = require("../abi/tokensOfOwner.json");

const getNodeIdsByWallet = async (wallet) => {
  const data = Web3EthAbi.encodeFunctionCall(tokensOfOwnerABI, [wallet]);
  const {data: {result: resHex}} = await apiRequest(data);
  const nodeIds = Web3EthAbi.decodeParameter('uint256[]', resHex);
  return nodeIds;
}

module.exports = getNodeIdsByWallet;
