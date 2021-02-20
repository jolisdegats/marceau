import React, { useEffect } from "react";
import { useApp } from "../stateManager/context";

const MoviesList = () => {
  const { state, actions } = useApp();
  const { searchBar, searchBarFocus, moviesList } = state;
  const { fetchMovies, getMovieDetails, updateField } = actions;

  useEffect(() => {
    fetchMovies("top_rated");
    // eslint-disable-next-line
  }, [searchBar]);

  useEffect(() => {
    getMovieDetails(141);
    // eslint-disable-next-line
  }, []);

  return (
    searchBarFocus && (
      <div
        className="moviesListWrapper"
        onClick={() =>
          searchBarFocus && updateField("searchBarFocus", !searchBarFocus)
        }
      >
        <div className="moviesListContainer">
          {moviesList.length === 0 ? (
            <p>Aucun résultat pour cette recherche</p>
          ) : (
            moviesList.map((movie) => {
              const { id, title, original_title } = movie;
              return (
                <p
                  onClick={() =>
                    getMovieDetails(id) &
                    updateField(`searchBarFocus`, false) &
                    updateField("setMobileSearch", false)
                  }
                  key={id}
                >
                  {title}
                  {original_title !== title && ` (${original_title})`}
                </p>
              );
            })
          )}
        </div>
      </div>
    )
  );
};

export default MoviesList;
