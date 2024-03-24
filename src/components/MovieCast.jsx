import { useEffect, useState } from "react";
import axios from "axios";
import imgNotFound from "../assets/image-not-found.jpg";

// import css from "../components/MovieCast.module.css"

const API_KEY = "361693f4a852f8a277166f7371377e89";

const MovieCast = ({ movieId }) => {
    // console.log("movieId in MovieCast:", movieId);
    
  const [cast, setCast] = useState([]);

    useEffect(() => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`;
    const fetchMovieCast = async () => {
      try {
        const response = await axios.get(url);
        setCast(response.data.cast);
      } catch (error) {
          console.error("Error fetching movie cast:", error);
      }
    };

    fetchMovieCast();
  }, [movieId]);

  return (
    <div>
      
      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                  : imgNotFound
              }
              alt={actor.name}
              width={200}
              height={300}
            />
            <div>{actor.name}</div>
            <div>Сharacter: {actor.character}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
