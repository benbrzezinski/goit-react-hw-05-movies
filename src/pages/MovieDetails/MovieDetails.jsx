import {
  NavLink,
  Link,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";
import { useState, useEffect, useRef, Suspense } from "react";
import { toast } from "react-toastify";
import useLoader from "../../utils/hooks/useLoader";
import Loader from "../../components/Loader/Loader";
import Api from "../../utils/services/api";
import scss from "./MovieDetails.module.scss";
import clsx from "clsx";

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState([]);
  const [isLoading, setIsLoading] = useLoader(true);
  const { id } = useParams();
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? "/");

  useEffect(() => {
    (async () => {
      try {
        const movie = await Api.getMovieDetails(id);
        setMovieDetails([movie]);
      } catch (err) {
        console.error(err.stack);
        toast.error("Ups, something went wrong 🙁");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [setMovieDetails, setIsLoading, id]);

  return (
    <>
      {!isLoading && (
        <div className={scss.backBtnBox}>
          <button type="button" className={scss.backBtn}>
            <Link to={backLink.current} className={scss.backLink}>
              Go back
            </Link>
          </button>
        </div>
      )}
      {movieDetails.map(
        ({
          id,
          poster_path,
          tagline,
          title,
          release_date,
          vote_average,
          overview,
          genres,
        }) => (
          <div className={scss.movie} key={id}>
            {poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/original${poster_path}`}
                alt={tagline ? tagline : "Movie photo"}
                className={scss.movieImg}
                loading="lazy"
              />
            ) : (
              <p className={scss.noPhoto}>No&nbsp;photo</p>
            )}
            <section className={scss.movieSection}>
              <h1 className={scss.movieTitle}>
                {`${title} (${
                  release_date ? release_date.slice(0, 4) : "No date"
                })`}
              </h1>
              <div className={scss.movieOverviewBox}>
                <p className={scss.movieOverview}>Overview</p>
                <p className={scss.movieOverviewText}>
                  {overview ? overview : "No description"}
                </p>
              </div>
              <p className={scss.movieScore}>
                <span className={scss.movieScoreText}>User score:</span>{" "}
                {Math.round(vote_average * 10)}%
              </p>
              <p className={scss.movieGenres}>Genres</p>
              {genres.length > 0 ? (
                <ul className={scss.movieGenresList}>
                  {genres.map(({ id, name }) => (
                    <li key={id}>{name}</li>
                  ))}
                </ul>
              ) : (
                <p>No genres</p>
              )}
            </section>
          </div>
        )
      )}
      {!isLoading && (
        <div className={scss.moreInfoBox}>
          <p className={scss.moreInfo}>Additional information</p>
          <ul className={scss.moreInfoList}>
            <li className={scss.moreInfoItem}>
              <NavLink
                to="cast"
                className={({ isActive }) =>
                  clsx(scss.moreInfoLink, isActive && scss.isActive)
                }
              >
                Cast
              </NavLink>
            </li>
            <li className={scss.moreInfoItem}>
              <NavLink
                to="reviews"
                className={({ isActive }) =>
                  clsx(scss.moreInfoLink, isActive && scss.isActive)
                }
              >
                Reviews
              </NavLink>
            </li>
          </ul>
        </div>
      )}
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <Loader isLoading={isLoading} />
    </>
  );
};

export default MovieDetails;
