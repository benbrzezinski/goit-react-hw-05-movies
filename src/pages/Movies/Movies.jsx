import { Link } from "react-router-dom";
import useMovies from "../../utils/hooks/useMovies";
import Api from "../../utils/services/api";
import scss from "./Movies.module.scss";
import scssFromHome from "../Home/Home.module.scss";

const Movies = () => {
  const [movies, setMovies] = useMovies();

  const handleSubmit = async e => {
    try {
      e.preventDefault();

      const form = e.currentTarget;
      const query = form.elements.query.value;

      const movies = await Api.getMovieByQuery(query.toLowerCase().trim());
      setMovies(movies);

      form.reset();
    } catch (err) {
      console.error(err.stack);
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
              <Link to={`${id}`} className={scssFromHome.moviesTitle}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Movies;
