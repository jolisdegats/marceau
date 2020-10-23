import React from "react";
import { useApp } from "./stateManager/context";

import MovieDetails from "./components/MovieDetails";
import MoviesList from "./components/MoviesList";
import NavBar from "./components/NavBar";
import MobileSearch from "./components/MobileSearch";

function App() {
  const { state, actions } = useApp();
  const { updateField } = actions;
  const { searchBarFocus, setMobileSearch } = state;

  return (
    <div className="App">
      {setMobileSearch && <MobileSearch></MobileSearch>}
      <div
        className="fadingTopBar"
        onClick={() =>
          searchBarFocus && updateField("searchBarFocus", !searchBarFocus)
        }
      ></div>
      <MoviesList></MoviesList>
      <NavBar></NavBar>
      <MovieDetails></MovieDetails>
    </div>
  );
}

export default App;
