import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useLoader from "../../utils/hooks/useLoader";
import Loader from "../../components/Loader/Loader";
import Api from "../../utils/services/api";
import scss from "./Reviews.module.scss";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useLoader(true);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const reviewsApi = await Api.getMovieReviews(id);
        setReviews(reviewsApi);
      } catch (err) {
        console.error(err.stack);
        toast.error("Ups, something went wrong 🙁");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [setReviews, setIsLoading, id]);

  return (
    <>
      {reviews.length > 0 && (
        <ul className={scss.reviewsList}>
          {reviews.map(({ id, author_details: { name, rating }, content }) => (
            <li className={scss.reviewsItem} key={id}>
              <p className={scss.reviewsName}>
                <span className={scss.reviewsNameText}>Author:</span>{" "}
                {name ? name : "Unknown"}
              </p>
              <p className={scss.reviewsRating}>
                <span className={scss.reviewsRatingText}>Rating:</span>{" "}
                {rating ? `${rating}/10` : "Unknown"}
              </p>
              <p>
                <span className={scss.reviewsDescription}>Description:</span>{" "}
                {content ? content : "No description"}
              </p>
            </li>
          ))}
        </ul>
      )}
      {!reviews.length && !isLoading && (
        <p className={scss.noReviews}>There is no reviews for this movie</p>
      )}
      <Loader isLoading={isLoading} />
    </>
  );
};

export default Reviews;
