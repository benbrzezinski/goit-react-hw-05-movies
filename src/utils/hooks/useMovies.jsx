import { useState } from "react";

const useMovies = () => {
  const [movies, setMovies] = useState([]);
  return [movies, setMovies];
};

export default useMovies;
