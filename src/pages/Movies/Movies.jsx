import { Link, useSearchParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useMovies from "../../utils/hooks/useMovies";
import useLoader from "../../utils/hooks/useLoader";
import Loader from "../../components/Loader/Loader";
import Api from "../../utils/services/api";
import scss from "./Movies.module.scss";
import scssFromHome from "../Home/Home.module.scss";

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
        <input type="text" className={scss.searchQuery} name="query" required />
        <button type="submit" className={scss.searchBtn}>
          Search
        </button>
      </form>
      {movies.length > 0 && (
        <ul className={scssFromHome.moviesList}>
          {movies.map(({ id, title }) => (
            <li className={scssFromHome.moviesItem} key={id}>
              <Link
                to={`${id}`}
                state={{ from: location }}
                className={scssFromHome.moviesTitle}
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
