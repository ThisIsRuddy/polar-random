const fs = require('fs');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);

module.exports = writeFile;
