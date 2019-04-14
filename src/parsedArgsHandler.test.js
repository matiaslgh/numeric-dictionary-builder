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
});
