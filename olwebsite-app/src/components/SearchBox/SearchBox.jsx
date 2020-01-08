import React, {useState} from "react";
import PropTypes from "prop-types";
import { FaSearch } from "react-icons/fa";

const SearchBox = ({ onSearch, placeholder }) => {
  
  // If we decide to search on change, raise the state
  const [searchQuery, setSearchQuery] = useState("");

  const handleKeyPress = key => {
      if(key === "Enter") {
          onSearch(searchQuery);
      }
  }

  /************************************
   * Render
   ************************************/

  return (
    <div className="search-box">
      <div className="search-box-input-wrapper">
        <FaSearch 
          className="search-box-icon" 
          onClick={() => onSearch(searchQuery)}
        />
        <input
          id="search"
          type="search"
          name="search-box"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onKeyPress={e => handleKeyPress(e.key)}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

SearchBox.defaultProps = {
  placeholder: ''
};

SearchBox.propTypes = {
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

export default SearchBox;
