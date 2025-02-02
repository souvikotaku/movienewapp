import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/MovieList.css";
import { setmovieDetails } from "../redux/dataSlice.js";
import { useDispatch } from "react-redux";
import OscarStatistics from "./OscarStatistics";
import LanguageInsights from "./LanguageInsights";
import Leaderboard from "./Leaderboard";
import { FiFilter } from "react-icons/fi"; // Import the filter icon

const MovieDescription = ({ description, country, genre, imdbRating }) => (
  <div
    className="movie-description"
    style={{ color: "white", marginBottom: "20px" }}
  >
    <h3
      style={{
        color: "lightgreen",
      }}
    >
      Description:
    </h3>
    <p>{description}</p>
    <div style={{ marginTop: "10px" }}>
      <p>
        <strong
          style={{
            color: "lightgreen",
          }}
        >
          Country:
        </strong>{" "}
        {country?.join(", ") || "N/A"}
      </p>
      <p>
        <strong
          style={{
            color: "lightgreen",
          }}
        >
          Genre:
        </strong>{" "}
        {genre?.join(", ") || "N/A"}
      </p>
      <p>
        <strong
          style={{
            color: "lightgreen",
          }}
        >
          IMDB Rating:
        </strong>{" "}
        {imdbRating || "N/A"}
      </p>
    </div>
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
  const [showFilters, setShowFilters] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    oscarStatistics: true,
    languageInsights: true,
    cast: true,
  });
  const [filterPosition, setFilterPosition] = useState({ top: 0, left: 0 });
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const filterButtonRef = useRef(null);
  const popupRef = useRef(null);

  const years = Array.from(new Set(movies.map((movie) => movie.year)));
  const genres = Array.from(
    new Set(movies.flatMap((movie) => movie.genre || []))
  );

  const filteredMovies = movies
    .filter((movie) =>
      movie.title.toLowerCase().includes(debouncedQuery.toLowerCase())
    )
    .filter((movie) =>
      selectedYear ? movie.year.toString() === selectedYear : true
    )
    .filter((movie) =>
      selectedGenre ? movie.genre?.includes(selectedGenre) : true
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

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    setFilterOptions((prev) => ({ ...prev, [name]: checked }));
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const toggleFilter = (event) => {
    event.stopPropagation();
    if (!showFilters && filterButtonRef.current) {
      const buttonRect = filterButtonRef.current.getBoundingClientRect();
      setFilterPosition({
        top: buttonRect.bottom + window.scrollY + 10,
        left: buttonRect.left + window.scrollX,
      });
    }
    setShowFilters((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        !filterButtonRef.current.contains(event.target)
      ) {
        setShowFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="movie-list-container"
      style={{
        backgroundImage: `url('/images/background.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="header">
        <h1>Movie Dashboard</h1>
        <div
          className="search-filter-container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
            className="inputdivnow"
          >
            <button
              // ref={filterButtonRef}
              // onClick={toggleFilter}
              className="filter-button firstinputbutton"
              title="Filter"
              style={{
                pointerEvents: "none",
                visibility: "hidden",
              }}
            >
              <FiFilter size={24} className="filter-icon" />
            </button>
            <input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Search for a movie"
              style={{ padding: "10px", width: "300px", borderRadius: "5px" }}
            />
            <button
              ref={filterButtonRef}
              onClick={toggleFilter}
              className="filter-button"
              title="Filter"
              style={{
                padding: "10px",
                cursor: "pointer",
                backgroundColor: "transparent",
                border: "none",
                borderRadius: "5px",
                marginTop: "10px",
              }}
            >
              <FiFilter size={24} className="filter-icon" />
            </button>
          </div>
          <div
            style={{
              paddingTop: "5px",
              paddingBottom: "5px",
              fontStyle: "italic",
            }}
          >
            {selectedYear === "" && selectedGenre === ""
              ? "Showing all results"
              : selectedYear === "" && selectedGenre !== ""
              ? `Showing results for ${selectedGenre} genre`
              : selectedYear !== "" && selectedGenre === ""
              ? `Showing results for year ${selectedYear}`
              : `Showing results for year ${selectedYear} and ${selectedGenre} genre`}
          </div>
        </div>
      </div>

      {showFilters && (
        <div
          className="filter-popup"
          ref={popupRef}
          style={{
            position: "absolute",
            top: `${filterPosition.top}px`,
            left: `${filterPosition.left}px`,
            backgroundColor: "#f9f9f9",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
            width: "250px",
          }}
        >
          <h3 style={{ color: "black", marginBottom: "10px" }}>
            Filter Options
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <label style={labelStyles}>
              Year:
              <select value={selectedYear} onChange={handleYearChange}>
                <option value="">All</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </label>
            <label style={labelStyles}>
              Genre:
              <select value={selectedGenre} onChange={handleGenreChange}>
                <option value="">All</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      )}

      <ul className="movie-list">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => {
            const languageCounts = countLanguages(movie.language);
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
                    <MovieDescription
                      description={movie.description}
                      country={movie.country}
                      genre={movie.genre}
                      imdbRating={movie.imdb_rating}
                    />
                  </div>
                  <div style={{ display: "flex" }} className="othercardsdiv">
                    {filterOptions.oscarStatistics && (
                      <OscarStatistics data={movie} />
                    )}
                    {filterOptions.languageInsights && (
                      <LanguageInsights data={languageData} />
                    )}
                    {filterOptions.cast && <Leaderboard cast={movie.cast} />}
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
            No movies found
          </p>
        )}
      </ul>
    </div>
  );
};

const labelStyles = {
  color: "black",
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

export default MovieList;
