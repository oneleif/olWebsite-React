import React from 'react';
import { renderWithRouter, fireEvent } from 'test-utils';

import NavLinkList from '../NavLinkList';

const TEST_HEADER = 'Test';

const TEST_LINK = [
  {
    label: 'test',
    path: '/test'
  }
];

describe('Nav Link List Tests', () => {
  function buildContainer(header, links) {
    return renderWithRouter(<NavLinkList header={header} links={links} />);
  }

  test('Initial render', () => {
    const { queryByText } = renderWithRouter(<NavLinkList header={TEST_HEADER} />);
    expect(queryByText(TEST_HEADER)).toBeTruthy();
  });

  test('Expect Snapshot to container header and no links', () => {
    const container = buildContainer(TEST_HEADER, null);
    expect(container.container).toMatchInlineSnapshot(`
        <div>
          <div
            class="nav-link-list-container"
          >
            <h5>
              ${TEST_HEADER}
            </h5>
            <ul />
          </div>
        </div>
      `);
  });

  test('Expect Snapshot to container header and links', () => {
    const container = buildContainer(TEST_HEADER, TEST_LINK);
    expect(container.container).toMatchInlineSnapshot(`
        <div>
          <div
            class="nav-link-list-container"
          >
            <h5>
              ${TEST_HEADER}
            </h5>
            <ul>
              <li>
                <a
                  href="${TEST_LINK[0].path}"
                >
                  ${TEST_LINK[0].label}
                </a>
              </li>
            </ul>
          </div>
        </div>
      `);
  });

  test('Url path changes after link clicked', () => {
    const { history, queryByText } = renderWithRouter(<NavLinkList header={TEST_HEADER} links={TEST_LINK} />);
    fireEvent.click(queryByText(TEST_LINK[0].label));

    expect(history.location.pathname).toEqual(TEST_LINK[0].path);
  });
});
