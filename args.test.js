const args = require('./args');

describe('Args class', () => {
  afterEach(() => {
    args.clean();
  });

  it('creates an empty Map of options', () => {
    expect(args.options.size).toBe(0);
  });

  it('creates an empty Object as a config', () => {
    expect(args.config).toEqual({});
  });

  describe('args.option()', () => {
    it('throws an error if no name is provided', () => {
      expect(() => {
        args.option();
      }).toThrowError('A name is required');
    });

    it('accepts an array of names', () => {
      const names = ['name_1', 'name_2'];
      const config = ['a description', 'default value'];
      args.option(names, ...config);

      expect(args.options.get(names[0])).toEqual({
        description: config[0],
        default_: config[1],
      });

      expect(args.options.get(names[1])).toEqual({
        realName: names[0],
      });
    });

    it('adds data into internal Map', () => {
      const init = jest.fn();
      const configs = [
        ['name1', 'description1', 'default1', init],
        ['name2', 'description2', 'default2', init],
        ['name3', 'description3', 'default3', init],
      ];

      configs.forEach(config => {
        args.option(...config);
      });

      configs.forEach(config => {
        expect(args.options.get(config[0])).toEqual({
          description: config[1],
          default_: config[2],
          init: config[3],
        });
      });

      expect(args.options.size).toBe(3);
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
    it('removes all the options from the internal Map', () => {
      args.option('test');
      expect(args.options.size).toBe(1);
      args.clean();
      expect(args.options.size).toBe(0);
    });
  });

  describe('args.parse(...)', () => {
    it('throws an Error if the param is not an Array', () => {
      const params = [1, {}, 'string', null];

      // Last param will be undefined, that's why params.length (without -1)
      for (let i = 0; i <= params.length; i++) {
        expect(() => {
          args.parse(params[i]);
        }).toThrowError('Array expected');
      }
    });
  });
});
