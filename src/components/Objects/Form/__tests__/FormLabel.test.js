import React from 'react';
import { render } from 'test-utils';
import FormConstants from '../../../../constants/form-constants';

import FormLabel from '../FormLabel';

const LABEL = 'Label';
const DEFAULT_LABEL_STATE = { isFocused: false, isActive: false };
const FOCUSED_ACTIVE_LABEL_STATE = { isFocused: true, isActive: true };
const ACTIVE_LABEL_STATE = { isFocused: false, isActive: true };

const HAS_ERROR = true;
const NO_ERROR = false;
const DISABLED = true;
const NOT_DISABLED = false;

// Helper Function that allows us to use constants for the hex codes
// Found here: https://stackoverflow.com/questions/21646738/convert-hex-to-rgba
// TODO: Consolidate to generic helper util file
const hex2rgb = hex => {
  const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
  return `rgb(${r}, ${g}, ${b})`;
};

describe('Form Label Tests', () => {
  function setUp(labelState = DEFAULT_LABEL_STATE, hasError = false, isDisabled = false) {
    const { queryByText, baseElement } = render(
      <FormLabel labelState={labelState} hasError={hasError} isDisabled={isDisabled}>
        {LABEL}
      </FormLabel>
    );
    return { queryByText, baseElement };
  }

  test('Initial render', () => {
    const { queryByText } = setUp();
    expect(queryByText(LABEL)).toBeTruthy();
  });

  test('Form is Disabled, always shown as disabled', () => {
    // even if there is an error, style is still "disabled"
    const { baseElement } = setUp(DEFAULT_LABEL_STATE, HAS_ERROR, DISABLED);

    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div>
          <p
            style="color: ${hex2rgb(FormConstants.DISABLED)};"
          >
            ${LABEL}
          </p>
        </div>
      </body>
      `);
  });

  test('if there is an error, error style provided', () => {
    // error is shown over focus/active
    const { baseElement } = setUp(FOCUSED_ACTIVE_LABEL_STATE, HAS_ERROR, NOT_DISABLED);

    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div>
          <p
            style="color: ${hex2rgb(FormConstants.ERROR)};"
          >
            ${LABEL}
          </p>
        </div>
      </body>
      `);
  });

  test('form has been focused on, show focus style', () => {
    // focus style should have preference over active style
    const { baseElement } = setUp(FOCUSED_ACTIVE_LABEL_STATE, NO_ERROR, NOT_DISABLED);

    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div>
          <p
            style="color: ${hex2rgb(FormConstants.FOCUSED_LABEL)};"
          >
            ${LABEL}
          </p>
        </div>
      </body>
      `);
  });

  test('form is active show active style', () => {
    // active style has lowest preference
    const { baseElement } = setUp(ACTIVE_LABEL_STATE, NO_ERROR, NOT_DISABLED);

    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div>
          <p
            style="color: ${hex2rgb(FormConstants.ACTIVE_LABEL)};"
          >
            ${LABEL}
          </p>
        </div>
      </body>
      `);
  });
});
