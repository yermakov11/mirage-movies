// В WatchMovies.jsx
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./WatchMovies.scss";

export default function WatchMovies() {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        const URL = 'https://api.themoviedb.org/3/discover/movie?api_key=6a5975a6ff005e72a1bb358d51dbb3ff';
        const response = await fetch(URL);
        const data = await response.json();
        setMovieList(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchMoviesData();
  }, []);

  return (
    <section>
      <div className="movies-content">
        <h2 className="movies-title">Movies</h2>
      </div>
      <div className="movies-lists">
        <ul className="mov-list">
          {movieList.map((movie) => (
            <li key={movie.id} className="movies-list__item">
              <Link to={`/movie/${movie.id}`}>
                <img className="movies-list__img" src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt="error"/>
                <button className="movies-btn">watch</button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
