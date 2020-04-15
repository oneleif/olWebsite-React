import React from 'react';
import { render, fireEvent, queryByLabelText } from 'test-utils';

import Input from '../Input';

const LABEL = 'Label';
const CLASS_NAME = 'class-name';
const TEST_VALUE = 'test';
const ERROR_MESSAGE = 'ERROR';

describe('Input Tests', () => {
  function setUp(errorMessage) {
    const { queryByText } = render(<Input label={LABEL} errorMessage={errorMessage} />);
    return { queryByText };
  }

  test('Initial render', () => {
    const { queryByText } = setUp();
    expect(queryByText(LABEL)).toBeTruthy();
  });

  test('No className passed in, should use default className', () => {
    const container = render(<Input label={LABEL} />);

    expect(container.container).toMatchInlineSnapshot(`
      <div>
        <label
          class="input-container"
        >
          <h6>
            ${LABEL}
          </h6>
          <input
            aria-label="${LABEL}-input"
            class=""
            type="text"
          />
        </label>
      </div>
      `);
  });

  test('ClassName passed in, should use className passed in', () => {
    const container = render(<Input className={CLASS_NAME} label={LABEL} />);

    expect(container.container).toMatchInlineSnapshot(`
      <div>
        <label
          class="${CLASS_NAME}-input-container"
        >
          <h6>
            ${LABEL}
          </h6>
          <input
            aria-label="${LABEL}-input"
            class=""
            type="text"
          />
        </label>
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
