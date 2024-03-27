import { Link } from "react-router-dom";
import css from "./MovieList.module.css"
const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

const MovieList = ({ movies }) => {
  return (
    <div className={css.container}>
      <ul className={css.listMovie}>
        {movies.map((movie) => (
          <li className={css.movieItem} key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <div>
                <img
                  className={css.movieImg}
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : defaultImg
                  }
                  width={250}
                  alt={movie.title}
                />
                <div className={css.wrapperMovieText}>
                  <h2 className={css.movieTitle}>{movie.title}</h2>
                  <p className={css.textDate} >Release Date: {movie.release_date}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
