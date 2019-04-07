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
});
