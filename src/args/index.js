const { removeFirstHyphens, isAnOption } = require('../utils');
const showHelp = require('./showHelp');

/**
 * Class inspired on https://www.npmjs.com/package/args to handle the script arguments.
 * This one has a lot less features than the original,
 * but it allows you to use a same argument several times and getting an array:
 * script -a 1 -a 2 -a 3 --> { a: [1, 2, 3] }
 */
class Args {
  constructor() {
    this.clean();
  }

  /**
   * The arguments received by the script will be handled by this class only if
   * they were defined as an option using this method
   *
   * @param {string|string[]} name The script can receive args with these names
   * @param {string} description This will be shown when the help is required
   * @param {*} default_ Default value
   * @returns {Object} Returns this to be chainable
   */
  option(name, description = '', default_ = '') {
    if (!name) throw new Error('A name is required');

    let arrName = name;
    if (!(name instanceof Array)) {
      arrName = [name];
    }

    const [realName, ...aliases] = arrName;

    this.config[realName] = default_;
    this.options.set(realName, {
      default_,
    });

    aliases.forEach(alias => {
      this.options.set(alias, {
        realName,
      });
    });

    this.helpData[realName] = {
      aliases,
      description,
    };

    return this;
  }

  /**
   * Clean the state of the class instance by setting the default values to their properties
   * Useful for testing.
   */
  clean() {
    this.options = new Map();
    this.config = {};
    this.helpData = {};
  }

  /**
   * Process process.argv and returns the options names as key with their corresponding values
   * If the option has multiple names, the object will have the first one as key
   * If help is required, it will return false
   *
   * @param {string[]} _params Normally this would be process.argv
   * @returns {Object|boolean} args name as key and their values as value or false if help is required
   */
  parse(_params) {
    if (!(_params instanceof Array)) throw new Error('Array expected');

    const paramCounter = {};
    let currentConfigKey;

    const params = _params.slice(2);

    if (params.includes('--help') || params.includes('-h')) {
      this.showHelp();
      return false;
    }

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

  showHelp() {
    showHelp(this.helpData);
  }
}

module.exports = new Args();
