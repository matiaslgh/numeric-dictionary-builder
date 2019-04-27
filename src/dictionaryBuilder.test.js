const { INIT, END, FILENAME } = require('./defaults');

jest.mock('fs');

const makeRequires = () => ({
  fs: require('fs'),
  dictionaryBuilder: require('./dictionaryBuilder'),
});

describe('dictionaryBuilder(...)', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('uses default values if it does not receive params', () => {
    const { fs, dictionaryBuilder } = makeRequires();
    let numbers = '';

    for (let i = INIT; i <= END; i++) {
      numbers += `${i}\n`;
    }

    dictionaryBuilder();

    expect(fs._getMockFiles()[FILENAME]).toEqual(numbers);
    expect(fs.appendFileSync).toHaveBeenCalledTimes(1);
  });

  it('creates a dictionary from init to end', () => {
    const { fs, dictionaryBuilder } = makeRequires();
    const numbers = '23\n24\n25\n26\n27\n28\n29\n30\n31\n32\n';

    dictionaryBuilder({ init: 23, end: 32 });

    expect(fs._getMockFiles()[FILENAME]).toEqual(numbers);
  });

  it('creates a dictionary with prefixes and suffixes', () => {
    const { fs, dictionaryBuilder } = makeRequires();
    const [p, s] = ['PREFIX', 'SUFFIX'];
    const str = `${p}2${s}\n${p}3${s}\n${p}4${s}\n${p}5${s}\n${p}6${s}\n${p}7${s}\n`;

    dictionaryBuilder({
      init: 2,
      end: 7,
      batchSize: 2,
      suffix: s,
      prefix: p,
    });

    expect(fs._getMockFiles()[FILENAME]).toEqual(str);
  });

  it('saves the content in batches', () => {
    const configs = [
      { init: 1, end: 11, batchSize: 2, count: 6 }, // Odd # of numbers and even batchSize
      { init: 2, end: 12, batchSize: 5, count: 3 }, // Odd # of numbers and odd batchSize
      { init: 1, end: 10, batchSize: 4, count: 3 }, // Even # of numbers and even batchSize
      { init: 2, end: 11, batchSize: 3, count: 4 }, // Even # of numbers and odd batchSize
      { init: 3, end: 5, batchSize: 100, count: 1 }, // batchSize greater than # of numbers
      { init: '1', end: '11', batchSize: '2', count: 6 }, // Normal input will be string
    ];

    configs.forEach(({ init, end, batchSize, count }) => {
      jest.resetModules();

      const { fs, dictionaryBuilder } = makeRequires();

      dictionaryBuilder({ init, end, batchSize });

      expect(fs.appendFileSync).toHaveBeenCalledTimes(count);
    });
  });

  it("concatenates the dictionaries into a single file when it's called several times", () => {
    const { fs, dictionaryBuilder } = makeRequires();

    const configs = [
      { init: 7, end: 10, prefix: 'a', suffix: 'b', str: 'a7b\na8b\na9b\na10b\n' },
      { init: 0, end: 4, prefix: 'p', suffix: 's', str: 'p0s\np1s\np2s\np3s\np4s\n' },
      { init: 97, end: 101, prefix: 'z', str: 'z97\nz98\nz99\nz100\nz101\n' },
      { init: 50, end: 50, str: '50\n' },
    ];

    const expected = configs.reduce((acc, { str }) => acc + str, '');

    configs.forEach(({ init, end, prefix, suffix }) => {
      dictionaryBuilder({ init, end, prefix, suffix });
    });

    expect(fs._getMockFiles()[FILENAME]).toEqual(expected);
  });

  it('throws an error when end is less than or equal than init', () => {
    const dictionaryBuilder = require('./dictionaryBuilder');

    expect(() => {
      dictionaryBuilder({
        init: 100,
        end: 50,
      });
    }).toThrowError('End must be greater than init');
  });
});
