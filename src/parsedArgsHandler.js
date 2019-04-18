const dictionaryBuilder = require('./dictionaryBuilder');
const { getCombinations, getValueOrDefaultAsArray } = require('./utils');
const { INIT, END, BATCH_SIZE } = require('./defaults');

const validate = ({ batchSize = BATCH_SIZE, ...params }) => {
  const initArr = getValueOrDefaultAsArray(params, 'init', INIT);
  const endArr = getValueOrDefaultAsArray(params, 'end', END);

  if (initArr.length !== endArr.length) {
    throw new Error("The amount of 'init' must be equal to the amount of 'end'");
  }

  const notANumber = initArr
    .concat(endArr)
    .concat(batchSize)
    .some(ele => isNaN(parseInt(ele)));

  if (notANumber || typeof batchSize === 'object') {
    throw new Error('init, end and batchSize only accept numbers');
  }
};

module.exports = function parsedArgsHandler(params) {
  validate(params);

  const initArr = getValueOrDefaultAsArray(params, 'init');
  const endArr = getValueOrDefaultAsArray(params, 'end');
  const combinations = [];

  for (let i = 0; i < initArr.length; i++) {
    combinations.push(
      ...getCombinations({
        ...params,
        init: initArr[i],
        end: endArr[i],
      })
    );
  }

  combinations.forEach(comb => {
    dictionaryBuilder(comb);
  });
};
