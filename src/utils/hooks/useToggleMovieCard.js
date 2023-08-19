import { useState } from "react";

const useToggleMovieCard = () => {
  const [hoveredMovie, setHoveredMovie] = useState(null);

  const showCard = id => {
    setHoveredMovie(id);
  };

  const hideCard = () => {
    setHoveredMovie(null);
  };

  return {
    hoveredMovie,
    showCard,
    hideCard,
  };
};

export default useToggleMovieCard;
