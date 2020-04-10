import React from 'react';
import { render, fireEvent } from 'test-utils';

import ContactUsView from '../ContactUsView';

const PAGE_HEADER = 'Contact Us';
const SEND = /send/i;
const EXPECTED_OUTPUT = 'mailto:oneleifdev@gmail.com?subject=this%20is%20a%20test&body=this%20is%20a%20test';
const TEST_INPUT = 'this is a test';
const MESSAGE_TEXTAREA = 'Message-textarea';
const SUBJECT_INPUT = 'Subject-input';

describe('Contact Us View Tests', () => {
  function setUp() {
    return render(<ContactUsView />);
  }

  function fireChangeEvent(labelText, queryByLabelText) {
    fireEvent.change(queryByLabelText(labelText), { target: { value: TEST_INPUT } });
  }

  test('Initial render', () => {
    const { queryByText } = setUp();
    expect(queryByText(PAGE_HEADER)).toBeTruthy();
  });

  test('Href Target should be empty by default', () => {
    const { queryByLabelText } = setUp();

    expect(queryByLabelText(SEND).getAttribute('href')).toEqual('');
  });

  test('Message value set, Href should still be empty', () => {
    const { queryByLabelText } = setUp();

    fireChangeEvent(MESSAGE_TEXTAREA, queryByLabelText);

    expect(queryByLabelText(SEND).getAttribute('href')).toEqual('');
  });

  test('Subject value set, Href should still be empty', () => {
    const { queryByLabelText } = setUp();

    fireChangeEvent(SUBJECT_INPUT, queryByLabelText);

    expect(queryByLabelText(SEND).getAttribute('href')).toEqual('');
  });

  test('Both inputs have values, href is set with the parsed values', () => {
    const { queryByLabelText } = setUp();

    fireChangeEvent(MESSAGE_TEXTAREA, queryByLabelText);
    fireChangeEvent(SUBJECT_INPUT, queryByLabelText);

    expect(queryByLabelText(SEND).getAttribute('href')).toEqual(EXPECTED_OUTPUT);
  });
});
