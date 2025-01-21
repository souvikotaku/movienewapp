import React, { useState, useEffect } from "react";
import MovieList from "../components/MovieList";
import { fetchMovies } from "../services/movieService";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Movie Dashboard</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;
