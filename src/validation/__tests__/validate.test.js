import { EMPTY_VALUE, ERROR_MESSAGES as Errors, VALIDATION_ERROR_MESSAGES as Messages } from '../constants';
import Schema from '../schema';
import validate from '../validate';

const DEFAULT_VALUE = 'abc';
const DEFAULT_FORM = { password: DEFAULT_VALUE, email: DEFAULT_VALUE };
const DEFAULT_LENGTH = 4;
const DEFAULT_SCHEMA = new Schema()
  .isEmail()
  .isRequired()
  .validate();
const DEFAULT_FORM_SCHEMA = {
  email: new Schema()
    .isEmail()
    .isRequired()
    .validate(),
  password: new Schema()
    .hasDigit()
    .isRequired()
    .validate()
};

describe('validate', () => {
  test('should return object with isValid property set to false and corresponding error message when input is an empty string', () => {
    const { isValid, errors } = validate(EMPTY_VALUE, DEFAULT_SCHEMA);
    const expectedResponse = [Messages.REQUIRED];

    expect(isValid).toBe(false);
    expect(errors).toEqual(expectedResponse);
  });

  test('should throw error when value is neither an object nor a string', () => {
    const invalidValue = 1;

    expect(() => validate(invalidValue, DEFAULT_SCHEMA)).toThrow(Errors.INVALID_VALUE_TYPE);
  });

  const schemaTests = [
    {
      schema: 1,
      description: 'schema is not an object',
      errorMessage: Errors.INVALID_SCHEMA_TYPE
    },
    {
      schema: {},
      description: 'schema is an empty object',
      errorMessage: Errors.EMPTY_SCHEMA
    }
  ];

  schemaTests.map(fixture => {
    const { schema, description, errorMessage } = fixture;

    test(`should throw error when ${description}`, () => {
      expect(() => validate(DEFAULT_VALUE, schema)).toThrow(errorMessage);
    });
  });

  test('should include label in error message when preference is set', () => {
    const options = { includeLabel: true };
    const schema = new Schema()
      .label('def')
      .hasDigit()
      .isRequired()
      .validate();

    const { errors } = validate(DEFAULT_VALUE, schema, options);
    expect(errors[0]).toMatch(schema.label);
  });

  const abortEarlyTests = [
    {
      abortEarly: false,
      expectedLength: 2,
      description: 'should include all errors for value when abortEarly option set to false'
    },
    {
      abortEarly: true,
      expectedLength: 1,
      description: 'should only return the first error when abortEarly option set to true'
    }
  ];

  abortEarlyTests.map(fixture => {
    const { description, abortEarly, expectedLength } = fixture;

    test(description, () => {
      const options = { abortEarly };
      const schema = new Schema()
        .hasDigit()
        .hasUppercase()
        .isRequired()
        .validate();

      const { errors } = validate(DEFAULT_VALUE, schema, options);
      expect(errors.length).toBe(expectedLength);
    });
  });

  const validationResultTests = [
    {
      schema: new Schema()
        .isEmail()
        .isRequired()
        .validate(),
      ruleName: 'email',
      validValue: 'abc@def.com',
      invalidValue: DEFAULT_VALUE,
      validationError: [Messages.EMAIL]
    },
    {
      schema: new Schema()
        .hasDigit()
        .isRequired()
        .validate(),
      ruleName: 'digit',
      validValue: DEFAULT_VALUE + '1',
      invalidValue: DEFAULT_VALUE,
      validationError: [Messages.DIGIT]
    },
    {
      schema: new Schema()
        .hasSymbol()
        .isRequired()
        .validate(),
      ruleName: 'symbol',
      validValue: DEFAULT_VALUE + '$',
      invalidValue: DEFAULT_VALUE,
      validationError: [Messages.SYMBOL]
    },
    {
      schema: new Schema()
        .hasLowercase()
        .isRequired()
        .validate(),
      ruleName: 'lowercase',
      validValue: DEFAULT_VALUE,
      invalidValue: DEFAULT_VALUE.toUpperCase(),
      validationError: [Messages.LOWERCASE]
    },
    {
      schema: new Schema()
        .hasUppercase()
        .isRequired()
        .validate(),
      ruleName: 'uppercase',
      validValue: DEFAULT_VALUE + 'S',
      invalidValue: DEFAULT_VALUE,
      validationError: [Messages.UPPERCASE]
    },
    {
      schema: new Schema()
        .min(DEFAULT_LENGTH)
        .isRequired()
        .validate(),
      ruleName: 'uppercase',
      validValue: DEFAULT_VALUE + 'S',
      invalidValue: DEFAULT_VALUE,
      validationError: [Messages.MIN_LENGTH.replace('VALUE', DEFAULT_LENGTH)]
    },
    {
      schema: new Schema()
        .max(DEFAULT_LENGTH)
        .isRequired()
        .validate(),
      ruleName: 'uppercase',
      validValue: DEFAULT_VALUE,
      invalidValue: DEFAULT_VALUE + DEFAULT_VALUE,
      validationError: [Messages.MAX_LENGTH.replace('VALUE', DEFAULT_LENGTH)]
    }
  ];

  validationResultTests.map(fixture => {
    const { schema, ruleName, validValue, invalidValue, validationError: validationErrors } = fixture;

    test(`should return object with custom error message when ${ruleName} rule does not match`, () => {
      const { errors: invalidTestErrors, isValid: invalidTestIsValid } = validate(invalidValue, schema);

      expect(invalidTestIsValid).toBe(false);
      expect(invalidTestErrors).toEqual(validationErrors);

      // Valid test
      const { isValid, errors } = validate(validValue, schema);
      expect(isValid).toBe(true);
      expect(errors.length).toBe(0);
    });
  });
});

describe('Validate Form', () => {
  const schemaTests = [
    {
      schema: DEFAULT_SCHEMA,
      description: 'no corresponding form property schema is provided'
    },
    {
      schema: {},
      description: 'form schema is an empty object'
    }
  ];

  schemaTests.map(fixture => {
    const { schema, description } = fixture;

    test(`should throw error when ${description}`, () => {
      expect(() => validate(DEFAULT_FORM, schema)).toThrow(Errors.FORM_SCHEMA_MISMATCH);
    });
  });

  const formValidationTests = [
    {
      form: { password: DEFAULT_VALUE + '1', email: 'abc@def.com' },
      schema: DEFAULT_FORM_SCHEMA,
      expectedOutput: { isValid: true, errors: {} },
      description: 'empty errors object when all form properties validate without errors'
    },
    {
      form: { password: DEFAULT_VALUE, email: 'abc@def.com' },
      schema: DEFAULT_FORM_SCHEMA,
      expectedOutput: {
        isValid: false,
        errors: {
          password: [Messages.DIGIT]
        }
      },
      description: 'empty errors object when all form properties validate without errors'
    }
  ];

  formValidationTests.map(fixture => {
    const { form, schema, description, expectedOutput } = fixture;

    test(`should return object with ${description}`, () => {
      expect(validate(form, schema)).toEqual(expectedOutput);
    });
  });
});
