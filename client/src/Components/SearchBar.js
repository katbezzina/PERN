import React from "react";
import "../Style/Home.css";

function Search({ handleChange }) {
  return (
    <form className="searchButton">
      <input
        type="search"
        placeholder="Search by title / date"
        onChange={handleChange}
        className="SearchBar"
      />
    </form>
  );
}

export default Search;
