const { removeFirstHyphens, isAnOption } = require('./utils');
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

  parse(_params) {
    if (!(_params instanceof Array)) throw new Error('Array expected');

    const paramCounter = {};
    let currentConfigKey;

    const params = _params.slice(2);
    params.forEach((param, index) => {
      if (isAnOption(param)) {
        const previousArgIsAlsoAnOption = params[index - 1] && isAnOption(params[index - 1]);
        if (previousArgIsAlsoAnOption) this.config[currentConfigKey] = true;

        const cleanedParam = removeFirstHyphens(param);
        const isLastParam = index === params.length - 1;
        if (isLastParam) this.config[cleanedParam] = true;

        const opt = this.options.get(cleanedParam);
        currentConfigKey = opt.realName ? opt.realName : cleanedParam;

        paramCounter[currentConfigKey] = paramCounter[currentConfigKey]
          ? paramCounter[currentConfigKey] + 1
          : 1;
      } else {
        const theParamWasNotRepeated = paramCounter[currentConfigKey] === 1;
        const theSameParamWasUsedTwice = paramCounter[currentConfigKey] === 2;

        if (theParamWasNotRepeated) {
          // One param has one string/number as a value
          this.config[currentConfigKey] = param;
        } else if (theSameParamWasUsedTwice) {
          // A param used twice makes the config to become an array with 2 values
          this.config[currentConfigKey] = [this.config[currentConfigKey], param];
        } else {
          // A same param used more than twice, will have more than two values
          this.config[currentConfigKey].push(param);
        }
      }
    });

    return this.config;
  }
}

module.exports = new Args();
