import React from 'react';
import { render } from '@testing-library/react';

import FeatureContainer from '../FeatureContainer';

import '@testing-library/jest-dom/extend-expect';

const TEST = 'test';

describe('Feature Container Tests', () => {
  test('Initial Render', () => {
    const { queryByText } = render(
      <FeatureContainer>
        <p>{TEST}</p>
      </FeatureContainer>
    );
    expect(queryByText(TEST)).toBeTruthy();
  });

  test('Expect Snapshot to not be inverted', () => {
    const container = render(
      <FeatureContainer>
        <p>{TEST}</p>
      </FeatureContainer>
    );

    expect(container.container).toMatchInlineSnapshot(`
        <div>
          <div
            class="feature-container normal"
          >
            <div
              class=""
            >
              <p>
                ${TEST}
              </p>
            </div>
            <div
              class="feature-image-container"
            />
          </div>
        </div>
      `);
  });

  test('Expect Snapshot to be inverted', () => {
    const container = render(
      <FeatureContainer invert>
        <p>{TEST}</p>
      </FeatureContainer>
    );

    expect(container.container).toMatchInlineSnapshot(`
        <div>
          <div
            class="feature-container inverted"
          >
            <div
              class=""
            >
              <p>
                ${TEST}
              </p>
            </div>
            <div
              class="feature-image-container"
            />
          </div>
        </div>
      `);
  });
});
