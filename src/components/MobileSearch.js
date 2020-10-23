import React from "react";
import { useApp } from "../stateManager/context";
import SearchBar from "./SearchBar";
import MoviesList from "./MoviesList";

const MobileSearch = () => {
  const { actions } = useApp();
  const { updateField } = actions;
  return (
    <div className="mobileSearchWrapper">
      <div
        className="closeButton"
        onClick={() =>
          updateField("setMobileSearch", false) &
          updateField(`searchBarFocus`, false)
        }
      >
        X
      </div>
      <SearchBar></SearchBar>
      <MoviesList></MoviesList>
    </div>
  );
};

export default MobileSearch;
