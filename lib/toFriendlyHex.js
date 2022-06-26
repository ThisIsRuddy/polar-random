const toFriendlyHex = (hex = '') => `${hex.substring(0, 5)}..${hex.substring(hex.length - 4, hex.length)}`;

module.exports = toFriendlyHex;
