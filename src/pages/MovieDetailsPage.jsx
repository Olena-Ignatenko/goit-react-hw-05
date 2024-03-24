import { Suspense, lazy, useEffect, useState } from "react";
import { useParams, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
const MovieCast = lazy(() => import("../components/MovieCast"));
const MovieReviews = lazy(() => import("../components/MovieReviews"));
import Loader from "../components/Loader";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

const API_KEY = "361693f4a852f8a277166f7371377e89";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    // console.log("movieId:", movieId);
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-U`;

    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(url);
        setMovieDetails(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error.message);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const { title, overview, poster_path, release_date } = movieDetails;

  return (
    <div>
      <Link to="/">Go Back</Link>
      <h1>{title}</h1>
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : defaultImg
        }
        width={250}
        alt="poster"
      />
      <p>Release Date: {release_date}</p>
      <p>{overview}</p>
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="cast" element={<MovieCast movieId={movieId} />} />
          <Route path="reviews" element={<MovieReviews movieId={movieId} />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;

