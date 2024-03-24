import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "361693f4a852f8a277166f7371377e89";

const MovieReviews = ({ movieId }) => {
    // console.log("movieId in MovieReviews:", movieId);
  const [reviews, setReviews] = useState([]);

    useEffect(() => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`;

    const fetchMovieReviews = async () => {
      try {
        const response = await axios.get(url);
        setReviews(response.data.results);
      } catch (error) {
        console.error("Error fetching movie reviews:", error);
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  return (
    <div>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>{review.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
