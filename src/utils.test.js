const utils = require('./utils');

describe('Utils', () => {
  describe('removeFirstHyphens(string)', () => {
    const { removeFirstHyphens } = utils;
    const validExamples = [
      { input: '-a', output: 'a' },
      { input: '--something', output: 'something' },
      { input: '-----exaggeration', output: 'exaggeration' },
      { input: '--with-hyphens-in-the-middle', output: 'with-hyphens-in-the-middle' },
    ];

    it('removes every hyphen until a different char appears', () => {
      validExamples.forEach(({ input, output }) => {
        expect(removeFirstHyphens(input)).toEqual(output);
      });
    });
  });

  describe('isAnOption(string)', () => {
    const { isAnOption } = utils;

    const options = ['-a', '--something'];
    const nonOptions = ['notAnOption', 10, null];

    it('returns true if the param is an option', () => {
      options.forEach(opt => expect(isAnOption(opt)).toBe(true));
    });

    it('returns false if the param is not an option or is not a valid value', () => {
      nonOptions.forEach(opt => expect(isAnOption(opt)).toBe(false));
    });
  });
});
