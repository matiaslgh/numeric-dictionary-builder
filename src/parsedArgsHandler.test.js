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
});
