import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { FaSearch } from "react-icons/fa";

/**
 * Note the use of ref over state for the input.
 * Having the input value as state is preferred, but
 * since the component is neither controlled nor
 * calling the search handler onChange, getting the
 * value from the ref is acceptable, even more so since
 * the ref is also being used to focus the input element.
 */
export default function SearchBox({ isCollapsible, onSearch, placeholder }) {
  /************************************
   * State
   ************************************/

  const [isCollapsed, setIsCollapsed] = useState(isCollapsible);

  /************************************
   * References
   ************************************/

  const inputRef = useRef(null);

  /************************************
   * Functions
   ************************************/

  function submitSearch(searchQuery) {
    const query = searchQuery.trim();

    if (query !== "") {
      onSearch(query);
    }
  }

  function handleIconMouseDown(event) {
    /**
     * Preventing the default behavior will stop whatever element
     * that is currently in focus from being blurred. In this case
     * the input will NOT be blurred (isCollapsed will remain false)
     * event order: mouseDown => blur => click
     */
    event.preventDefault();
  }

  function handleIconClick() {
    if (!isCollapsed) {
      submitSearch(inputRef.current.value);
    }

    inputRef.current.focus();
  }

  function handleIconKeyPress({ key }) {
    if (key === "Enter") {
      inputRef.current.focus();
    }
  }

  function handleInputFocus() {
    if (isCollapsible) {
      setIsCollapsed(false);
    }
  }

  function handleInputKeyPress({ key, target }) {
    if (key === "Enter") {
      submitSearch(target.value);
    }
  }

  function handleInputBlur() {
    if (isCollapsible) {
      setIsCollapsed(true);
    }
  }

  /************************************
   * Render
   ************************************/

  const inputStyle = { width: isCollapsed ? "0" : "100%" };

  return (
    <div className="search-box">
      <FaSearch
        onClick={handleIconClick}
        tabIndex="0"
        className="search-box-icon"
        data-testid="search-box-icon"
        onKeyPress={handleIconKeyPress}
        onMouseDown={handleIconMouseDown}
      />
      <input
        type="text"
        ref={inputRef}
        style={inputStyle}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        onKeyPress={handleInputKeyPress}
        placeholder={placeholder}
      />
    </div>
  );
}

SearchBox.defaultProps = {
  placeholder: "Search...",
  isCollapsible: false
};

SearchBox.propTypes = {
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
  isCollapsible: PropTypes.bool
};
