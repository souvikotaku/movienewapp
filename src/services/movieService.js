import axios from "axios";

export const fetchMovies = async () => {
  try {
    const response = await axios.get(
      "https://raw.githubusercontent.com/souvikotaku/moviejsonnew/refs/heads/main/newmoviejson.json"
    );

    // Map over the movies and add an `id` field
    const movies = response.data.map((movie, index) => ({
      id: index + 1,
      ...movie,
    }));

    return movies;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};
