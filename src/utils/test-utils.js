import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, getByLabelText, fireEvent, getByText } from '@testing-library/react';

// Including this to get extended Jest matchers for expect
import '@testing-library/jest-dom/extend-expect';

const defaultRoute = '/';
const defaultOptions = {};

export function renderWithRouter(
  ui,
  { route = defaultRoute, history = createMemoryHistory({ initialEntries: [route] }) } = defaultOptions
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history
  };
}

/**
 * Fires mouse click event to click on value
 * with Label/Aria Label passed in
 * @param container - the DOM of the rendered component
 * @param label - label or aria label of button/input to be clicked
 */
export function clickEventByLabelText(container, label) {
  fireEvent(
    getByLabelText(container, label),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    })
  );
}

/**
 * Fires mouse click event to click on value
 * with Text passed in
 * @param container - the DOM of the rendered component
 * @param label - label or aria label of button/input to be clicked
 */
export function clickEventByText(container, label) {
  fireEvent(
    getByText(container, label),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    })
  );
}

export * from '@testing-library/react';
