import React from 'react';
import { render } from 'test-utils';

import Card from '../Card';

const TEST = 'test';
const CLASS_NAME = 'class-name';

describe('Card Tests', () => {
  test('Initial render', () => {
    const { queryByText } = render(
      <Card>
        <p>{TEST}</p>
      </Card>
    );
    expect(queryByText(TEST)).toBeTruthy();
  });

  test('No className passed in, should use default className only', () => {
    const container = render(
      <Card>
        <p>{TEST}</p>
      </Card>
    );

    expect(container.container).toMatchInlineSnapshot(`
    <div>
      <div
        class="card-module "
      >
        <p>
          ${TEST}
        </p>
      </div>
    </div>
      `);
  });

  test('ClassName passed in, should add className passed in', () => {
    const container = render(
      <Card className={CLASS_NAME}>
        <p>{TEST}</p>
      </Card>
    );

    expect(container.container).toMatchInlineSnapshot(`
    <div>
      <div
        class="card-module ${CLASS_NAME}"
      >
        <p>
          ${TEST}
        </p>
      </div>
    </div>
      `);
  });
});
