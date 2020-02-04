import React from "React";
import {
  render,
  screen,
  debug,
  fireEvent,
  wait,
  waitForDomChange,
  waitForElement,
  act
} from "test-utils";
import Carousel from "../Carousel";

const slides = ["1", "2", "3", "4", "5"];
const lastPosition = slides.length - 1;
const intervalTick = 2;
const firstPosition = 0;
const defaultSlideInterval = 100;

describe("Carousel", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  function setUp(options) {
    render(<Carousel slides={slides} {...options} />);
  }

  function getCurrentSlide() {
    return screen
      .getAllByTestId(/slide/i)
      .find(node => node.hasAttribute("current_slide") === true);
  }

  function getNextArrow() {
    return screen.getByTestId(/arrow-right/);
  }

  function getPreviousArrow() {
    return screen.getByTestId(/arrow-left/);
  }

  test("current slide index should match active dot index", () => {
    const options = { initialPosition: firstPosition, isAutomatic: false };
    setUp(options);

    expect(
      screen.getByTestId(/dot-indicator/).children[firstPosition].className
    ).toMatch(/active/);

    expect(getCurrentSlide().textContent).toBe(slides[firstPosition]);
  });

  test("should start at given slide", () => {
    const expectedPosition = 3;
    const options = { initialPosition: expectedPosition, isAutomatic: false };
    setUp(options);

    expect(getCurrentSlide().textContent).toBe(slides[expectedPosition]);
  });

  test("should default to first slide when given negative initialPosition", () => {
    const options = { initialPosition: -5, isAutomatic: false };
    setUp(options);

    expect(getCurrentSlide().textContent).toBe(slides[firstPosition]);
  });

  test("should default to first slide when given initialPosition greater than slide number", () => {
    const options = { initialPosition: slides.length + 1, isAutomatic: false };
    setUp(options);

    expect(getCurrentSlide().textContent).toBe(slides[firstPosition]);
  });

  test("should navigate to next and previous slides when corresponding arrow clicked", () => {
    const options = { initialPosition: firstPosition, isAutomatic: false };
    setUp(options);

    // right-arrow click
    fireEvent.click(getNextArrow());
    let newPosition = options.initialPosition + 1;

    expect(getCurrentSlide().textContent).toBe(slides[newPosition]);

    // left-arrow click
    fireEvent.click(getPreviousArrow());
    newPosition -= 1;

    expect(getCurrentSlide().textContent).toBe(slides[newPosition]);
  });

  test("should navigate to corresponding slide when dot clicked", () => {
    const options = { initialPosition: firstPosition, isAutomatic: false };
    setUp(options);
    const newPosition = 3;

    fireEvent.click(screen.getByTestId(/dot-indicator/).children[newPosition]);

    expect(getCurrentSlide().textContent).toBe(slides[newPosition]);
  });

  describe("Automatic", () => {
    test("should start navigating automatically", () => {
      const options = {
        interval: defaultSlideInterval,
        initialPosition: firstPosition
      };
      setUp(options);

      expect(getCurrentSlide().textContent).toBe(slides[firstPosition]);

      act(() => jest.advanceTimersByTime(defaultSlideInterval));
      expect(getCurrentSlide().textContent).toBe(slides[firstPosition + 1]);
    });

    test("should navigate at given interval", () => {
      const options = {
        interval: defaultSlideInterval,
        initialPosition: firstPosition
      };
      setUp(options);

      expect(getCurrentSlide().textContent).toBe(slides[firstPosition]);

      const expectedPosition = options.initialPosition + 2;
      act(() => jest.advanceTimersByTime(defaultSlideInterval * 2));
      expect(getCurrentSlide().textContent).toBe(slides[expectedPosition]);
    });

    test("should stop navigation when mouse hovers on next arrow", () => {
      const options = {
        interval: defaultSlideInterval,
        initialPosition: firstPosition
      };
      setUp(options);

      expect(getCurrentSlide().textContent).toBe(slides[firstPosition]);
      fireEvent.mouseOver(getNextArrow());

      act(() => jest.advanceTimersByTime(defaultSlideInterval * 2));
      expect(getCurrentSlide().textContent).toBe(slides[firstPosition]);
    });

    test("should restart navigation when mouse leaves right arrow", () => {
      const options = {
        interval: defaultSlideInterval,
        initialPosition: firstPosition
      };
      setUp(options);

      fireEvent.mouseOver(getNextArrow());
      act(() => jest.advanceTimersByTime(defaultSlideInterval * 2));

      expect(getCurrentSlide().textContent).toBe(slides[firstPosition]);

      fireEvent.mouseLeave(getNextArrow());
      act(() => jest.advanceTimersByTime(defaultSlideInterval * 2));

      expect(getCurrentSlide().textContent).toBe(slides[firstPosition + 2]);
    });

    test("should stop navigation when next arrow is focused", () => {
      const options = {
        interval: defaultSlideInterval,
        initialPosition: firstPosition
      };
      setUp(options);

      expect(getCurrentSlide().textContent).toBe(slides[firstPosition]);

      getNextArrow().focus();
      act(() => jest.advanceTimersByTime(defaultSlideInterval * 2));

      expect(getCurrentSlide().textContent).toBe(slides[firstPosition]);
    });

    test("should restart navigation when right arrow loses focus", () => {
      const options = {
        interval: defaultSlideInterval,
        initialPosition: firstPosition
      };
      setUp(options);

      getNextArrow().focus();
      act(() => jest.advanceTimersByTime(defaultSlideInterval * 2));

      expect(getCurrentSlide().textContent).toBe(slides[firstPosition]);

      getNextArrow().blur();
      act(() => jest.advanceTimersByTime(defaultSlideInterval * 2));

      expect(getCurrentSlide().textContent).toBe(slides[firstPosition + 2]);
    });

    test("should stop auto navigation when mouse hovers on previous arrow", () => {
      const initialPosition = firstPosition + 2;
      const options = {
        interval: defaultSlideInterval,
        initialPosition
      };
      setUp(options);

      expect(getCurrentSlide().textContent).toBe(slides[initialPosition]);
      fireEvent.mouseOver(getPreviousArrow());

      act(() => jest.advanceTimersByTime(defaultSlideInterval * 2));
      expect(getCurrentSlide().textContent).toBe(slides[initialPosition]);
    });

    test("should restart navigation when mouse leaves previous arrow", () => {
      const initialPosition = firstPosition + 2;
      const options = {
        interval: defaultSlideInterval,
        initialPosition
      };
      setUp(options);

      fireEvent.mouseOver(getPreviousArrow());
      act(() => jest.advanceTimersByTime(defaultSlideInterval * 2));

      expect(getCurrentSlide().textContent).toBe(slides[initialPosition]);

      fireEvent.mouseLeave(getPreviousArrow());
      act(() => jest.advanceTimersByTime(defaultSlideInterval * 2));

      expect(getCurrentSlide().textContent).toBe(slides[initialPosition + 2]);
    });

    test("should stop navigation when previous arrow is focused", () => {
      const initialPosition = firstPosition + 2;
      const options = {
        interval: defaultSlideInterval,
        initialPosition
      };
      setUp(options);

      expect(getCurrentSlide().textContent).toBe(slides[initialPosition]);

      getPreviousArrow().focus();
      act(() => jest.advanceTimersByTime(defaultSlideInterval * 2));

      expect(getCurrentSlide().textContent).toBe(slides[initialPosition]);
    });

    test("should restart navigation when previous arrow loses focus", () => {
      const initialPosition = firstPosition + 2;
      const options = {
        interval: defaultSlideInterval,
        initialPosition
      };
      setUp(options);

      getPreviousArrow().focus();
      act(() => jest.advanceTimersByTime(defaultSlideInterval * 2));

      expect(getCurrentSlide().textContent).toBe(slides[initialPosition]);

      getPreviousArrow().blur();
      act(() => jest.advanceTimersByTime(defaultSlideInterval * 2));

      expect(getCurrentSlide().textContent).toBe(slides[initialPosition + 2]);
    });
  });
});
