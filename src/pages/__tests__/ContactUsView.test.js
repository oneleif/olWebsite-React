import React from 'react';
import { render, fireEvent } from 'test-utils';

import ContactUsView from '../ContactUsView';
import ReactGA from 'react-ga';

/**
 * Have to Mock React Google Analytics or test breaks
 */
jest.mock('react-ga');

const PAGE_HEADER = 'Contact Us';
const SEND = /send/i;
const EXPECTED_OUTPUT = 'mailto:oneleifdev@gmail.com?subject=this%20is%20a%20test&body=this%20is%20a%20test';
const TEST_INPUT = 'this is a test';
const MESSAGE_TEXTAREA = 'Message-textarea';
const SUBJECT_INPUT = 'Subject-input';
const SUBJECT_ERROR = 'Please enter a subject';
const MESSAGE_ERROR = 'Please enter a message';

describe('Contact Us View Tests', () => {
  function setUp() {
    return render(<ContactUsView />);
  }

  function fireChangeEvent(labelText, queryByLabelText, testInput = TEST_INPUT) {
    fireEvent.change(queryByLabelText(labelText), { target: { value: testInput } });
  }

  afterEach(() => {
    jest.clearAllMocks();
  });

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

  test('Subject value set then erased, error message present', () => {
    const { queryByLabelText, queryByText } = setUp();

    fireChangeEvent(SUBJECT_INPUT, queryByLabelText);
    fireChangeEvent(SUBJECT_INPUT, queryByLabelText, '');

    expect(queryByText(SUBJECT_ERROR)).toBeTruthy();
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

    expect(queryByText(SUBJECT_ERROR)).toBeTruthy();
    expect(queryByText(MESSAGE_ERROR)).toBeTruthy();
  });

  test('Subject entered and send clicked, error message present', () => {
    const { queryByLabelText, queryByText } = setUp();

    fireChangeEvent(SUBJECT_INPUT, queryByLabelText);
    fireEvent.click(queryByText(SEND));

    expect(queryByText(MESSAGE_ERROR)).toBeTruthy();
  });

  test('Message entered and send clicked, error message present', () => {
    const { queryByLabelText, queryByText } = setUp();

    fireChangeEvent(MESSAGE_TEXTAREA, queryByLabelText);
    fireEvent.click(queryByText(SEND));

    expect(queryByText(SUBJECT_ERROR)).toBeTruthy();
  });

  test('Send Button Clicked with invalid inputs, ReactGA event sent once', () => {
    const { queryByText } = setUp();

    fireEvent.click(queryByText(SEND));

    expect(ReactGA.event).toHaveBeenCalledTimes(1);
  });

  /** TODO: Can't test this functionality until we send emails from backend, clicking the valid link
   * throws errors involving navigation not being implemented - https://github.com/jsdom/jsdom/issues/2112
   */

  test.skip('Send Button Clicked with valid inputs, ReactGA event sent twice', () => {
    const { queryByText, queryByLabelText } = setUp();

    fireChangeEvent(MESSAGE_TEXTAREA, queryByLabelText);
    fireChangeEvent(SUBJECT_INPUT, queryByLabelText);
    fireEvent.click(queryByText(SEND));

    expect(ReactGA.event).toHaveBeenCalledTimes(2);
  });
});
