import * as Rules from '../rules';

const DEFAULT_LENGTH = 2;

describe('Validation Rules', () => {
  const testParams = {
    EMAIL: { validInput: 'abc@def.com', invalidInput: 'a' },
    DIGIT: { validInput: '1', invalidInput: 'a' },
    SYMBOL: { validInput: '$', invalidInput: 'a' },
    LOWERCASE: { validInput: 'a', invalidInput: 'A' },
    UPPERCASE: { validInput: 'A', invalidInput: 'a' },
    getMinLengthRule: { validInput: 'aa', invalidInput: 'a' },
    getMaxLengthRule: { validInput: 'aa', invalidInput: 'aaa' }
  };

  function setup(key) {
    const pattern = Rules[key].pattern || Rules[key](DEFAULT_LENGTH).pattern;

    let title = key;
    if (key === Rules.getMaxLengthRule.name) {
      title = 'MAX LENGTH';
    }

    if (key === Rules.getMinLengthRule.name) {
      title = 'MIN LENGTH';
    }
    return { pattern, title };
  }

  for (const key in Rules) {
    if (Rules.hasOwnProperty(key)) {
      const { pattern, title } = setup(key);

      test(`${title} regex pattern matches correctly`, () => {
        expect(pattern.test(testParams[key].invalidInput)).toBe(false);
        expect(pattern.test(testParams[key].validInput)).toBe(true);
      });
    }
  }
});
