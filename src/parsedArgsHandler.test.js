const paHandler = require('./parsedArgsHandler');
let dictionaryBuilder = require('./dictionaryBuilder');

jest.mock('./dictionaryBuilder');

describe('parsedArgsHandler(...)', () => {
  beforeEach(() => {
    dictionaryBuilder.mockClear();
  });

  it('calls dictionaryBuilder once when there is only one set of arguments', () => {
    const params = {
      init: 0,
      end: 50,
      prefix: 'pre',
      suffix: 'suf',
      batchSize: 10,
    };

    paHandler(params);

    expect(dictionaryBuilder).toHaveBeenCalledTimes(1);
    expect(dictionaryBuilder).toHaveBeenCalledWith(params);
  });

  it('throws an error when the length of init and end is not the same', () => {
    const wrongConfigs = [
      { init: [0, 100], end: [10, 110, 500] },
      { init: 0, end: [10, 110, 500] },
      { init: [0, 100], end: 500 },
      { init: [0, 100] },
      { end: [0, 100] },
    ];

    wrongConfigs.forEach(conf => {
      expect(() => paHandler(conf)).toThrowError(
        "The amount of 'init' must be equal to the amount of 'end'"
      );
    });

    const goodConfigs = [{ init: 2 }, { end: 5 }];

    goodConfigs.forEach(conf => {
      paHandler(conf);
      expect(dictionaryBuilder).toHaveBeenLastCalledWith(conf);
    });

    expect(dictionaryBuilder).toHaveBeenCalledTimes(goodConfigs.length);
  });

  it('throws an error when either init, end or batchSize is not a number', () => {
    const wrongConfigs = [
      { init: 'string' },
      { end: { object: true } },
      { batchSize: [100, 20] },
      { init: [1, 20], end: [10, true] },
    ];

    wrongConfigs.forEach(conf => {
      expect(() => paHandler(conf)).toThrowError('init, end and batchSize only accept numbers');
    });

    const goodConfigs = [{ init: '10' }, { end: '20' }, { init: '0', end: '10', batchSize: '5' }];

    goodConfigs.forEach(conf => {
      paHandler(conf);
      expect(dictionaryBuilder).toHaveBeenLastCalledWith(conf);
    });
  });

  // I've decided not to mock the methods of utils.js for this test
  // since I prefer more an integration test for this feature instead of a unit test
  it('calls dictionaryBuilder with all the combinations of prefixes/suffixes in every provided range', () => {
    const config = {
      init: [0, 500],
      end: [5, 502],
      prefix: ['a', 'b'],
      suffix: ['c', 'd'],
    };

    paHandler(config);

    const combinations = [
      { init: 0, end: 5, prefix: 'a', suffix: 'c' },
      { init: 0, end: 5, prefix: 'a', suffix: 'd' },
      { init: 0, end: 5, prefix: 'b', suffix: 'c' },
      { init: 0, end: 5, prefix: 'b', suffix: 'd' },
      { init: 500, end: 502, prefix: 'a', suffix: 'c' },
      { init: 500, end: 502, prefix: 'a', suffix: 'd' },
      { init: 500, end: 502, prefix: 'b', suffix: 'c' },
      { init: 500, end: 502, prefix: 'b', suffix: 'd' },
    ];

    combinations.forEach(args => {
      expect(dictionaryBuilder).toHaveBeenCalledWith(args);
    });
  });
});
