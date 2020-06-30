import React from 'react';
import { render } from 'test-utils';
import FormConstants from '../../../../constants/form-constants';

import FormCaption from '../FormCaption';

const CAPTION = 'Caption';
const SHOW_CAPTION = true;
const HAS_ERROR = true;
const DISABLED = true;

// Helper Function that allows us to use constants for the hex codes
// Found here: https://stackoverflow.com/questions/21646738/convert-hex-to-rgba
// TODO: Consolidate to generic helper util file
const hex2rgb = hex => {
  const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
  return `rgb(${r}, ${g}, ${b})`;
};

describe('Form Caption Tests', () => {
  function setUp(showCaption = false, hasError = false, isDisabled = false) {
    const { queryByText, baseElement } = render(
      <FormCaption showCaption={showCaption} hasError={hasError} isDisabled={isDisabled}>
        {CAPTION}
      </FormCaption>
    );
    return { queryByText, baseElement };
  }

  test('Initial render', () => {
    const { queryByText } = setUp();
    expect(queryByText(CAPTION)).toBeTruthy();
  });

  test('Form is Disabled, disabled style provided', () => {
    // only styled as disabled is caption is shown and there is no error
    const { baseElement } = setUp(SHOW_CAPTION, !HAS_ERROR, DISABLED);

    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div>
          <span
            style="visibility: visible; color: ${hex2rgb(FormConstants.DISABLED)};"
          >
            ${CAPTION}
          </span>
        </div>
      </body>
      `);
  });

  test('Error has occured, error style is provided', () => {
    // error takes highest precedent, shows caption even if told to hide
    const { baseElement } = setUp(!SHOW_CAPTION, HAS_ERROR, DISABLED);

    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div>
          <span
            style="visibility: visible; color: ${hex2rgb(FormConstants.ERROR)};"
          >
            ${CAPTION}
          </span>
        </div>
      </body>
      `);
  });

  test('Caption is not shown, style to hide is provided', () => {
    const { baseElement } = setUp(!SHOW_CAPTION, !HAS_ERROR, !DISABLED);

    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div>
          <span
            style="visibility: hidden;"
          >
            ${CAPTION}
          </span>
        </div>
      </body>
      `);
  });
});
