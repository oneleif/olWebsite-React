import React from 'react';
import { render, fireEvent, queryByLabelText } from 'test-utils';

import Input from '../Input';

const LABEL = 'Label';
const CLASS_NAME = 'class-name';
const TEST_VALUE = 'test';
const ERROR_MESSAGE = 'ERROR';
const CAPTION = 'Caption';

describe('Input Tests', () => {
  function setUp(errorMessage) {
    const { queryByText } = render(<Input label={LABEL} errorMessage={errorMessage} className='test' />);
    return { queryByText };
  }

  test('Initial render', () => {
    const { queryByText } = setUp();
    expect(queryByText(LABEL)).toBeTruthy();
  });

  test('No className passed in, should use default className', () => {
    const container = render(<Input label={LABEL} caption={CAPTION} />);

    expect(container.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="undefined input-container"
        >
          <label>
            ${LABEL}
          </label>
          <input
            aria-label="${LABEL}-input"
            class=""
            type="text"
          />
          <span
            style="visibility: hidden;"
          >
            ${CAPTION}
          </span>
        </div>
      </div>
      `);
  });

  test('ClassName passed in, should use className passed in', () => {
    const container = render(<Input className={CLASS_NAME} label={LABEL} caption={CAPTION} />);

    expect(container.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="${CLASS_NAME} input-container"
        >
          <label>
            ${LABEL}
          </label>
          <input
            aria-label="${LABEL}-input"
            class=""
            type="text"
          />
          <span
            style="visibility: hidden;"
          >
            ${CAPTION}
          </span>
        </div>
      </div>
      `);
  });

  test('Input value is changed, event handler is called', () => {
    const onValueChange = jest.fn();
    const container = render(<Input label={LABEL} onValueChange={onValueChange} />);
    const input = queryByLabelText(container.container, `${LABEL}-input`);

    fireEvent.change(input, { target: { value: TEST_VALUE } });

    expect(onValueChange).toBeCalledTimes(1);
  });

  test('Error message passed in, message should be displayed', () => {
    const { queryByText } = setUp(ERROR_MESSAGE);
    expect(queryByText(ERROR_MESSAGE)).toBeTruthy();
  });
});
