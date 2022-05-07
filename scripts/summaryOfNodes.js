const nodesData = require("../data/nodeTypesById.json");

const getTypeSummary = (nodes) => {
  const results = {
    total: nodes.length
  };

  const standard = nodes.filter(n => n.special === '');
  if (standard.length) results.standard = standard.length;

  const silver = nodes.filter(n => n.special === 'Silver');
  if (silver.length) results.silver = silver.length;

  const gold = nodes.filter(n => n.special === 'Gold');
  if (gold.length) results.gold = gold.length;

  const diamond = nodes.filter(n => n.special === 'Diamond');
  if (diamond.length) results.diamond = diamond.length;

  const emerald = nodes.filter(n => n.special === 'Emerald');
  if (emerald.length) results.emerald = emerald.length;

  const ruby = nodes.filter(n => n.special === 'Ruby');
  if (ruby.length) results.ruby = ruby.length;

  const black = nodes.filter(n => n.special === 'Black');
  if (black.length) results.black = black.length;

  const egg = nodes.filter(n => n.special === 'Egg');
  if (egg.length) results.egg = egg.length;

  return results;
}

const summaryOfNodes = async (nodes) => {
  const total = nodes.length;
  const fuji = nodes.filter(n => n.type.includes('Fuji'));
  const montBlanc = nodes.filter(n => n.type.includes('Mont Blanc'));
  const kilimanjaro = nodes.filter(n => n.type.includes('Kilimanjaro'));
  const ushuaia = nodes.filter(n => n.type.includes('Ushuaia'));
  const everest = nodes.filter(n => n.type.includes('Everest'));
  const olympus = nodes.filter(n => n.type.includes('Olympus'));

  return {
    total,
    fuji: getTypeSummary(fuji),
    montBlanc: getTypeSummary(montBlanc),
    kilimanjaro: getTypeSummary(kilimanjaro),
    ushuaia: getTypeSummary(ushuaia),
    everest: getTypeSummary(everest),
    olympus: getTypeSummary(olympus)
  }
}

const execute = async () => {
  const nodes = Object.values(nodesData);
  const summary = await summaryOfNodes(nodes);
  console.info(`Successfully summarised node counts:`);
  console.info(JSON.stringify(summary, null, 2));
}

module.exports = execute;
