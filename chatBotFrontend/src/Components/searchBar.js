import React from 'react';
import './searchBar.css';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <button className="add-sources-btn">Add Sources</button>
      <input
        className="search-input"
        type="text"
        placeholder="Search..."
      />
      <button className="search-btn">➤</button>
    </div>
  );
};

export default SearchBar;
