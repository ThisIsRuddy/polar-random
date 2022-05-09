const fs = require('fs');
const util = require('util');
const path = require("path");

const sourceWriteFile = util.promisify(fs.writeFile);

const writeFile = async (filePath, content) => {
  try {
    console.error(`Attempting to store to file ${filePath}:`);
    await sourceWriteFile(path.resolve(__dirname, filePath), content);
  } catch (e) {
    console.error(`Error storing to file .${filePath}:`);
    console.error(e.message);
  }
}

module.exports = writeFile;
