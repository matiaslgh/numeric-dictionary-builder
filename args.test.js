const args = require('./args');

describe('Args class', () => {
  afterEach(() => {
    args.clean();
  });

  it('creates an empty array of options', () => {
    expect(args.opt.length).toBe(0);
  });

  describe('args.option()', () => {
    it('throws an error if no name is provided', () => {
      expect(() => {
        args.option();
      }).toThrowError('A name is required');
    });

    it('accepts an array of names', () => {
      const names = ['name_1', 'name_2'];
      const config = ['a description', 'default value', false];
      args.option(names, ...config);

      names.forEach((name, index) => {
        expect(args.opt[index]).toEqual({
          name: name,
          description: config[0],
          default_: config[1],
          multipleUses: config[2],
          init: false,
        });
      });
    });

    it('adds data into internal array', () => {
      const init = jest.fn();
      const configs = [
        ['name1', 'description1', 'default1', true, init],
        ['name2', 'description2', 'default2', false, init],
        ['name3', 'description3', 'default3', true, init],
      ];

      configs.forEach(config => {
        args.option(...config);
      });

      configs.forEach((config, index) => {
        expect(args.opt[index]).toEqual({
          name: config[0],
          description: config[1],
          default_: config[2],
          multipleUses: config[3],
          init: config[4],
        });
      });

      expect(args.opt.length).toBe(3);
    });

    it('is chainable', () => {
      expect(
        args
          .option('a')
          .option('b')
          .option('c').option
      ).toBeInstanceOf(Function);
    });
  });

  describe('args.clean()', () => {
    it('removes all the options from the internal array', () => {
      args.option('test');
      expect(args.opt.length).toBe(1);
      args.clean();
      expect(args.opt.length).toBe(0);
    });
  });
});
