const { removeFirstHyphens } = require('./utils');
class Args {
  constructor() {
    this.options = new Map();
    this.config = {};
  }

  option(name, description = '', default_ = '', init) {
    if (!name) throw new Error('A name is required');

    let arrName = name;
    if (!(name instanceof Array)) {
      arrName = [name];
    }

    const [realName, ...aliases] = arrName;

    this.config[realName] = default_;
    this.options.set(realName, {
      description,
      default_,
      init,
    });

    aliases.forEach(alias => {
      this.options.set(alias, {
        realName,
      });
    });

    return this;
  }

  clean() {
    this.options = new Map();
    this.config = {};
  }

  parse(params) {
    if (!(params instanceof Array)) throw new Error('Array expected');

    const paramCounter = {};
    let currentParam;

    params
      .filter((param, index) => ![0, 1].includes(index))
      .forEach(param => {
        if (param.startsWith('-')) {
          const cleanedParam = removeFirstHyphens(param);
          const opt = this.options.get(cleanedParam);
          currentParam = opt.realName ? opt.realName : cleanedParam;

          paramCounter[currentParam] = paramCounter[currentParam]
            ? paramCounter[currentParam] + 1
            : 1;
        } else {
          const theParamWasNotRepeated = paramCounter[currentParam] === 1;
          const theSameParamWasUsedTwice = paramCounter[currentParam] === 2;

          if (theParamWasNotRepeated) {
            // One param has one string/number as a value
            this.config[currentParam] = param;
          } else if (theSameParamWasUsedTwice) {
            // A param used twice makes the config to become an array with 2 values
            this.config[currentParam] = [this.config[currentParam], param];
          } else {
            // A same param used more than twice, will have more than two values
            this.config[currentParam].push(param);
          }
        }
      });

    return this.config;
  }
}

module.exports = new Args();
