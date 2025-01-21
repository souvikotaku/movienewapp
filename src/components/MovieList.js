import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/MovieList.css";
import { setmovieDetails } from "../redux/dataSlice.js";
import { useDispatch } from "react-redux";
import OscarStatistics from "./OscarStatistics";
import LanguageInsights from "./LanguageInsights";

const MovieList = ({ movies }) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const dispatch = useDispatch();

  // Filter movies based on the debounced query and remove duplicates
  const filteredMovies = movies
    .filter((movie) =>
      movie.title.toLowerCase().includes(debouncedQuery.toLowerCase())
    )
    .filter((movie, index, self) => {
      // Ensure each movie title appears only once
      return index === self.findIndex((m) => m.title === movie.title);
    });

  const countLanguages = (languages) => {
    const languageCounts = {};
    languages.forEach((lang) => {
      languageCounts[lang] = (languageCounts[lang] || 0) + 1;
    });
    return languageCounts;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // Wait 500ms after the user stops typing

    return () => clearTimeout(timer); // Cleanup previous timeout if the user types again
  }, [query]); // Effect runs when `query` changes

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="movie-list">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for a movie"
      />
      <ul>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => {
            const languageCounts = countLanguages(movie.language);

            // Prepare the data for LanguageInsights component
            const languageData = {
              languages: Object.keys(languageCounts),
              counts: Object.values(languageCounts),
            };

            return (
              <li key={movie.id}>
                <div className="movie-title">
                  <Link
                    to={`/details/${movie.id}`}
                    onClick={() => {
                      dispatch(setmovieDetails(movie));
                    }}
                  >
                    {movie.title}
                  </Link>
                </div>
                <div className="movie-release">{movie.year}</div>
                <div className="movie-charts">
                  <div className="oscar-statistics-card">
                    <OscarStatistics data={movie} />
                  </div>
                  <LanguageInsights data={languageData} />
                </div>
              </li>
            );
          })
        ) : (
          <p>No movies found for "{debouncedQuery}"</p>
        )}
      </ul>
    </div>
  );
};

export default MovieList;
