import React from 'react';
import ReactGA from 'react-ga';

import ButtonLink from '../ButtonLink';
import { render, fireEvent, renderWithRouter } from 'test-utils';

/**
 * Have to Mock React Google Analytics or test breaks
 */
jest.mock('react-ga');

const TEST = 'test';
const TEST_PATH = '/test';

describe('Button Link Tests', () => {
  const handleButtonClicked = jest.fn();

  function setUp() {
    const { queryByText } = render(<ButtonLink handleClick={handleButtonClicked}>{TEST}</ButtonLink>);
    return { queryByText };
  }

  test('Initial Render', () => {
    const { queryByText } = setUp();
    expect(queryByText(TEST)).toBeTruthy();
  });

  test('Url path changes after internal button link clicked', () => {
    const { history, queryByText } = renderWithRouter(
      <ButtonLink handleClick={handleButtonClicked} path={TEST_PATH}>
        {TEST}
      </ButtonLink>
    );
    fireEvent.click(queryByText(TEST));
    expect(history.location.pathname).toEqual(TEST_PATH);
  });

  test('Parent callback function called and ReactGA event fired when external button link clicked', () => {
    const { queryByText } = setUp();
    fireEvent.click(queryByText(TEST));
    expect(ReactGA.event).toBeCalled();
    expect(handleButtonClicked).toBeCalledTimes(1);
  });
});
