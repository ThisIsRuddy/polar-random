const stripNonASCII = (str) => {
  if ((str === null) || (str === ''))
    return false;
  else
    str = str.toString();

  return str.replace(/[^\x20-\x7E]/g, '');
}

module.exports = stripNonASCII;
