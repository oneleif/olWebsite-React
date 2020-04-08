import { EMPTY_VALUE, ERROR_MESSAGES as Errors, VALIDATION_ERROR_MESSAGES as Messages } from '../constants';
import Schema from '../schema';
import validate from '../validate';

const DEFAULT_VALUE = 'abc';
const DEFAULT_FORM = { password: DEFAULT_VALUE, email: DEFAULT_VALUE };
const DEFAULT_LENGTH = 4;
const DEFAULT_SCHEMA = new Schema()
  .min(3)
  .isEmail()
  .isRequired();
const DEFAULT_FORM_SCHEMA = {
  email: new Schema().isEmail().isRequired(),
  password: new Schema()
    .min(1)
    .hasDigit()
    .isRequired()
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
      description: 'schema is not an object'
    },
    {
      schema: {},
      description: 'schema is an empty object'
    },
    {
      schema: new Schema()
        .isRequired()
        .min(2)
        .max(1),
      description: 'schema is invalid'
    }
  ];

  schemaTests.map(fixture => {
    const { schema, description } = fixture;

    test(`should throw error when ${description}`, () => {
      expect(() => validate(DEFAULT_VALUE, schema)).toThrow();
    });
  });

  test('should include label in error message when preference is set', () => {
    const label = 'abc';
    const options = { includeLabel: true };
    const schema = new Schema()
      .label(label)
      .min(2)
      .hasDigit()
      .isRequired();

    const { errors } = validate(DEFAULT_VALUE, schema, options);
    expect(errors[0]).toMatch(label);
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
        .min(3)
        .hasUppercase()
        .isRequired();

      const { errors } = validate(DEFAULT_VALUE, schema, options);
      expect(errors.length).toBe(expectedLength);
    });
  });

  const validationResultTests = [
    {
      schema: new Schema()
        .min(1)
        .isEmail()
        .isRequired(),
      ruleName: 'email',
      validValue: 'abc@def.com',
      invalidValue: DEFAULT_VALUE,
      validationError: [Messages.EMAIL]
    },
    {
      schema: new Schema()
        .min(1)
        .hasDigit()
        .isRequired(),
      ruleName: 'digit',
      validValue: DEFAULT_VALUE + '1',
      invalidValue: DEFAULT_VALUE,
      validationError: [Messages.DIGIT]
    },
    {
      schema: new Schema()
        .min(1)
        .hasSymbol()
        .isRequired(),
      ruleName: 'symbol',
      validValue: DEFAULT_VALUE + '$',
      invalidValue: DEFAULT_VALUE,
      validationError: [Messages.SYMBOL]
    },
    {
      schema: new Schema()
        .min(1)
        .hasLowercase()
        .isRequired(),
      ruleName: 'lowercase',
      validValue: DEFAULT_VALUE,
      invalidValue: DEFAULT_VALUE.toUpperCase(),
      validationError: [Messages.LOWERCASE]
    },
    {
      schema: new Schema()
        .min(1)
        .hasUppercase()
        .isRequired(),
      ruleName: 'uppercase',
      validValue: DEFAULT_VALUE + 'S',
      invalidValue: DEFAULT_VALUE,
      validationError: [Messages.UPPERCASE]
    },
    {
      schema: new Schema().min(DEFAULT_LENGTH).isRequired(),
      ruleName: 'uppercase',
      validValue: DEFAULT_VALUE + 'S',
      invalidValue: DEFAULT_VALUE,
      validationError: [Messages.MIN_LENGTH.replace('VALUE', DEFAULT_LENGTH)]
    },
    {
      schema: new Schema().max(DEFAULT_LENGTH).isRequired(),
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
  test('should return validation error when matching property is not the same as current property', () => {
    const form = { a: 'abcd@def.com', b: 'abcd' };
    const schema = {
      a: new Schema()
        .min(1)
        .isEmail()
        .isRequired(),
      b: new Schema().matches('a').isRequired()
    };

    const { errors } = validate(form, schema, { abortEarly: false });

    expect(errors.b[0]).toBe(Messages.MATCHING.replace('PROPERTY', 'a'));
  });

  test('should throw error when matching schema not found', () => {
    const form = { a: 'a' };
    const matchingProperty = 'b';
    const schema = { a: new Schema().matches(matchingProperty) };

    expect(() => validate(form, schema)).toThrow(Errors.NO_MATCHING_PROPERTY.replace('PROPERTY', matchingProperty));
  });

  test('should return no errors and isValid set to true when property validation not required', () => {
    const { isValid, errors } = validate(DEFAULT_VALUE, new Schema().isEmail().min(1));

    expect(isValid).toBe(true);
    expect(errors).toEqual([]);
  });

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
