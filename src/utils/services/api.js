import axios from "axios";

const BASE_URL = "https://api.themoviedb.org";
const KEY = "82c211a0cb754dbef32a794b59444890";

const getTrendingMovies = async () => {
  try {
    const resp = await axios.get(`${BASE_URL}/3/trending/movie/day`, {
      params: {
        api_key: KEY,
      },
    });

    return await resp.data.results;
  } catch (err) {
    console.error(err.stack);
  }
};

const getMovieByQuery = async query => {
  try {
    const resp = await axios.get(`${BASE_URL}/3/search/movie`, {
      params: {
        api_key: KEY,
        query,
      },
    });

    return await resp.data.results;
  } catch (err) {
    console.error(err.stack);
  }
};

const Api = {
  getTrendingMovies,
  getMovieByQuery,
};

export default Api;
