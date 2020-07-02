import React from 'react';
import { renderWithRouter, fireEvent } from 'test-utils';

import Tag from '../Tag';

const TEST = 'test';
const TEST_PATH = '/test';

describe('Tag Tests', () => {
  test('Initial render', () => {
    const { queryByText } = renderWithRouter(<Tag>{TEST}</Tag>);
    expect(queryByText(TEST)).toBeTruthy();
  });

  test('Url path changes after tag clicked', () => {
    const { history, queryByText } = renderWithRouter(<Tag target={TEST_PATH}>{TEST}</Tag>);
    fireEvent.click(queryByText(TEST));

    expect(history.location.pathname).toEqual(TEST_PATH);
  });
});
