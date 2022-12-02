import React, { ChangeEvent } from "react";
import "../Style/Home.css";

export type HandleChange = {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}

function Search({ handleChange}: HandleChange) {
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
