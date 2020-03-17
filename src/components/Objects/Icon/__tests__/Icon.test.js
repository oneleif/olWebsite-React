import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Icon from '../Icon';

const TEST_LABEL = 'test';

describe('Icon Tests', () => {
  test('Initial render', () => {
    const { container } = render(<Icon />);
    expect(container).toBeTruthy();
  });

  test('Parent callback function called when icon clicked', () => {
    const handleButtonClicked = jest.fn();
    const { queryByLabelText } = render(<Icon handleClick={handleButtonClicked} label={TEST_LABEL} />);

    fireEvent.click(queryByLabelText(TEST_LABEL));

    expect(handleButtonClicked).toBeCalledTimes(1);
  });
});
