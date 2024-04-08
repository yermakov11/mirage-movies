import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './MoviePage.scss'
import axios from "axios";
import { KEY } from "../data/key_movies";

export default function MoviePage() {
  const { movieId } = useParams();
  const [moviePost, setMoviePost] = useState(null);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMoviePost = async () => {
      try {
        const URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${KEY}`;
        const response = await axios.get(URL);
        setMoviePost(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError(error);
      }
    };

    getMoviePost();
  }, [movieId]);

  useEffect(() => {
    const getMovieVideos = async () => {
      try {
        const URL_MOVIE = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${KEY}`;
        const response = await axios.get(URL_MOVIE);
        setVideos(response.data.results);
      } catch (error) {
        console.error("Error fetching movie videos:", error);
        setError(error);
      }
    };

    getMovieVideos();
  }, [movieId]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {moviePost && (
        <div className="movie-page">
          <div className="block-movie-page">
            <img className="image-post" src={`https://image.tmdb.org/t/p/w200${moviePost.poster_path}`} alt={moviePost.title} />
            <p>{moviePost.title}</p>
            <p>{moviePost.overview}</p>
            <p>Rate movie: {moviePost.vote_average.toFixed(1)}</p>
            <p>Original language: {moviePost.original_language}</p>
            <p>Release data: {moviePost.release_date}</p>
            <p>Movie duration: {moviePost.runtime} minutes</p>
            <div className="watch-movie">
              {videos.length > 0 && (
                <div className="watch-trailer">
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${videos[5].key}`}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
