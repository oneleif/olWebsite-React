import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Button from '../Button';

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

  test('Parent callback function called when button clicked', () => {
    const { queryByText } = setUp();
    fireEvent.click(queryByText(TEST));
    expect(handleButtonClicked).toBeCalledTimes(1);
  });
});
