import Schema from '../schema';
import { generateTypeError, capitalize } from '../utils';
import { LABEL_TYPE, MIN_MAX_TYPE, ERROR_MESSAGES as Errors } from '../constants';

import * as Rules from '../rules';

const DEFAULT_MIN = 4;
const DEFAULT_MAX = 9;
const DEFAULT_LABEL = 'ABC';

describe('Schema', () => {
  test('should set schema properties', () => {
    const expectedSchema = {
      label: DEFAULT_LABEL,

      rules: [
        Rules.getMinLengthRule(DEFAULT_MIN),
        Rules.getMaxLengthRule(DEFAULT_MAX),
        Rules.DIGIT,
        Rules.SYMBOL,
        Rules.UPPERCASE,
        Rules.LOWERCASE
      ]
    };

    expect(
      new Schema()
        .hasDigit()
        .label(DEFAULT_LABEL)
        .min(DEFAULT_MIN)
        .max(DEFAULT_MAX)
        .hasSymbol()
        .hasUppercase()
        .hasLowercase()
        .validateSchema()
    ).toEqual(expectedSchema);
  });

  test('should throw error when max length is less than the number of required characters', () => {
    expect(() =>
      new Schema()
        .hasLowercase()
        .hasUppercase()
        .hasSymbol()
        .min(1)
        .max(2)
        .validateSchema()
    ).toThrow(Errors.INVALID_MAX);
  });
  describe('Min and max length', () => {
    const tests = [
      {
        max: 1,
        min: -2,
        expected: Errors.INVALID_NUMBER,
        description: 'given length is negative'
      },
      {
        max: 1,
        min: '2',
        expected: generateTypeError(capitalize(MIN_MAX_TYPE)),
        description: 'given length is not a number'
      },
      {
        max: 1,
        min: 2,
        expected: Errors.INVALID_MIN_MAX_MESSAGE,
        description: 'min length is greater than max length'
      }
    ];

    tests.map(fixture => {
      const { description, min, max, expected } = fixture;
      test(`should throw error when ${description}`, () => {
        expect(() =>
          new Schema()
            .min(min)
            .max(max)
            .validateSchema()
        ).toThrow(expected);
      });
    });
  });

  describe('Label', () => {
    const tests = [
      {
        label: '',
        expected: Errors.EMPTY_LABEL,
        description: 'given label is empty'
      },
      {
        label: 1,
        expected: generateTypeError(capitalize(LABEL_TYPE)),
        description: 'given label is not a string'
      }
    ];

    tests.map(fixture => {
      const { label, expected, description } = fixture;
      test(`should throw error when ${description}`, () => {
        expect(() => new Schema().label(label)).toThrow(expected);
      });
    });
  });
});
