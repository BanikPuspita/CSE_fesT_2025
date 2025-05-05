import React from "react";
import MovieComponents from "./MovieComponents";
import "./Movie.css";

const Movie = () => {
  return (
    <div className="movie-wrapper">
      <h1 className="movie-title">Available Movies for Habul</h1>
      <MovieComponents />
    </div>
  );
};

export default Movie;