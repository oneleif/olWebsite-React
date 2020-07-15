import React from 'react';
import { render, screen, fireEvent, act } from 'test-utils';

import Carousel from '../Carousel';

const slides = ['1', '2', '3', '4', '5'];
const firstPosition = 0;
const defaultSlideInterval = 1;

describe('Carousel', () => {
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
    return screen.getAllByTestId(/slide/i).find(node => node.hasAttribute('current_slide') === true).textContent;
  }

  function getNextArrow() {
    return screen.getByTestId(/arrow-right/);
  }

  function getPreviousArrow() {
    return screen.getByTestId(/arrow-left/);
  }

  const initialPositionTests = [
    {
      options: { initialPosition: 3, isAutomatic: false },
      description: 'should start at given slide',
      expectedPosition: 3
    },
    {
      options: { initialPosition: -5, isAutomatic: false },
      description: 'should default to first slide when given negative initialPosition',
      expectedPosition: firstPosition
    },
    {
      options: { initialPosition: slides.length + 1, isAutomatic: false },
      description: 'should default to first slide when given initialPosition greater than slide number',
      expectedPosition: firstPosition
    }
  ];

  initialPositionTests.map(testCase => {
    const { options, description, expectedPosition } = testCase;

    test(description, () => {
      setUp(options);

      expect(getCurrentSlide()).toBe(slides[expectedPosition]);
    });
  });

  test('current slide index should match active dot index', () => {
    const options = { initialPosition: firstPosition, isAutomatic: false };
    setUp(options);

    expect(screen.getByTestId(/dot-indicator/).children[firstPosition].className).toMatch(/active/);

    expect(getCurrentSlide()).toBe(slides[firstPosition]);
  });

  describe('Navigation', () => {
    const navigationByArrowTests = [
      {
        expectedPosition: firstPosition + 1,
        getElementUnderTest: getNextArrow,
        testEvent: element => fireEvent.click(element),
        options: { initialPosition: firstPosition, isAutomatic: false },
        description: 'should navigate to next slide when next arrow is clicked'
      },
      {
        expectedPosition: firstPosition,
        getElementUnderTest: getPreviousArrow,
        testEvent: element => fireEvent.click(element),
        options: { initialPosition: firstPosition + 1, isAutomatic: false },
        description: 'should navigate to previous slide when previous arrow is clicked'
      }
    ];

    navigationByArrowTests.map(testCase => {
      const { options, description, testEvent, expectedPosition, getElementUnderTest } = testCase;

      test(description, () => {
        setUp(options);

        testEvent(getElementUnderTest());

        expect(getCurrentSlide()).toBe(slides[expectedPosition]);
      });
    });

    test('should navigate to corresponding slide when dot clicked', () => {
      const options = { initialPosition: firstPosition, isAutomatic: false };
      setUp(options);
      const newPosition = 3;

      fireEvent.click(screen.getByTestId(/dot-indicator/).children[newPosition]);

      expect(getCurrentSlide()).toBe(slides[newPosition]);
    });

    test('should start navigating automatically', () => {
      const options = {
        interval: defaultSlideInterval,
        initialPosition: firstPosition
      };
      setUp(options);

      expect(getCurrentSlide()).toBe(slides[firstPosition]);

      act(() => jest.advanceTimersByTime(defaultSlideInterval));

      expect(getCurrentSlide()).toBe(slides[firstPosition + 1]);
    });

    test('should navigate at given interval', () => {
      const options = {
        interval: defaultSlideInterval,
        initialPosition: firstPosition
      };
      const expectedPosition = options.initialPosition + 2;
      setUp(options);

      expect(getCurrentSlide()).toBe(slides[firstPosition]);

      act(() => jest.advanceTimersByTime(defaultSlideInterval * 2));

      expect(getCurrentSlide()).toBe(slides[expectedPosition]);
    });

    /**
     * Didn't combine "pause" and "restart" tests, despite the code
     * repetition ("restart" tests also test pause events during setup),
     * because this way it's easier to determine with a glance exactly
     * what is failing without needing to wade through the actual test.
     */
    describe('Pause navigation', () => {
      const pauseNavigationTests = [
        {
          ticks: 2,
          expectedPosition: firstPosition,
          getElementUnderTest: getNextArrow,
          options: {
            interval: defaultSlideInterval,
            initialPosition: firstPosition
          },
          testEvent: element => fireEvent.mouseOver(element),
          description: 'should pause navigation when mouse hovers on next arrow'
        },
        {
          ticks: 2,
          expectedPosition: firstPosition,
          getElementUnderTest: getPreviousArrow,
          options: {
            interval: defaultSlideInterval,
            initialPosition: firstPosition
          },
          testEvent: element => fireEvent.mouseOver(element),
          description: 'should pause navigation when mouse hovers on previous arrow'
        },
        {
          ticks: 2,
          expectedPosition: firstPosition,
          getElementUnderTest: getNextArrow,
          options: {
            interval: defaultSlideInterval,
            initialPosition: firstPosition
          },
          testEvent: element => element.focus(),
          description: 'should pause navigation when next arrow is focused'
        },
        {
          ticks: 2,
          expectedPosition: firstPosition,
          getElementUnderTest: getPreviousArrow,
          options: {
            interval: defaultSlideInterval,
            initialPosition: firstPosition
          },
          testEvent: element => element.focus(),
          description: 'should pause navigation when previous arrow is focused'
        }
      ];

      pauseNavigationTests.map(testCase => {
        const { ticks, options, testEvent, description, expectedPosition, getElementUnderTest } = testCase;

        test(description, () => {
          setUp(options);

          expect(getCurrentSlide()).toBe(slides[options.initialPosition]);

          testEvent(getElementUnderTest());

          act(() => jest.advanceTimersByTime(options.interval * ticks));
          expect(getCurrentSlide()).toBe(slides[expectedPosition]);
        });
      });
    });

    describe('Restart navigation', () => {
      const restartNavigationTests = [
        {
          ticks: 2,
          expectedPosition: firstPosition + 2,
          getElementUnderTest: getNextArrow,
          options: {
            interval: defaultSlideInterval,
            initialPosition: firstPosition
          },
          stopEvent: element => fireEvent.mouseOver(element),
          startEvent: element => fireEvent.mouseLeave(element),
          description: 'should restart navigation when mouse leaves next arrow'
        },
        {
          ticks: 2,
          expectedPosition: firstPosition + 4,
          getElementUnderTest: getPreviousArrow,
          options: {
            interval: defaultSlideInterval,
            initialPosition: firstPosition + 2
          },
          stopEvent: element => fireEvent.mouseOver(element),
          startEvent: element => fireEvent.mouseLeave(element),
          description: 'should restart navigation when mouse leaves previous arrow'
        },
        {
          ticks: 2,
          expectedPosition: firstPosition + 2,
          getElementUnderTest: getNextArrow,
          options: {
            interval: defaultSlideInterval,
            initialPosition: firstPosition
          },
          stopEvent: element => element.focus(),
          startEvent: element => element.blur(),
          description: 'should restart navigation when next arrow loses focus'
        },
        {
          ticks: 2,
          expectedPosition: firstPosition + 4,
          getElementUnderTest: getPreviousArrow,
          options: {
            interval: defaultSlideInterval,
            initialPosition: firstPosition + 2
          },
          stopEvent: element => element.focus(),
          startEvent: element => element.blur(),
          description: 'should restart navigation when previous arrow loses focus'
        }
      ];

      restartNavigationTests.map(testCase => {
        const { ticks, options, stopEvent, startEvent, description, expectedPosition, getElementUnderTest } = testCase;

        test(description, () => {
          setUp(options);

          stopEvent(getElementUnderTest());
          act(() => jest.advanceTimersByTime(options.interval * ticks));

          expect(getCurrentSlide()).toBe(slides[options.initialPosition]);

          startEvent(getElementUnderTest());
          act(() => jest.advanceTimersByTime(options.interval * ticks));

          expect(getCurrentSlide()).toBe(slides[expectedPosition]);
        });
      });
    });
  });
});
