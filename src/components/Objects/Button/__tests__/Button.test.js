import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Button from '../Button';

const TEST = 'test';

describe('Button Tests', () => {
  test('Initial Render', () => {
    const { queryByText } = render(
      <Button>
        <p>{TEST}</p>
      </Button>
    );
    expect(queryByText(TEST)).toBeTruthy();
  });

  test('Parent callback function called when button clicked', () => {
    const handleButtonClicked = jest.fn();
    const { queryByText } = render(
      <Button handleClick={handleButtonClicked}>
        <p>{TEST}</p>
      </Button>
    );
    fireEvent.click(queryByText(TEST));

    expect(handleButtonClicked).toBeCalledTimes(1);
  });
});
