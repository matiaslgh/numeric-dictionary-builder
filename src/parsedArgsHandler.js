const dictionaryBuilder = require('./dictionaryBuilder');
const { INIT, END } = require('./defaults');

const amountErrorMsg = "The amount of 'init' must be equal to the amount of 'end'";

const validate = ({ init = INIT, end = END }) => {
  const initArr = init instanceof Array ? init : [init];
  const endArr = end instanceof Array ? end : [end];

  if (initArr.length !== endArr.length) {
    throw new Error(amountErrorMsg);
  }
};

module.exports = function parsedArgsManager(params) {
  validate(params);
  dictionaryBuilder(params);
};
