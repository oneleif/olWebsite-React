import React from 'react';
import { render } from '@testing-library/react';

import PageHeader from '../PageHeader';

const TEST_TITLE = 'title';
const TEST_COPY = 'copy';

describe('Page Header Tests', () => {
  test('Initial Render', () => {
    const { queryByText } = render(
      <PageHeader title={TEST_TITLE}>
        <p>{TEST_COPY}</p>
      </PageHeader>
    );

    expect(queryByText(TEST_TITLE)).toBeTruthy();
    expect(queryByText(TEST_COPY)).toBeTruthy();
  });
});
