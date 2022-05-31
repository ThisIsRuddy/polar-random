const Web3EthAbi = require('web3-eth-abi');

const contractRequest = require('../lib/contractRequest');
const owners = require('../abi/nodeOwners.json');

const getNodeIdsByWallet = async (ownerIdx) => {
  const data = Web3EthAbi.encodeFunctionCall(owners, [ownerIdx]);
  const {data: {result: resHex}} = await contractRequest(process.env.POLAR_NODES_CONTRACT, data);
  const wallet = Web3EthAbi.decodeParameter('address', resHex);
  return wallet;
}

module.exports = getNodeIdsByWallet;
