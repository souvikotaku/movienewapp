import React from "react";
import "../styles/MovieDetailsCard.css";

const MovieDetailsCard = ({ movie }) => {
  //   const movieDetails = useSelector((state) => state.data.movieDetails);
  if (!movie) return <div>Select a movie to see details.</div>;

  return (
    <div className="movie-details-card">
      <h2>{movieDetails.title}</h2>
      <p>
        <strong>Genre:</strong> {movieDetails.genre}
      </p>
      <p>
        <strong>Language:</strong> {movieDetails.language}
      </p>
      <p>
        <strong>Country:</strong> {movieDetails.country}
      </p>
      <p>
        <strong>Description:</strong> {movieDetails.description}
      </p>
    </div>
  );
};

export default MovieDetailsCard;
