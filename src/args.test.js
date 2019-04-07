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
    it('removes old state of class Args', () => {
      const [key, value] = ['test', 'default'];
      args.option(key, 'decription', value);
      expect(args.options.size).toBe(1);
      expect(args.config[key]).toEqual(value);
      args.clean();
      expect(args.options.size).toBe(0);
      expect(args.config).toEqual({});
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

    it('returns an object with keys/values according the params given', () => {
      args.option('a', 'description a', 'defaultA');

      const params = ['/usr/local/bin/node', 'script.js', '-a', 'valueA'];

      expect(args.parse(params).a).toEqual('valueA');
    });

    it('returns an object with default values if the options are not specified as a param', () => {
      args.option('a', 'description a', 'default a').option('b', 'description b', 'default b');

      const params = ['/usr/local/bin/node', 'script.js'];

      expect(args.parse(params)).toEqual({
        a: 'default a',
        b: 'default b',
      });
    });

    it('returns an array of values if a param is passed more than once', () => {
      args.option(['something', 's'], 'some description...', 'default');

      const values = ['value1', 'value2', 'value3'];
      const params = [
        '/usr/local/bin/node',
        'script.js',
        '-s',
        values[0],
        '-s',
        values[1],
        '--something',
        values[2],
      ];

      expect(args.parse(params)).toEqual({
        something: values,
      });
    });

    it('works ok when the default value is explicitly passed into the function', () => {
      args.option(['something'], 'some description...', 'default');

      const values = ['value1', 'default', 'value3'];
      const params = [
        '/usr/local/bin/node',
        'script.js',
        '--something',
        values[0],
        '--something',
        values[1],
        '--something',
        values[2],
      ];

      expect(args.parse(params)).toEqual({
        something: values,
      });
    });
  });
});
