import React from "react";
import { render, fireEvent } from "test-utils";

import DotIndicator from "../DotIndicator";

const slides = [1, 2, 3];
const handleClick = jest.fn();
const currentIndex = 1;

describe("DotIndicator", () => {
  function setUp() {
    const { getByTestId, debug } = render(
      <DotIndicator
        slides={slides}
        onDotClicked={handleClick}
        currentIndex={currentIndex}
      />
    );

    const dotIndicator = getByTestId(/dot-indicator/i);
    return { dotIndicator, debug };
  }

  test("number of dots should be the same as slides", () => {
    const { dotIndicator } = setUp();

    expect(dotIndicator.children.length).toBe(slides.length);
  });

  test("should set dot at currentIndex to active", () => {
    const { dotIndicator } = setUp();
    const dotAtCurrentIndex = dotIndicator.children[currentIndex];

    expect(dotAtCurrentIndex.className).toMatch(/active/i);
  });

  test("should call click handler with correct index", () => {
    const expectedIndex = 2;
    const { dotIndicator } = setUp();

    fireEvent.click(dotIndicator.children[expectedIndex]);

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(expectedIndex);
  });
});
