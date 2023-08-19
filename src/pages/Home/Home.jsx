import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import useMovies from "../../utils/hooks/useMovies";
import useLoader from "../../utils/hooks/useLoader";
import useToggleMovieCard from "../../utils/hooks/useToggleMovieCard";
import Loader from "../../components/Loader/Loader";
import Api from "../../utils/services/api";
import scss from "./Home.module.scss";

const Home = () => {
  const [movies, setMovies] = useMovies();
  const [isLoading, setIsLoading] = useLoader();
  const { hoveredMovie, showCard, hideCard } = useToggleMovieCard();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const movies = await Api.getTrendingMovies();
        setMovies(movies);
      } catch (err) {
        console.error(err.message);
        toast.error("Oops, something went wrong");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [setMovies, setIsLoading]);

  return (
    <>
      <Helmet>
        <title>Movies</title>
      </Helmet>
      <section>
        <h1 className={scss.title}>Trending today</h1>
        <ul className={scss.moviesList}>
          {movies.map(({ id, poster_path, tagline, title, vote_average }) => (
            <li
              className={scss.moviesItem}
              key={id}
              onMouseEnter={() => showCard(id)}
              onMouseLeave={hideCard}
            >
              <Link
                to={`movies/${id}`}
                state={{ from: location }}
                className={scss.moviesLink}
              >
                {poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/original${poster_path}`}
                    alt={tagline ? tagline : "Movie photo"}
                    className={scss.moviesImg}
                    loading="lazy"
                  />
                ) : (
                  <p className={scss.noPhoto}>No&nbsp;photo</p>
                )}
                {hoveredMovie === id && (
                  <div className={scss.movieInfo}>
                    <p className={scss.movieTitle}>{title}</p>
                    <p className={scss.movieRating}>
                      {vote_average.toFixed(1)} &#9733;
                    </p>
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
        <Loader isLoading={isLoading} />
      </section>
    </>
  );
};

export default Home;
