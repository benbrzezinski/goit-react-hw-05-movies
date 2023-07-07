import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useMovies from "../../utils/hooks/useMovies";
import useLoader from "../../utils/hooks/useLoader";
import Loader from "../../components/Loader/Loader";
import Api from "../../utils/services/api";
import scss from "./Home.module.scss";

const Home = () => {
  const [movies, setMovies] = useMovies();
  const [isLoading, setIsLoading] = useLoader();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const movies = await Api.getTrendingMovies();
        setMovies(movies);
      } catch (err) {
        console.error(err.stack);
        toast.error("Ups, something went wrong 🙁");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [setMovies, setIsLoading]);

  return (
    <section>
      <h1 className={scss.title}>Trending today</h1>
      <ul className={scss.moviesList}>
        {movies.map(({ id, title }) => (
          <li className={scss.moviesItem} key={id}>
            <Link
              to={`movies/${id}`}
              state={{ from: location }}
              className={scss.moviesTitle}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
      <Loader isLoading={isLoading} />
    </section>
  );
};

export default Home;
