import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ReactGA from 'react-ga';

import Icon from '../Icon';

/**
 * Have to Mock React Google Analytics or test breaks
 */
jest.mock('react-ga');

const TEST_LABEL = 'test';

describe('Icon Tests', () => {
  const handleButtonClicked = jest.fn();

  function setUp() {
    const { container, queryByLabelText } = render(<Icon handleClick={handleButtonClicked} label={TEST_LABEL} />);
    return { container, queryByLabelText };
  }

  test('Initial render', () => {
    const { container } = setUp();
    expect(container).toBeTruthy();
  });

  test('Parent callback function called when icon clicked', () => {
    const { queryByLabelText } = setUp();
    fireEvent.click(queryByLabelText(TEST_LABEL));

    expect(handleButtonClicked).toBeCalledTimes(1);
  });

  test('ReactGA event fired after link clicked', () => {
    const { queryByLabelText } = setUp();
    fireEvent.click(queryByLabelText(TEST_LABEL));

    expect(ReactGA.event).toHaveBeenCalled();
  });
});
