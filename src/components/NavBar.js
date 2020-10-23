import React from "react";
import { useApp } from "../stateManager/context";
import SearchBar from "./SearchBar";
import logo from "../img/logo-marceau.svg";
import dice from "../img/dice.svg";

const NavBar = () => {
  const { actions } = useApp();
  const { getMovieDetails, updateField } = actions;

  return (
    <div className="navBarWrapper">
      <div className="navBarContent">
        <img src={logo} alt="Logo Marceau" className="logo" />
        <div className="randomOrSearch">
          <div
            className="dice"
            onClick={() =>
              getMovieDetails("randomId") & updateField("searchBarFocus", false)
            }
          >
            <img src={dice} alt="Random movie" />
          </div>
          <div className="desktopSearch">
            <SearchBar></SearchBar>
          </div>
          <div
            className="mobileSearch"
            onClick={() => updateField("setMobileSearch", true)}
          >
            Icon
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
