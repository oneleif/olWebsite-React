import { TYPES } from '../constants';
import { isString, isObject, isNumber, isBoolean, validateType, isEmptyObject, generateTypeError } from '../utils';

const DEFAULT_STRING = 'abc';
const DEFAULT_NUMBER = 1;
const DEFAULT_OBJECT = {};
const DEFAULT_BOOLEAN = true;

describe('Utils', () => {
  test('generateTypeError should return response with type name ', () => {
    expect(generateTypeError(DEFAULT_STRING)).toMatch(new RegExp(DEFAULT_STRING));
  });

  test('validateType should throw error with custom message when object with invalid type is given', () => {
    const valid = DEFAULT_STRING;
    const invalid = DEFAULT_NUMBER;
    const callback = isString;
    const customMessage = generateTypeError(TYPES.STRING);

    expect(() => validateType(valid, callback)).not.toThrow();
    expect(() => validateType(invalid, callback)).toThrow(customMessage);
  });

  describe('isEmptyObject', () => {
    const tests = [
      {
        obj: DEFAULT_OBJECT,
        description: 'true when given value is an empty object',
        expectedOutput: true
      },
      {
        obj: DEFAULT_NUMBER,
        description: 'false when given value is not an object',
        expectedOutput: false
      },
      {
        obj: { ...DEFAULT_OBJECT, a: '' },
        description: 'false when given object is not empty',
        expectedOutput: false
      }
    ];

    tests.map(fixture => {
      const { description, expectedOutput, obj } = fixture;

      test(`isEmptyObject should return ${description}`, () => {
        expect(isEmptyObject(obj)).toBe(expectedOutput);
      });
    });
  });

  describe('Type checking', () => {
    const tests = [
      {
        callback: isBoolean,
        valid: DEFAULT_BOOLEAN,
        invalid: DEFAULT_STRING
      },
      {
        callback: isString,
        valid: DEFAULT_STRING,
        invalid: DEFAULT_NUMBER
      },
      {
        callback: isNumber,
        valid: DEFAULT_NUMBER,
        invalid: DEFAULT_STRING
      },
      {
        callback: isObject,
        valid: DEFAULT_OBJECT,
        invalid: DEFAULT_NUMBER
      }
    ];

    tests.map(fixture => {
      const { valid, invalid, callback } = fixture;
      const name = callback.name;
      const type = name.replace('is', '');

      test(`${name} should return true when given value is of type ${type}`, () => {
        expect(callback(valid)).toBe(true);
      });

      test(`${name} should return false when given value is not of type ${type}`, () => {
        expect(callback(invalid)).toBe(false);
      });
    });
  });
});
