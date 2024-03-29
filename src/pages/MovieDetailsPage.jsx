import { Suspense, lazy, useEffect, useState, useRef } from "react";
import {
  useParams,
  Routes,
  Route,
  Link,
  Outlet,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import css from "./MovieDetailsPage.module.css";

const MovieCast = lazy(() => import("../components/MovieCast"));
const MovieReviews = lazy(() => import("../components/MovieReviews"));

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

const API_KEY = "361693f4a852f8a277166f7371377e89";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  // const locationState = useRef(null);
  const location = useLocation();
  const goBack = useRef(location?.state?.from ?? "/");

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

  // Отримання значення location.state через useRef
  // useEffect(() => {
  //   if (location.state) {
  //     locationState.current = location.state;
  //   }
  // });

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const { title, overview, poster_path, release_date } = movieDetails;

  return (
    <div>
      <div>
        <Link className={css.goBackBtn} to={goBack.current}>
          Go Back
        </Link>
      </div>
      <h2 className={css.title}>{title}</h2>
      <div className={css.wrapper}>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : defaultImg
          }
          width={250}
          alt="poster"
        />
        <div className={css.wrapperText}>
          <p>Release Date: {release_date}</p>
          <p>{overview}</p>
        </div>
      </div>
      <div>
        <ul className={css.filmInfo}>
          <li >
            <Link className={css.filmInfoItem} to="cast" state={{ movieId }}>
              Cast
            </Link>
          </li>
          <li>
            <Link className={css.filmInfoItem} to="reviews" state={{ movieId }}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="cast" element={<MovieCast movieId={movieId} />} />
          <Route path="reviews" element={<MovieReviews movieId={movieId} />} />
        </Routes>
      </Suspense>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
