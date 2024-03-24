import { Suspense, lazy } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loader from "./components/Loader";
import "./App.css";

const HomePage = lazy(() => import("./pages/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const MovieCast = lazy(() => import("./components/MovieCast"));
const MovieReviews = lazy(() => import("./components/MovieReviews"));

// import Layout from "./components/Layout/Layout";

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId/*" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
