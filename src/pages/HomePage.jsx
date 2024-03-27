import axios from "axios";
import MovieList from "../components/MovieList";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import css from "./HomePage.module.css"


const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjE2OTNmNGE4NTJmOGEyNzcxNjZmNzM3MTM3N2U4OSIsInN1YiI6IjY1ZmYwYzNmMDQ3MzNmMDE2NGU5YjFlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kXgZ5m9nP6YrMiJleI5mNHUAPDiUQQSY5BmeKcEjLWU";

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setLoading(true);
      const url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US`;
      const params = {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      };
      try {
        const response = await axios.get(url, params);
        //   return response.data.results;
        setTrendingMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h1 className={css.homepageTitile} >Trending Movies</h1>
      {loading ? <Loader /> : <MovieList movies={trendingMovies} />}
    </div>
  );
};

export default HomePage;
