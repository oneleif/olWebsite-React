import React from "react";
import SearchBox from "../SearchBox";
import { render, fireEvent } from "test-utils";

const searchHandler = jest.fn();

describe("SearchBox", () => {
  function setUp(isCollapsible = true) {
    const { getByPlaceholderText, getByTestId } = render(
      <SearchBox onSearch={searchHandler} isCollapsible={isCollapsible} />
    );
    return { getByTestId, getByPlaceholderText, searchHandler };
  }

  // TODO - remove
  test("should transfer focus from icon to input", () => {
    const { getByPlaceholderText, getByTestId } = setUp();

    getByTestId(/search-box-icon/).focus();

    expect(document.activeElement).toBe(getByPlaceholderText(/search/i));
  });

  describe("Collapsible", () => {
    test("should collapse input by default", () => {
      const { getByPlaceholderText } = setUp();
      const input = getByPlaceholderText(/search/i);

      expect(parseInt(input.style.width)).toBe(0);
    });

    // TODO-modify to icon click
    test("should expand input when icon focused", () => {
      const { getByPlaceholderText, getByTestId } = setUp();
      const input = getByPlaceholderText(/search/i);
      expect(parseInt(input.style.width)).toBe(0);

      getByTestId(/search-box-icon/).focus();

      expect(parseInt(input.style.width)).toBeGreaterThan(0);
    });

    test("should collapse input when blurred", () => {
      const { getByPlaceholderText, getByTestId } = setUp();
      const input = getByPlaceholderText(/search/i);

      getByTestId(/search-box-icon/).focus();
      expect(parseInt(input.style.width)).toBeGreaterThan(0);

      input.blur();
      expect(parseInt(input.style.width)).toBe(0);
    });
  });

  describe("Expanded", () => {
    test("should expand input by default", () => {
      const { getByPlaceholderText } = setUp(false);
      const input = getByPlaceholderText(/search/i);

      expect(parseInt(input.style.width)).toBeGreaterThan(0);
    });

    test("should not submit search when input value is empty", () => {
      const { getByTestId, getByPlaceholderText, searchHandler } = setUp(false);
      const input = getByPlaceholderText(/search/i);
      const icon = getByTestId(/search-box-icon/);

      fireEvent.mouseDown(icon);
      fireEvent.keyPress(input);

      expect(searchHandler).not.toHaveBeenCalled();
    });

    test("should submit search with trimmed value when icon clicked", () => {
      const { getByTestId, getByPlaceholderText, searchHandler } = setUp(false);
      const value = "abc ";

      fireEvent.change(getByPlaceholderText(/search/i), {
        target: { value }
      });
      fireEvent.mouseDown(getByTestId(/search-box-icon/));

      expect(searchHandler).toHaveBeenCalledTimes(1);
      expect(searchHandler).toHaveBeenCalledWith(value.trim());
    });

    test("should submit search on Enter keypress", () => {
      const { getByPlaceholderText, searchHandler } = setUp(false);
      const input = getByPlaceholderText(/search/i);
      const value = "abc";

      fireEvent.change(input, { target: { value } });
      fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });

      expect(searchHandler).toHaveBeenCalledWith(value);
    });
  });
});
