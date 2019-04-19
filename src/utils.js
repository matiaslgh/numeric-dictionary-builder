/**
 * Remove the first hyphens:
 * "-h" --> "h"; "---a-b" --> "a-b"
 *
 * @param {string} string
 * @returns {string} without the first hyphens
 */
module.exports.removeFirstHyphens = string => /[-]*(.+)/.exec(string)[1];

/**
 * Check if the string it's an option
 *
 * @param {string} string
 * @returns {boolean} true if it's an option. false otherwise
 */
module.exports.isAnOption = string => {
  if (!(typeof string === 'string')) return false;
  return string.startsWith('-');
};

/**
 * Given an object which contains arrays, returns an array of objects with primitive values.
 * { a: [1, 2], b: "c" } --> [{ a: 1, b: "c"}, { a: 2, b: "c" }]
 *
 * @param {Object} obj
 * @returns {Object[]} with every possible config
 */
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

/**
 * Extracts a value from the object by searching for the key.
 * If it's not there, the default value will be returned.
 *
 * @param {Object} obj
 * @param {string} key to extract value
 * @param {*} default_ to use if the key is not present in the object
 * @returns {Array} found/default value as an array
 */
module.exports.getValueOrDefaultAsArray = (obj, key, default_) => {
  if (typeof obj[key] === 'undefined') {
    return [default_];
  }

  return obj[key] instanceof Array ? obj[key] : [obj[key]];
};
