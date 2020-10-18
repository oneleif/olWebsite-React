import React from 'react';
import { render, fireEvent } from 'test-utils';

import ContactUsView from '../ContactUsView';

const PAGE_HEADER = 'Contact Us';
const SEND = /send/i;
const TEST_INPUT = 'this is a test';
const MESSAGE_TEXTAREA = 'Message-textarea';
const EMAIL_INPUT = 'Email-input';
const NAME_INPUT = 'Name-input';

const EMAIL_ERROR = 'Please enter your email';
const INVALID_EMAIL = 'Please enter a valid email';
const NAME_ERROR = 'Please enter your name';
const MESSAGE_ERROR = 'Please enter your message';

describe('Contact Us View Tests', () => {
  function setUp() {
    return render(<ContactUsView />);
  }

  function fireChangeEvent(labelText, queryByLabelText, testInput = TEST_INPUT) {
    fireEvent.change(queryByLabelText(labelText), { target: { value: testInput } });
  }

  test('Initial render', () => {
    const { queryByText } = setUp();
    expect(queryByText(PAGE_HEADER)).toBeTruthy();
  });

  test('Name value set then erased, error message present', () => {
    const { queryByLabelText, queryByText } = setUp();

    fireChangeEvent(NAME_INPUT, queryByLabelText);
    fireChangeEvent(NAME_INPUT, queryByLabelText, '');

    expect(queryByText(NAME_ERROR)).toBeTruthy();
  });

  test('Email value set then erased, error message present', () => {
    const { queryByLabelText, queryByText } = setUp();

    fireChangeEvent(EMAIL_INPUT, queryByLabelText);
    fireChangeEvent(EMAIL_INPUT, queryByLabelText, '');

    expect(queryByText(EMAIL_ERROR)).toBeTruthy();
  });

  test('Invalid email value set, error message present', () => {
    const { queryByLabelText, queryByText } = setUp();

    fireChangeEvent(EMAIL_INPUT, queryByLabelText);

    expect(queryByText(INVALID_EMAIL)).toBeTruthy();
  });

  test('Message value set then erased, error message present', () => {
    const { queryByLabelText, queryByText } = setUp();

    fireChangeEvent(MESSAGE_TEXTAREA, queryByLabelText);
    fireChangeEvent(MESSAGE_TEXTAREA, queryByLabelText, '');

    expect(queryByText(MESSAGE_ERROR)).toBeTruthy();
  });

  test('No values entered with send clicked, all error messages shown', () => {
    const { queryByText } = setUp();

    fireEvent.click(queryByText(SEND));

    expect(queryByText(NAME_ERROR)).toBeTruthy();
    expect(queryByText(EMAIL_ERROR)).toBeTruthy();
    expect(queryByText(MESSAGE_ERROR)).toBeTruthy();
  });

  test('Name entered and send clicked, error messages present', () => {
    const { queryByLabelText, queryByText } = setUp();

    fireChangeEvent(NAME_INPUT, queryByLabelText);
    fireEvent.click(queryByText(SEND));

    expect(queryByText(EMAIL_ERROR)).toBeTruthy();
    expect(queryByText(MESSAGE_ERROR)).toBeTruthy();
  });

  test('Message entered and send clicked, error message present', () => {
    const { queryByLabelText, queryByText } = setUp();

    fireChangeEvent(MESSAGE_TEXTAREA, queryByLabelText);
    fireEvent.click(queryByText(SEND));

    expect(queryByText(NAME_ERROR)).toBeTruthy();
    expect(queryByText(EMAIL_ERROR)).toBeTruthy();
  });
});
