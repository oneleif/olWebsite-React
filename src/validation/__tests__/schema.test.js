import Schema from '../schema';
import { generateTypeError } from '../utils';
import { LABEL_TYPE, MIN_MAX_TYPE, ERROR_MESSAGES as Errors, DEFAULT_SCHEMA } from '../constants';

const DEFAULT_MIN = 4;
const DEFAULT_MAX = 9;
const DEFAULT_LABEL = 'ABC';

describe('Schema', () => {
  test('should set schema properties', () => {
    const expectedSchema = {
      digit: true,
      label: DEFAULT_LABEL,
      minimum: DEFAULT_MIN,
      maximum: DEFAULT_MAX,
      symbol: true,
      lowercase: true,
      uppercase: true
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
        .validate()
    ).toStrictEqual(expectedSchema);
  });

  test('should clear non-essential schema properties when isEmail is set', () => {
    const schema = new Schema()
      .hasDigit()
      .hasSymbol()
      .isEmail()
      .validate();

    const expectedSchema = { email: true };
    expect(schema).toEqual(expectedSchema);
  });

  test('should throw error when max length is less than the number of required characters', () => {
    expect(() =>
      new Schema()
        .hasLowercase()
        .hasUppercase()
        .hasSymbol()
        .min(1)
        .max(2)
        .validate()
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
        expected: generateTypeError(MIN_MAX_TYPE),
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
            .validate()
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
        expected: generateTypeError(LABEL_TYPE),
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
