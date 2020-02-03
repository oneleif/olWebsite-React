import React from "react";

// 'Extended' wrapper for react-testing-library
import { renderWithRouter } from "test-utils";

import OlWebsiteApp from "../OlWebsiteApp";

describe("OlWebsiteApp", () => {
  // Dummy test
  test("renders without crashing", () => {
    const { container } = renderWithRouter(<OlWebsiteApp />);

    expect(container).toBeVisible();
  });
});
