// JobComponents.jsx
import React, { useEffect, useState } from "react";
import "./Movie.css";

const MovieComponents = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/movies"); 
        const data = await response.json();
        setMovies(data.myData || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
<div className="job-card-container">
  {loading ? (
    <p>Loading movies...</p>
  ) : (
    movies.map((movie) => (
      <div className="job-card" key={movie._id}>
        <h2>{movie.title}</h2>
        <p>{movie.year}</p>
        <img src={movie.image} alt={movie.title} />
        <p>{movie.description}</p>
        <a href={movie.wikipedia} target="_blank" rel="noopener noreferrer">
          {movie.title} on Wikipedia
        </a>
      </div>
    ))
  )}
</div>

  );
};

export default MovieComponents;

