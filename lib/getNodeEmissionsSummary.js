const getNodeEmissionsRate = require('../lib/getNodeEmissionsRate');

const getNodeEmissionsSummary = (allNodeCounts) => {

  let summary = {
    total: 0
  };

  for (const [type, specialties] of Object.entries(allNodeCounts)) {
    if (type === "total") continue;

    let nodeTypeTotalEmissions = 0;
    for (const [specialty, count] of Object.entries(specialties)) {
      if (specialty === "total") continue;

      const rate = getNodeEmissionsRate(type, specialty);
      const emissions = rate * count;

      if (!summary[type])
        summary[type] = {
          [specialty]: {
            rate,
            count,
            total: emissions
          }
        };
      else if (!summary[type][specialty])
        summary[type][specialty] = {
          rate,
          count,
          total: emissions
        };

      nodeTypeTotalEmissions = nodeTypeTotalEmissions + emissions;
      summary.total = summary.total + emissions;
    }

    if (nodeTypeTotalEmissions > 0)
      summary[type].total = nodeTypeTotalEmissions;
  }

  return summary;
}

module.exports = getNodeEmissionsSummary;
