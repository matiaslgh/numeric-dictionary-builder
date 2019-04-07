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
  }

  parse(argsArr) {
    if (!(argsArr instanceof Array)) throw new Error('Array expected');
  }
}

module.exports = new Args();
