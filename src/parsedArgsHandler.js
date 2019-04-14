const dictionaryBuilder = require('./dictionaryBuilder');
const { INIT, END, BATCH_SIZE } = require('./defaults');

const validate = ({ init = INIT, end = END, batchSize = BATCH_SIZE }) => {
  const initArr = init instanceof Array ? init : [init];
  const endArr = end instanceof Array ? end : [end];

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

module.exports = function parsedArgsManager(params) {
  validate(params);
  dictionaryBuilder(params);
};
