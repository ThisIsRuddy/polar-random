const encodeIntToHex = (num) => Number(num).toString(16).padStart(64, '0');

module.exports = encodeIntToHex;
