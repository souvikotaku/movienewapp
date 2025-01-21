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
    <div
      style={{
        // backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/021/835/517/large_2x/colorful-pink-pastel-unicorn-girly-watercolor-on-paper-texture-art-paint-blots-background-fantasy-smooth-light-pink-watercolor-bokeh-paper-texture-beautiful-grunge-with-dots-space-for-text-photo.jpg')`, // Reference the public folder image
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        // backgroundAttachment: "fixed", // Keep the background static
        // minHeight: "100vh",
        // color: "white", // Adjust text color for contrast

        background: "white",
      }}
    >
      {/* <h1
        style={{
          marginTop: "0px",
        }}
      >
        Movie Dashboard
      </h1> */}
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;
