import axios from "axios";

const CACHE_KEY = "moviesCache"; // Key for storing data in localStorage
const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Function to check if the cached data is still valid
const isCacheValid = (cacheTime) => {
  const currentTime = new Date().getTime();
  return currentTime - cacheTime < CACHE_EXPIRATION_TIME;
};

export const fetchMovies = async () => {
  try {
    // Try to get cached data from localStorage
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedTime = localStorage.getItem(`${CACHE_KEY}-time`);

    // If cache exists and is valid, use the cached data
    if (cachedData && cachedTime && isCacheValid(Number(cachedTime))) {
      console.log("Using cached data");
      return JSON.parse(cachedData);
    }

    // If no valid cache, fetch the data from GitHub
    const response = await axios.get(
      "https://raw.githubusercontent.com/souvikotaku/moviejsonnew/refs/heads/main/newmoviejson.json"
    );

    // Map over the movies and add an `id` field
    const movies = response.data.map((movie, index) => ({
      id: index + 1,
      ...movie,
    }));

    // Cache the fetched data in localStorage with the current time
    localStorage.setItem(CACHE_KEY, JSON.stringify(movies));
    localStorage.setItem(`${CACHE_KEY}-time`, new Date().getTime().toString());

    return movies;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};
