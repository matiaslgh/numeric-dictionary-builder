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
      options.forEach(opt => expect(isAnOption(opt)).toBeTrue());
    });

    it('returns false if the param is not an option or is not a valid value', () => {
      nonOptions.forEach(opt => expect(isAnOption(opt)).toBeFalse());
    });
  });

  describe('getCombinations(...)', () => {
    const { getCombinations } = utils;

    it('returns an array of objects with every possible combination of input object', () => {
      const config = {
        init: 0,
        end: 5,
        prefix: ['a', 'b'],
        suffix: ['c', 'd'],
      };

      expect(getCombinations(config)).toIncludeSameMembers([
        { init: 0, end: 5, prefix: 'a', suffix: 'c' },
        { init: 0, end: 5, prefix: 'a', suffix: 'd' },
        { init: 0, end: 5, prefix: 'b', suffix: 'c' },
        { init: 0, end: 5, prefix: 'b', suffix: 'd' },
      ]);
    });

    it('returns an array of only one element when there is only one combination possible', () => {
      const config = { init: 0, end: 50, prefix: 'pre', suffix: 'suf', batchSize: 10 };

      expect(getCombinations(config)).toEqual([config]);
    });
  });

  describe('getValueOrDefaultAsArray(...)', () => {
    const { getValueOrDefaultAsArray } = utils;
    const baseObject = {
      ignore: [1, 2, 3],
      noise: 'Ignore me too',
    };

    it('returns the required value as an array of 1 element when it was not an array', () => {
      const obj = {
        ...baseObject,
        important: 1,
      };
      expect(getValueOrDefaultAsArray(obj, 'important')).toEqual([1]);
    });

    it('returns the required value as it is when it is already an array', () => {
      const match = [1, '2nd', true];
      const obj = {
        ...baseObject,
        important: match,
      };
      expect(getValueOrDefaultAsArray(obj, 'important')).toEqual(match);
    });

    it('returns the default value as an array when the ket does not exist in the object', () => {
      const defaultValue = 'default_value';
      expect(getValueOrDefaultAsArray(baseObject, 'important', defaultValue)).toEqual([
        defaultValue,
      ]);

      let undefinedDefault;
      expect(getValueOrDefaultAsArray(baseObject, 'important')).toEqual([undefinedDefault]);
    });
  });

  describe('getScriptName(...)', () => {
    const { getScriptName } = utils;

    it('adds only one hyphen at the beginning of the string if it has only one character', () => {
      const scriptName = 'script_name';

      global.process = {
        argv: ['node_path', `/home/username/Desktop/${scriptName}`, 'param1', 'param2'],
      };

      expect(getScriptName()).toBe(scriptName);
    });
  });

  describe('addHyphens(...)', () => {
    const { addHyphens } = utils;

    it('adds only one hyphen at the beginning of the string if it has only one character', () => {
      expect(addHyphens('a')).toBe('-a');
    });

    it('adds two hyphen at the beginning of the string if it has more than one character', () => {
      expect(addHyphens('moreThanOneChar')).toBe('--moreThanOneChar');
    });
  });
});
