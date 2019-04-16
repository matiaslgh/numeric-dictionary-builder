module.exports.removeFirstHyphens = string => /[-]*(.+)/.exec(string)[1];

module.exports.isAnOption = string => {
  if (!(typeof string === 'string')) return false;
  return string.startsWith('-');
};

module.exports.getCombinations = obj => {
  const keys = Object.keys(obj);
  const combinations = [];

  keys.forEach(key => {
    const values = obj[key] instanceof Array ? obj[key] : [obj[key]];

    if (!combinations.length) {
      // Since there are no combinations yet, create object for every value in this key
      values.forEach(val => {
        combinations.push({ [key]: val });
      });
    } else {
      // First add the new key in every object in combinations with the first value
      combinations.forEach(comb => {
        comb[key] = values[0];
      });

      // Then duplicate all the combinations but with the new value for the specific key
      for (let i = 1; i < values.length; i++) {
        combinations.push(
          ...combinations.map(comb => ({
            ...comb,
            [key]: values[i],
          }))
        );
      }
    }
  });

  return combinations;
};
