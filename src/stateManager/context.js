import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";

// API URL TO FETCH MOVIES
const apiUrl = "https://api.themoviedb.org/3/";
const apiKey = "api_key=7a6eb7ec02983ce9b69d2791d7747eea";
const queryParams = "&page=1&include_adult=false";

// ACTIONS
export const useActions = (state, dispatch) => ({
  fetchMovies: (data) => {
    dispatch({ type: types.SET_LOADING });
    dispatch({ type: types.FETCH_MOVIES, payload: data });
  },
  updateField: (key, value) => {
    dispatch({ type: types.SET_LOADING });
    dispatch({ type: types.UPDATE_FIELD, payload: { key: key, value: value } });
  },
  getMovieDetails: (data) => {
    dispatch({ type: types.SET_LOADING });
    dispatch({
      type: types.GET_MOVIE_DETAILS,
      payload: data,
    });
  },
});

// ACTIONS TYPES AND VARS
const toalMoviesNumber = 100000;
const moviesList = "moviesList";
const movieSelected = "movieSelected";
const error = "error";
const types = {
  UPDATE_FIELD: "UPDATE_FIELD",
  FETCH_MOVIES: "FETCH_MOVIES",
  FETCH_MOVIES_SUCCESS: "FETCH_MOVIES_SUCCESS",
  FETCH_MOVIES_FAIL: "FETCH_MOVIES_FAIL",
  SET_LOADING: "SET_LOADING",
  GET_MOVIE_DETAILS: "GET_MOVIE_DETAILS",
};

// STATE INITIALISATION
export const initialState = {
  loading: true,
  searchBar: "",
  [movieSelected]: {},
  [moviesList]: [],
  [error]: "",
  searchBarFocus: false,
  setMobileSearch: false,
};

// REDUCER
export const appReducer = (state, action) => {
  switch (action.type) {
    case types.UPDATE_FIELD: {
      const { key, value } = action.payload;
      return {
        ...state,
        [key]: value,
        loading: false,
      };
    }
    case types.SET_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    default:
      throw new Error(`Unhandled action type : ${action.type}`);
  }
};

// MIDDLEWARE FOR FETCH MOVIES ASYNC FUNCTION
export const applyMiddleware = (state, dispatch) => (action) => {
  let urlToQuery = "";

  switch (action.type) {
    case types.FETCH_MOVIES:
      const { searchBar } = state;
      urlToQuery =
        apiUrl +
        (searchBar !== ""
          ? `search/movie?query=${searchBar}&`
          : `movie/${action.payload}?`) +
        apiKey +
        queryParams;
      return axios
        .get(urlToQuery)
        .then((res) =>
          dispatch({
            type: types.UPDATE_FIELD,
            payload: { key: moviesList, value: res.data.results },
          })
        )
        .catch((err) =>
          dispatch({
            type: types.UPDATE_FIELD,
            payload: { key: error, value: err.response.data },
          })
        );

    case types.GET_MOVIE_DETAILS:
      let movieId =
        action.payload === "randomId"
          ? Math.floor(Math.random() * toalMoviesNumber) + 1
          : action.payload;

      const getMovie = (id) => {
        const instance = axios.create({
          baseURL: `${apiUrl}movie/${id}?${apiKey}${queryParams}&append_to_response=videos,images`,
        });

        instance.interceptors.response.use(
          (response) => {
            return response.data.adult === true
              ? getMovie(Math.floor(Math.random() * toalMoviesNumber) + 1)
              : response;
          },
          (error) => {
            const {
              response: { status },
            } = error;
            // Refresh console to avoid 404 alerts
            console.clear();
            if (status === 404) {
              getMovie(Math.floor(Math.random() * toalMoviesNumber) + 1);
              throw new axios.Cancel("Operation canceled by the user.");
            } else {
              return Promise.reject(error);
            }
          }
        );

        instance
          .get(urlToQuery)
          .then((res) =>
            dispatch({
              type: types.UPDATE_FIELD,
              payload: { key: movieSelected, value: res.data },
            })
          )
          .catch((err) =>
            dispatch({
              type: types.UPDATE_FIELD,
              payload: {
                key: error,
                value: err,
              },
            })
          );
      };
      return getMovie(movieId);

    default:
      dispatch(action);
  }
};

export const AppStateContext = createContext();
export const AppActionsContext = createContext();

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const actions = useActions(state, applyMiddleware(state, dispatch));
  return (
    <AppStateContext.Provider value={state}>
      <AppActionsContext.Provider value={actions}>
        {children}
      </AppActionsContext.Provider>
    </AppStateContext.Provider>
  );
};
export default StoreProvider;

export const useApp = () => {
  return {
    state: useContext(AppStateContext),
    actions: useContext(AppActionsContext),
  };
};
