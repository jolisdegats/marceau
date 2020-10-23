import React from "react";
import { useApp } from "../stateManager/context";
import Loader from "./Loader";

import posterNotFound from "../img/posterNotFound.png";
import backdropNotFound from "../img/backdropNotFound.jpg";

const MovieDetails = () => {
  const { state } = useApp();
  const { loading, movieSelected } = state;
  const {
    title,
    original_title,
    backdrop_path,
    overview,
    poster_path,
    vote_average,
    vote_count,
    tagline,
    release_date,
    production_companies,
    genres,
  } = movieSelected;
  const backgroundImg =
    Object.entries(movieSelected).length > 0
      ? backdrop_path
        ? `url(https://image.tmdb.org/t/p/original${backdrop_path})`
        : `url(${backdropNotFound})`
      : "";
  const posterImg =
    Object.entries(movieSelected).length > 0
      ? poster_path
        ? `https://image.tmdb.org/t/p/original${poster_path}`
        : posterNotFound
      : "";

  let votePercent;
  let deg;
  vote_average > 0 && (votePercent = vote_average * 10);
  deg = (360 * votePercent) / 100;

  return loading ? (
    <Loader></Loader>
  ) : (
    Object.entries(movieSelected).length > 0 && (
      <div className="movieDetailsWrapper">
        <div className="movieDetailsContent">
          <div className="movieDetails">
            {vote_average > 0 && (
              <div
                className={
                  vote_average > 5
                    ? "progress-pie-chart gt-50"
                    : "progress-pie-chart"
                }
                data-percent={votePercent}
              >
                <div className="ppc-progress">
                  <div
                    className="ppc-progress-fill"
                    style={{ transform: `rotate(${deg}deg)` }}
                  ></div>
                </div>
                <div className="ppc-percents">
                  <div className="pcc-percents-wrapper">
                    <p>
                      <span className="voteAverage">{vote_average}</span>
                      <span className="ten">/10</span>
                    </p>
                    <p className="totalVotes">{vote_count} votes</p>
                  </div>
                </div>
              </div>
            )}

            <h2>{title}</h2>
            {title !== original_title && (
              <p className="originalTitle">{original_title}</p>
            )}
            <p className="tagline">{tagline}</p>
            <p className="genres">
              {genres.map((genre) => {
                const { id, name } = genre;
                return <span key={id}>{name}</span>;
              })}
            </p>
          </div>
        </div>
        <div
          className="backgroundImage"
          style={{ backgroundImage: backgroundImg }}
        ></div>
        <div className="movieAdditionalInfosBlock">
          <div className="movieAdditionalInfos">
            <img
              src={posterImg}
              alt={`poster_${title}`}
              className="posterImage"
            />

            <div>
              {overview && (
                <>
                  <h2>Synopsis</h2>
                  <p>{overview}</p>
                  <br />
                </>
              )}
              {release_date && (
                <>
                  <h2>Released on</h2>
                  <p>{release_date}</p>
                  <br />
                </>
              )}
              {production_companies.length > 0 && (
                <>
                  <h2>Produced by</h2>
                  {production_companies.map((prodComp) => {
                    const { id, name } = prodComp;
                    return <p key={id}>{name}</p>;
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default MovieDetails;
