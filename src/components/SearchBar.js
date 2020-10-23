import React from "react";
import { useApp } from "../stateManager/context";

const SearchBar = () => {
  const { state, actions } = useApp();
  const { updateField } = actions;
  const { searchBarFocus } = state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    return updateField(name, value);
  };

  return (
    <div className="searchBar">
      <input
        name="searchBar"
        placeholder="Search your movie here"
        onChange={handleChange}
        onClick={() => updateField(`searchBarFocus`, !searchBarFocus)}
      ></input>
    </div>
  );
};

export default SearchBar;
