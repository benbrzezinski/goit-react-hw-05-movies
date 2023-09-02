import { Link, useSearchParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import useMovies from "../../utils/hooks/useMovies";
import useLoader from "../../utils/hooks/useLoader";
import useToggleMovieCard from "../../utils/hooks/useToggleMovieCard";
import Loader from "../../components/Loader/Loader";
import Api from "../../utils/services/api";
import scss from "./Movies.module.scss";

const Movies = () => {
  const [movies, setMovies] = useMovies();
  const [isLoading, setIsLoading] = useLoader();
  const { hoveredMovie, showCard, hideCard } = useToggleMovieCard();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("query") ?? "";
  const location = useLocation();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const moviesApi = await Api.getMovieByQuery(queryParam);
        setMovies(moviesApi);
      } catch (err) {
        console.error(err.message);
        toast.error("Oops, something went wrong");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [setIsLoading, queryParam, setMovies]);

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const form = e.currentTarget;
      const query = form.elements.query.value;

      const moviesApi = await Api.getMovieByQuery(query.toLowerCase().trim());

      if (!moviesApi.length) {
        setSearchParams({});
        setMovies([]);
        form.reset();
        return toast.error("No movies found 🎥");
      }

      setSearchParams({ query: query.toLowerCase().trim() });
      setMovies(moviesApi);
      form.reset();
    } catch (err) {
      console.error(err.message);
      toast.error("Oops, something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Movies - Search</title>
      </Helmet>
      <section>
        <h1 className={scss.title}>Search for movies</h1>
        <form className={scss.searchForm} onSubmit={handleSubmit}>
          <input
            className={scss.searchQuery}
            type="text"
            name="query"
            required
          />
          <button className={scss.searchBtn} type="submit">
            Search
          </button>
        </form>
        {movies.length > 0 && (
          <ul className={scss.moviesList}>
            {movies.map(({ id, poster_path, tagline, title, vote_average }) => (
              <li
                className={scss.moviesItem}
                key={id}
                onMouseEnter={() => showCard(id)}
                onMouseLeave={hideCard}
              >
                <Link
                  to={`${id}`}
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
        )}
      </section>
      <Loader isLoading={isLoading} />
    </>
  );
};

export default Movies;
