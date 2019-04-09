const dictionaryBuilder = require('./dictionaryBuilder');
const fs = require('fs');

jest.mock('fs');

describe('dictionaryBuilder(...)', () => {
  it('uses default values if it does not receive params', () => {
    // TODO: Implement this test
  });

  it('creates a dictionary from init to end', () => {
    // TODO: Implement this test
  });

  it('creates a dictionary with prefixes and suffixes', () => {
    // TODO: Implement this test
  });

  it('saves the content in batches', () => {
    // TODO: Check why end: 10, batchSize: 2 calls the method 4 times instead of 5

    dictionaryBuilder({
      end: 10,
      batchSize: 5,
    });

    expect(fs.appendFileSync).toHaveBeenCalledTimes(2);
  });

  it('uses default values if it does not receive params', () => {
    // TODO: Implement this test
  });

  it('allows to build multiples dictionaries at once in a single file', () => {
    // TODO: Implement this test
  });

  it('throws an error when end is less than or equal than init', () => {
    // TODO: Implement this test
  });
});
