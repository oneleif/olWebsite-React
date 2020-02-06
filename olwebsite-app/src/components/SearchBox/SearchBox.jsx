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

  function SubmitSearch(searchQuery) {
    const query = searchQuery.trim();

    if (query !== "") {
      onSearch(query);
    }
  }

  function handleIconFocus() {
    if (isCollapsible) {
      setIsCollapsed(false);
    }
    inputRef.current.focus();
  }

  /**
   * MouseDown is used instead of click because of
   * the order in which the events are called. The value of
   * isExpanded is needed *before* the focus event is triggered.
   */
  function handleIconMouseDown() {
    if (!isCollapsed) {
      SubmitSearch(inputRef.current.value);
    }
  }

  function handleInputBlur() {
    if (isCollapsible) {
      setIsCollapsed(true);
    }
  }

  function handleInputKeyPress({ key, target }) {
    if (key === "Enter") {
      SubmitSearch(target.value);
    }
  }

  /************************************
   * Render
   ************************************/

  const inputStyle = { width: isCollapsed ? "0" : "100%" };

  return (
    <div className="search-box">
      <FaSearch
        tabIndex="0"
        onFocus={handleIconFocus}
        className="search-box-icon"
        data-testid="search-box-icon"
        onMouseDown={handleIconMouseDown}
      />
      <input
        type="text"
        ref={inputRef}
        style={inputStyle}
        onBlur={handleInputBlur}
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
