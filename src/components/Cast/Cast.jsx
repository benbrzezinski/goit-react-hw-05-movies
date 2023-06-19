import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useLoader from "../../utils/hooks/useLoader";
import Loader from "../../components/Loader/Loader";
import Api from "../../utils/services/api";
import scss from "./Cast.module.scss";

const Cast = () => {
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useLoader(true);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const castApi = await Api.getMovieCredits(id);
        setCast(castApi.cast);
      } catch (err) {
        console.error(err.stack);
        toast.error("Ups, something went wrong 🙁");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [setCast, setIsLoading, id]);

  return (
    <>
      {cast.length > 0 && (
        <ul className={scss.castList}>
          {cast.map(({ id, profile_path, name, character }) => (
            <li className={scss.castItem} key={id}>
              {profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/original${profile_path}`}
                  alt={`${name ? name : "Actor"}'s photo`}
                  className={scss.castImg}
                  loading="lazy"
                />
              ) : (
                <p className={scss.noPhoto}>No photo</p>
              )}
              <p className={scss.castName}>{name ? name : "Unknown"}</p>
              <p className={scss.castCharacter}>
                Character: {character ? character : "Unknown"}
              </p>
            </li>
          ))}
        </ul>
      )}
      {!cast.length && !isLoading && (
        <p className={scss.noCast}>There is no cast for this movie</p>
      )}
      <Loader isLoading={isLoading} />
    </>
  );
};

export default Cast;
