const axios = require('axios');

const SNOWTRACE_API_URL = `https://api.avax.network/ext/bc/C/rpc`;

let requestCount = 0;

const apiRequest = async (data) => {
  requestCount++;
  return await axios.post(SNOWTRACE_API_URL, {
    jsonrpc: "2.0",
    method: "eth_call",
    id: requestCount,
    params: [
      {
        from: "0x0000000000000000000000000000000000000000",
        data: data,
        to: "0x0217485eb50bbd886b14f7ba5ecd0f03d3069779"
      },
      "latest"
    ]
  });
}

module.exports = apiRequest;
