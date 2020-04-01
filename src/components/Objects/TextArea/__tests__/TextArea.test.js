import React from 'react';
import { render, fireEvent, queryByLabelText } from 'test-utils';

import TextArea from '../TextArea';

const LABEL = 'Label';
const CLASS_NAME = 'class-name';
const TEST_VALUE = 'test';

describe('Text Area Tests', () => {
  function setUp() {
    const { queryByText } = render(<TextArea label={LABEL} onValueChange={() => {}} />);
    return { queryByText };
  }

  test('Initial render', () => {
    const { queryByText } = setUp();
    expect(queryByText(LABEL)).toBeTruthy();
  });

  test('No className passed in, should use default className', () => {
    const container = render(<TextArea label={LABEL} />);

    expect(container.container).toMatchInlineSnapshot(`
      <div>
        <label
          class="textarea-container"
        >
          <div
            class="label-text-container"
          >
            <h6>
              ${LABEL}
            </h6>
          </div>
          <textarea
            aria-label="${LABEL}-textarea"
          />
        </label>
      </div>
      `);
  });

  test('ClassName passed in, should use className passed in', () => {
    const container = render(<TextArea className={CLASS_NAME} label={LABEL} />);

    expect(container.container).toMatchInlineSnapshot(`
      <div>
        <label
          class="${CLASS_NAME}-textarea-container"
        >
          <div
            class="label-text-container"
          >
            <h6>
              ${LABEL}
            </h6>
          </div>
          <textarea
            aria-label="${LABEL}-textarea"
          />
        </label>
      </div>
      `);
  });

  test('Input value is changed, event handler is called', () => {
    const onValueChange = jest.fn();
    const container = render(<TextArea label={LABEL} onValueChange={onValueChange} />);
    const input = queryByLabelText(container.container, `${LABEL}-textarea`);

    fireEvent.change(input, { target: { value: TEST_VALUE } });

    expect(onValueChange).toBeCalledTimes(1);
  });
});
