const axios = require('axios');

const SNOWTRACE_API_URL = `https://api.avax.network/ext/bc/C/rpc`;

let requestCount = 0;

const contractRequest = async (contract, data) => {
  requestCount++;
  const url = process.env.SNOWTRACE_API_KEY ? SNOWTRACE_API_URL + `?apiKey=` + process.env.SNOWTRACE_API_KEY : SNOWTRACE_API_URL;
  return await axios.post(url, {
    jsonrpc: "2.0",
    method: "eth_call",
    id: requestCount,
    params: [
      {
        from: "0x0000000000000000000000000000000000000000",
        data: data,
        to: contract
      },
      "latest"
    ]
  });
}

module.exports = contractRequest;
