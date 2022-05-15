const rates = require('../data/nodeRates.json');

const getNodeEmissionsRate = (type, specialty) => rates[type][specialty];

module.exports = getNodeEmissionsRate;
