import React from "react";
import SearchBox from "../components/SearchBox/SearchBox";

const handleSearch = searchQuery => {
  // TODO - the searching function should beware of empty strings
  alert(searchQuery);
};

const PostsView = () => {
  return (
    <div className="posts-view-container">
      <h1>Posts View</h1> <br />
      <SearchBox onSearch={handleSearch} />
    </div>
  );
};

export default PostsView;
