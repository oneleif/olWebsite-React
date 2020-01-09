import React from "react";

import SearchBox from "../components/SearchBox/SearchBox";

const handleSearch = searchQuery => {
  // TODO - the searching function should beware of empty strings
  alert(searchQuery);
};

const PostsView = () => {
  return (
    <div className="partners-view-container">
      <h1>Partners View</h1>
      <SearchBox onSearch={handleSearch} />
    </div>
  );
};

export default PostsView;
