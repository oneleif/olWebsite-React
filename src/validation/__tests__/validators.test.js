import {
  FORM_TYPE,
  INPUT_TYPE,
  SCHEMA_TYPE,
  ERROR_MESSAGES as Errors,
  VALIDATION_ERROR_MESSAGES as ValidationMessages
} from '../constants';

import { generateTypeError } from '../utils';
import { Schema, validateProperty, validateForm } from '../';

const DEFAULT_PASSWORD = 'abc123D';
const DEFAULT_INPUT_STRING = 'abcd';
const DEFAULT_INPUT_LENGTH = 4;
const DEFAULT_FORM = { a: DEFAULT_INPUT_STRING };

describe('Property Validator', () => {
  const inputTests = [
    {
      schema: {},
      description: 'empty schema given',
      inputString: DEFAULT_INPUT_STRING,
      expectedOutput: Errors.INVALID_SCHEMA
    },
    {
      schema: null,
      description: 'schema not provided',
      inputString: DEFAULT_INPUT_STRING,
      expectedOutput: Errors.INVALID_SCHEMA
    },
    {
      schema: new Schema().validate(),
      description: "input is not of type 'String'",
      inputString: 1,
      expectedOutput: generateTypeError(INPUT_TYPE)
    }
  ];

  inputTests.map(fixture => {
    const { schema, description, inputString, expectedOutput } = fixture;

    test(`should throw error when ${description}`, () => {
      expect(() => validateProperty(inputString, schema)).toThrow(expectedOutput);
    });
  });

  const errorResultTests = [
    {
      schema: new Schema().validate(),
      description: 'given empty string',
      inputString: '',
      expectedOutput: ValidationMessages.EMPTY_VALUE
    },
    {
      schema: new Schema().isEmail().validate(),
      description: 'email rule does not match',
      inputString: DEFAULT_PASSWORD,
      expectedOutput: ValidationMessages.EMAIL
    },
    {
      schema: new Schema().hasDigit().validate(),
      description: 'digit rule does not match',
      inputString: DEFAULT_INPUT_STRING,
      expectedOutput: ValidationMessages.DIGIT
    },
    {
      schema: new Schema().hasSymbol().validate(),
      description: 'symbol rule does not match',
      inputString: DEFAULT_INPUT_STRING,
      expectedOutput: ValidationMessages.SYMBOL
    },
    {
      schema: new Schema().hasLowercase().validate(),
      description: 'lowercase rule does not match',
      inputString: DEFAULT_INPUT_STRING.toUpperCase(),
      expectedOutput: ValidationMessages.LOWERCASE
    },
    {
      schema: new Schema().hasUppercase().validate(),
      description: 'uppercase rule does not match',
      inputString: DEFAULT_INPUT_STRING,
      expectedOutput: ValidationMessages.UPPERCASE
    },
    {
      schema: new Schema().min(DEFAULT_INPUT_LENGTH + 1).validate(),
      description: 'min length rule does not match',
      inputString: DEFAULT_INPUT_STRING,
      expectedOutput: ValidationMessages.MIN_LENGTH.replace('VALUE', DEFAULT_INPUT_LENGTH + 1)
    },
    {
      schema: new Schema().max(DEFAULT_INPUT_LENGTH).validate(),
      description: 'min length rule does not match',
      inputString: DEFAULT_INPUT_STRING + '12',
      expectedOutput: ValidationMessages.MAX_LENGTH.replace('VALUE', DEFAULT_INPUT_LENGTH)
    }
  ];

  errorResultTests.map(fixture => {
    const { schema, description, inputString, expectedOutput } = fixture;

    test(`should return object with custom error message when ${description}`, () => {
      const { isValid, errors } = validateProperty(inputString, schema);
      expect(isValid).toBe(false);
      expect(errors).toStrictEqual([expectedOutput]);
    });
  });

  test('should return object with isValid boolean and empty errors array when successfully matched', () => {
    const validString = DEFAULT_INPUT_STRING + '1$W';
    const schema = new Schema()
      .min(6)
      .max(10)
      .hasDigit()
      .hasSymbol()
      .hasLowercase()
      .hasUppercase()
      .validate();

    const { isValid, errors } = validateProperty(validString, schema);

    expect(errors).toStrictEqual([]);
    expect(isValid).toBe(true);
  });
});
describe('Form Validator', () => {
  const formValidationErrorTests = [
    {
      form: null,
      schema: null,
      description: 'form not provided',
      expectedOutput: Errors.INVALID_FORM
    },
    {
      form: DEFAULT_FORM,
      schema: null,
      description: 'schema not provided',
      expectedOutput: Errors.INVALID_SCHEMA
    },
    {
      form: {},
      schema: null,
      description: 'empty form is provided',
      expectedOutput: Errors.INVALID_FORM
    },
    {
      form: 1,
      schema: null,
      description: 'form with invalid type is provided',
      expectedOutput: generateTypeError(FORM_TYPE)
    },
    {
      form: DEFAULT_FORM,
      schema: 1,
      description: 'schema with invalid type is provided',
      expectedOutput: generateTypeError(SCHEMA_TYPE)
    },
    {
      form: DEFAULT_FORM,
      schema: { d: {} },
      description: 'corresponding schema is missing for form property',
      expectedOutput: Errors.FORM_SCHEMA_MISMATCH
    }
  ];

  formValidationErrorTests.map(fixture => {
    const { form, description, schema, expectedOutput } = fixture;

    test(`should throw error when ${description}`, () => {
      expect(() => validateForm(form, schema)).toThrow(expectedOutput);
    });
  });

  const successfulFormValidationTests = [
    {
      form: { password: DEFAULT_PASSWORD, username: DEFAULT_INPUT_STRING },
      schema: {
        password: new Schema().hasUppercase().validate(),
        username: new Schema().validate()
      },
      expectedOutput: { isValid: true, errors: {} },
      description: 'empty errors object when all form properties validate without errors'
    },
    {
      form: { password: DEFAULT_PASSWORD, username: DEFAULT_INPUT_STRING },
      schema: {
        password: new Schema().hasUppercase().validate(),
        username: new Schema().hasDigit().validate()
      },
      expectedOutput: {
        isValid: false,
        errors: {
          username: [ValidationMessages.DIGIT]
        }
      },
      description: 'errors object with invalid properties and their corresponding errors'
    }
  ];

  successfulFormValidationTests.map(fixture => {
    const { form, schema, description, expectedOutput } = fixture;

    test(`should return object with ${description}`, () => {
      const { isValid, errors } = validateForm(form, schema);
      expect(isValid).toBe(expectedOutput.isValid);
      expect(errors).toStrictEqual(expectedOutput.errors);
    });
  });
});
