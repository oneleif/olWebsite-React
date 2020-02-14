import React from 'react';

import SearchBox from '../SearchBox';
import { render, fireEvent } from 'test-utils';

describe('SearchBox', () => {
  const placeholderText = 'abc';

  function setUp(isCollapsible = true) {
    const searchHandler = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(
      <SearchBox onSearch={searchHandler} placeholder={placeholderText} isCollapsible={isCollapsible} />
    );

    const getIcon = () => getByTestId(/search-box-icon/i);
    const getInput = () => getByPlaceholderText(placeholderText);
    return { getIcon, getInput, searchHandler };
  }

  test('should transfer focus to input when icon is clicked', () => {
    const { getIcon, getInput } = setUp();

    fireEvent.click(getIcon());

    expect(document.activeElement).toBe(getInput());
  });

  describe('Collapsible', () => {
    test('input should be collapsed by default', () => {
      const { getInput } = setUp();

      expect(parseInt(getInput().style.width)).toBe(0);
    });

    test('should expand input when icon is clicked', () => {
      const { getIcon, getInput } = setUp();
      const input = getInput();

      expect(parseInt(input.style.width)).toBe(0);
      fireEvent.click(getIcon());

      expect(parseInt(input.style.width)).toBeGreaterThan(0);
    });

    test('should collapse input when blurred', () => {
      const { getInput } = setUp();
      const input = getInput();

      input.focus();
      expect(parseInt(input.style.width)).toBeGreaterThan(0);

      input.blur();
      expect(parseInt(input.style.width)).toBe(0);
    });

    test('icon click should only submit when input is expanded', () => {
      const { getIcon, getInput, searchHandler } = setUp();
      const icon = getIcon();

      // Collapsed input
      fireEvent.change(getInput(), { target: { value: 'abc' } });
      fireEvent.click(icon);

      expect(searchHandler).not.toHaveBeenCalled();

      // Expanded input
      fireEvent.click(icon);

      expect(searchHandler).toHaveBeenCalled();
    });
  });

  describe('Expanded', () => {
    test('input should be expanded by default', () => {
      const { getInput } = setUp(false);

      expect(parseInt(getInput().style.width)).toBeGreaterThan(0);
    });

    test('should not submit search when input value is empty', () => {
      const { getIcon, searchHandler } = setUp(false);

      fireEvent.click(getIcon());

      expect(searchHandler).not.toHaveBeenCalled();
    });

    test('should submit search with trimmed value when icon clicked', () => {
      const { getIcon, getInput, searchHandler } = setUp(false);
      const value = 'abc ';

      fireEvent.change(getInput(), { target: { value } });
      fireEvent.click(getIcon());

      expect(searchHandler).toHaveBeenCalledTimes(1);
      expect(searchHandler).toHaveBeenCalledWith(value.trim());
    });

    test('should submit search on Enter keypress', () => {
      const { getInput, searchHandler } = setUp(false);
      const input = getInput();
      const value = 'abc';

      fireEvent.change(input, { target: { value } });
      fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });

      expect(searchHandler).toHaveBeenCalledWith(value);
    });
  });
});
