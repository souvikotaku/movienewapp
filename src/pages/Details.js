import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import OscarStatistics from "../components/OscarStatistics";
import LanguageInsights from "../components/LanguageInsights"; // Import LanguageInsights
import { useSelector } from "react-redux";

const Details = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const movieDetails = useSelector((state) => state.data.movieDetails);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setLoading(true);
        const data = movieDetails; // Fetch movie details from the service
        setMovie(data);
      } catch (err) {
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [id]);

  // Helper function to count the languages
  const countLanguages = (languages) => {
    const languageCounts = {};
    languages.forEach((lang) => {
      languageCounts[lang] = (languageCounts[lang] || 0) + 1;
    });
    return languageCounts;
  };

  // Count the languages
  const languageCounts = countLanguages(movieDetails.language);

  // Prepare the data for LanguageInsights component
  const languageData = {
    languages: Object.keys(languageCounts),
    counts: Object.values(languageCounts),
  };

  if (loading) {
    return (
      <div>
        <Header />
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <p>{error}</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div>
        <Header />
        <p>Movie not found.</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="movie-details">
        <h1>{movieDetails.title}</h1>
        <p>
          <strong>Genre:</strong> {movieDetails.genre.join(", ")}
        </p>
        <p>
          <strong>Year:</strong> {movieDetails.year}
        </p>
        <p>
          <strong>Language:</strong> {movieDetails.language.join(", ")}
        </p>
        <p>
          <strong>Country:</strong> {movieDetails.country.join(", ")}
        </p>
        <p>
          <strong>Description:</strong> {movieDetails.description}
        </p>
        <p>
          <strong>Nominations:</strong> {movieDetails.oscar_nominations}
        </p>
        <div>
          <OscarStatistics data={movieDetails} />
        </div>
        <div>
          {/* Pass language data to the LanguageInsights component */}
          <LanguageInsights data={languageData} />
        </div>
        <p>
          <strong>Wins:</strong> {movieDetails.oscar_winning}
        </p>
      </div>
    </div>
  );
};

export default Details;
