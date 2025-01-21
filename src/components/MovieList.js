import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/MovieList.css";
import { setmovieDetails } from "../redux/dataSlice.js";
import { useDispatch } from "react-redux";
import OscarStatistics from "./OscarStatistics";
import LanguageInsights from "./LanguageInsights";
import Leaderboard from "./Leaderboard";

// New MovieDescription Component
const MovieDescription = ({ description }) => (
  <div
    className="movie-description"
    style={{ color: "white", marginBottom: "20px" }}
  >
    <h3>Description:</h3>
    <p>{description}</p>
  </div>
);

const countLanguages = (languages) => {
  const languageCounts = {};
  languages.forEach((lang) => {
    languageCounts[lang] = (languageCounts[lang] || 0) + 1;
  });
  return languageCounts;
};

const MovieList = ({ movies }) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const dispatch = useDispatch();

  const filteredMovies = movies
    .filter((movie) =>
      movie.title.toLowerCase().includes(debouncedQuery.toLowerCase())
    )
    .filter((movie, index, self) => {
      return index === self.findIndex((m) => m.title === movie.title);
    });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div
      className="movie-list-container"
      style={{
        backgroundImage: `url('/images/background.jpg')`, // Reference the public folder image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // Keep the background static
        // minHeight: "100vh",
      }}
    >
      <div className="header">
        <h1>Movie Dashboard</h1>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for a movie"
        />
      </div>
      <ul className="movie-list">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => {
            const languageCounts = countLanguages(movie.language);

            // Prepare the data for LanguageInsights component
            const languageData = {
              languages: Object.keys(languageCounts),
              counts: Object.values(languageCounts),
            };

            return (
              <li key={movie.id} className="listli">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="background-image"
                />
                <div className="movie-charts">
                  <div className="oscar-statistics-card">
                    <div className="movie-title">{movie.title}</div>
                    <div className="movie-release">{movie.year}</div>
                    <MovieDescription description={movie.description} />
                  </div>
                  <div style={{ display: "flex" }}>
                    <OscarStatistics data={movie} />
                    <LanguageInsights data={languageData} />
                    <Leaderboard cast={movie.cast} />
                  </div>
                </div>
              </li>
            );
          })
        ) : (
          <p
            style={{
              textAlign: "center",
              fontSize: "50px",
            }}
          >
            No movies found for "{debouncedQuery}"
          </p>
        )}
      </ul>
    </div>
  );
};

export default MovieList;
