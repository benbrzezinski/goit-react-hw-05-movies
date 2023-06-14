import scss from "./Movies.module.scss";

const Movies = () => (
  <form className={scss.searchForm}>
    <input type="text" className={scss.searchQuery} required />
    <button type="submit" className={scss.searchBtn}>
      Search
    </button>
  </form>
);

export default Movies;
