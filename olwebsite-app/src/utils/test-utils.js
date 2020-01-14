import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";

// Including this to get extended Jest matchers for expect
import "@testing-library/jest-dom/extend-expect";

const defaultRoute = "/";
const defaultOptions = {};

const renderWithRouter = (
  ui,
  {
    route = defaultRoute,
    history = createMemoryHistory({ initialEntries: [route] })
  } = defaultOptions
) => {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history
  };
};

export * from "@testing-library/react";
export { renderWithRouter };
