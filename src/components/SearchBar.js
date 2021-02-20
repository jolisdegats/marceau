import React from "react";
import { useApp } from "../stateManager/context";

const SearchBar = () => {
  const { actions } = useApp();
  const { updateField } = actions;

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
        onClick={() => updateField(`searchBarFocus`, true)}
      ></input>
    </div>
  );
};

export default SearchBar;
