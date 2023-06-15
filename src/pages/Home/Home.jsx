import { Link } from "react-router-dom";
import { useEffect } from "react";
import useMovies from "../../utils/hooks/useMovies";
import Api from "../../utils/services/api";
import scss from "./Home.module.scss";

const Home = () => {
  const [movies, setMovies] = useMovies();

  useEffect(() => {
    (async () => {
      try {
        const movies = await Api.getTrendingMovies();
        setMovies(movies);
      } catch (err) {
        console.error(err.stack);
      }
    })();
  }, []);

  return (
    <>
      <h1 className={scss.title}>Trending today</h1>
      <ul className={scss.moviesList}>
        {movies.map(({ id, title }) => (
          <li className={scss.moviesItem} key={id}>
            <Link to={`movies/${id}`} className={scss.moviesTitle}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
