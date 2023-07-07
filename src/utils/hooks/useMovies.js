import { useState } from "react";

const useMovies = (initialState = []) => {
  const [movies, setMovies] = useState(initialState);
  return [movies, setMovies];
};

export default useMovies;
