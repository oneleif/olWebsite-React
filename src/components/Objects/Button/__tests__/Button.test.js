import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ReactGA from 'react-ga';

import Button from '../Button';

/**
 * Have to Mock React Google Analytics or test breaks
 */
jest.mock('react-ga');

const TEST = 'test';

describe('Button Tests', () => {
  const handleButtonClicked = jest.fn();

  function setUp() {
    const { queryByText } = render(
      <Button handleClick={handleButtonClicked}>
        <p>{TEST}</p>
      </Button>
    );

    return { queryByText };
  }
  test('Initial Render', () => {
    const { queryByText } = setUp();
    expect(queryByText(TEST)).toBeTruthy();
  });

  test('Parent callback function called and ReactGA event fired when button clicked', () => {
    const { queryByText } = setUp();
    fireEvent.click(queryByText(TEST));
    expect(ReactGA.event).toBeCalled();
    expect(handleButtonClicked).toBeCalledTimes(1);
  });
});
