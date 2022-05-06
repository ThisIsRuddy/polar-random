const Web3EthAbi = require('web3-eth-abi');

const getAttributeABI = require('../abi/getAttribute.json');
const apiRequest = require('../lib/apiRequest');

const getNodeSpecialty = async (id) => {
  const data = Web3EthAbi.encodeFunctionCall(getAttributeABI, [id]);
  const {data: {result: resHex}} = await apiRequest(data);
  const speciality = Web3EthAbi.decodeParameter('string', resHex);
  return speciality;
}

module.exports = getNodeSpecialty;
