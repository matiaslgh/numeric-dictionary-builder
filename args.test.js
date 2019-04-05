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
      args.option('name1', 'description1', 'default1', true, init);
      args.option('name2', 'description2', 'default2', false, init);
      args.option('name3', 'description3', 'default3', true, init);

      expect(args.opt[0]).toEqual({
        name: 'name1',
        description: 'description1',
        default_: 'default1',
        multipleUses: true,
        init,
      });
      expect(args.opt[1]).toEqual({
        name: 'name2',
        description: 'description2',
        default_: 'default2',
        multipleUses: false,
        init,
      });
      expect(args.opt[2]).toEqual({
        name: 'name3',
        description: 'description3',
        default_: 'default3',
        multipleUses: true,
        init,
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
