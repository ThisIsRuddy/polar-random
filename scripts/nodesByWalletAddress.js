const axios = require('axios');

const encodeIntToHex = require('../lib/encodeIntToHex');
const decodeHexToASCII = require('../lib/decodeHexToASCII');
const stripNonASCII = require('../lib/stripNonASCII');

const getWalletNFTsTxs = async (walletAddr) => {
  const url = `https://api.snowtrace.io/api?module=account&action=tokennfttx&address=${walletAddr}&startblock=0&endblock=999999999&sort=asc`;
  const {data: {result: allTxs}} = await axios.get(url);

  const polarTxs = allTxs.filter(tx => tx.tokenName === 'Polar Node');

  const outTxs = polarTxs.filter(tx => tx.to !== walletAddr.toLowerCase());
  const inTxs = polarTxs.filter(tx => tx.to === walletAddr.toLowerCase());

  const outIds = outTxs.map(tx => tx.tokenID);
  const inIds = inTxs.map(tx => tx.tokenID);

  const nodeIds = inIds.filter(id => !outIds.includes(id));
  return nodeIds;
}

const getNodeType = async (id) => {
  const url = `https://api.avax.network/ext/bc/C/rpc`;
  const {data: {result: resHex}} = await axios.post(url, {
    "jsonrpc": "2.0",
    "id": 4,
    "method": "eth_call",
    "params": [
      {
        "from": "0x0000000000000000000000000000000000000000",
        "data": "0xb3ad18e2" + encodeIntToHex(id),
        "to": "0x0217485eb50bbd886b14f7ba5ecd0f03d3069779"
      },
      "latest"
    ]
  });

  const resString = decodeHexToASCII(resHex);
  const type = stripNonASCII(resString).trim();
  return type;
}

const getNodesByWalletAddress = async (walletAddr) => {
  const nftIds = await getWalletNFTsTxs(walletAddr);
  const getTypeJobs = nftIds.map(async (id) => {
    const type = await getNodeType(id);
    return {
      id,
      type
    }
  })

  const nodes = await Promise.all(getTypeJobs);
  return nodes;
}

const execute = async (paramsArgv) => {
  if (!paramsArgv[0]) {
    console.error("You must supply a wallet address to run this function.")
    process.exit(-1);
  }

  const walletAddr = paramsArgv[0];
  console.info("Wallet address:", walletAddr);

  const nodes = await getNodesByWalletAddress(walletAddr);
  console.info("Nodes found for wallet:");
  console.info(nodes);
}

module.exports = execute;
