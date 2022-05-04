const stripNonASCII = require('./stripNonASCII');

const decodeHexToASCII = (hex) => {
  const hexString = hex.toString();//force conversion
  let str = '';
  for (let i = 0; i < hexString.length; i += 2)
    str += String.fromCharCode(parseInt(hexString.substr(i, 2), 16));
  return stripNonASCII(str);
}

module.exports = decodeHexToASCII;
