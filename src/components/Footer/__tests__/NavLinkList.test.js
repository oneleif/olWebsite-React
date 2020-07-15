import React from 'react';
import { renderWithRouter, fireEvent } from 'test-utils';

import NavLinkList from '../NavLinkList';
import ReactGA from 'react-ga';

/**
 * Have to Mock React Google Analytics or test breaks
 */
jest.mock('react-ga');

const TEST_HEADER = 'Test';

const INTERNAL_TEST_LINK = [
  {
    label: 'test',
    path: '/test',
    internal: true
  }
];
const EXTERNAL_TEST_LINK = [
  {
    label: 'test',
    path: 'https://discordapp.com/invite/2jepA3',
    internal: false
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
            <h4>
              ${TEST_HEADER}
            </h4>
            <ul />
          </div>
        </div>
      `);
  });

  test('Expect Snapshot to container header and internal link', () => {
    const container = buildContainer(TEST_HEADER, INTERNAL_TEST_LINK);
    expect(container.container).toMatchInlineSnapshot(`
        <div>
          <div
            class="nav-link-list-container"
          >
            <h4>
              ${TEST_HEADER}
            </h4>
            <ul>
              <li>
                <a
                  href="${INTERNAL_TEST_LINK[0].path}"
                >
                  ${INTERNAL_TEST_LINK[0].label}
                </a>
              </li>
            </ul>
          </div>
        </div>
      `);
  });

  test('Expect Snapshot to container header and external link', () => {
    const container = buildContainer(TEST_HEADER, EXTERNAL_TEST_LINK);
    expect(container.container).toMatchInlineSnapshot(`
        <div>
          <div
            class="nav-link-list-container"
          >
            <h4>
              ${TEST_HEADER}
            </h4>
            <ul>
              <li>
                <a
                  href="${EXTERNAL_TEST_LINK[0].path}"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  ${EXTERNAL_TEST_LINK[0].label}
                </a>
              </li>
            </ul>
          </div>
        </div>
      `);
  });

  test('Url path changes after internal link clicked', () => {
    const { history, queryByText } = renderWithRouter(<NavLinkList header={TEST_HEADER} links={INTERNAL_TEST_LINK} />);
    fireEvent.click(queryByText(INTERNAL_TEST_LINK[0].label));

    expect(history.location.pathname).toEqual(INTERNAL_TEST_LINK[0].path);
  });

  test('ReactGA event fired after external link clicked', () => {
    const { queryByText } = renderWithRouter(<NavLinkList header={TEST_HEADER} links={EXTERNAL_TEST_LINK} />);
    fireEvent.click(queryByText(INTERNAL_TEST_LINK[0].label));

    expect(ReactGA.event).toBeCalled();
  });
});
