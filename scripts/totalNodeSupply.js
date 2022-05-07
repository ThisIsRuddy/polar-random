const getNodeTotalCount = require('../requests/getNodeTotalCount');

const totalNodeSupply = async () => {
  try {
    const totalCount = await getNodeTotalCount();
    return totalCount;
  } catch (e) {
    console.error(`Error while fetching totalNodeCount:`);
    console.error(e.message);
  }
}

const execute = async () => {
  const totalCount = await totalNodeSupply();
  console.info(`Successfully found a total of ${totalCount} nodes.`);
}

module.exports = execute;
