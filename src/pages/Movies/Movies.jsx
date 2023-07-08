import { Link, useSearchParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useMovies from "../../utils/hooks/useMovies";
import useLoader from "../../utils/hooks/useLoader";
import Loader from "../../components/Loader/Loader";
import Api from "../../utils/services/api";
import scss from "./Movies.module.scss";

const Movies = () => {
  const [movies, setMovies] = useMovies();
  const [isLoading, setIsLoading] = useLoader();
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
        console.error(err.stack);
        toast.error("Ups, something went wrong 🙁");
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
      console.error(err.stack);
      toast.error("Ups, something went wrong 🙁");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className={scss.searchForm} onSubmit={handleSubmit}>
        <input className={scss.searchQuery} type="text" name="query" required />
        <button className={scss.searchBtn} type="submit">
          Search
        </button>
      </form>
      {movies.length > 0 && (
        <ul className={scss.moviesList}>
          {movies.map(({ id, title }) => (
            <li className={scss.moviesItem} key={id}>
              <Link
                to={`${id}`}
                state={{ from: location }}
                className={scss.moviesTitle}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Loader isLoading={isLoading} />
    </>
  );
};

export default Movies;
