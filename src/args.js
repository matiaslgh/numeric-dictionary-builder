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

    let currentOption;

    params
      .filter((param, index) => ![0, 1].includes(index))
      .forEach(param => {
        if (param.startsWith('-')) {
          currentOption = removeFirstHyphens(param);
        } else {
          this.config[currentOption] = param;
        }
      });

    return this.config;
  }
}

module.exports = new Args();
