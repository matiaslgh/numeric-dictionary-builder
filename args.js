class Args {
  constructor() {
    this.opt = [];
  }

  option(name, description = '', default_ = '', multipleUses = false, init = false) {
    if (!name) throw new Error('A name is required');

    let arrName = name;
    if (!(name instanceof Array)) {
      arrName = [name];
    }

    arrName.forEach(n => {
      this.opt.push({
        name: n,
        description,
        default_,
        multipleUses,
        init,
      });
    });

    return this;
  }

  clean() {
    this.opt = [];
  }

  parse(argsArr) {
    if (!(argsArr instanceof Array)) throw new Error('Array expected');
  }
}

module.exports = new Args();
