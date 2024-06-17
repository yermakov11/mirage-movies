import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import './MoviePage.scss'
import axios from "axios";
// import {KEY} from "../data/key_movies";
import Header from "../components/Header/Header";

export default function MoviePage() {
  const { movieId } = useParams();
  const [moviePost, setMoviePost] = useState(null);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState({ name: "", text: "" });
  const [messages, setMessages] = useState([]);

  const sendComment = () => {
    if (comment.text.trim() !== '' && comment.name.trim() !== '') {
      const newMessage = `${comment.name}: ${comment.text}`;
      setMessages([...messages, newMessage]);
      setComment({ name: "", text: "" });
    }
  }

  useEffect(() => {
    const getMoviePost = async () => {
      try {
        const KEY='6a5975a6ff005e72a1bb358d51dbb3ff'
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
    <main>
      <Header/>
      <Link to="/mirage-movies/"><button className="back-btn">Back to Main Menu</button></Link>
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
                    src={`https://www.youtube.com/embed/${videos[0].key}`}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              )}
            </div>
            <footer className="comments">
              <h2>Comments</h2>
              <div className="block-comments">
                <div className="list-message">
                  <ul>
                    {messages.map((message, index) => (
                      <li key={index}>{message}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex-comments">
                  <div className="inputs">
                    <input
                      type="text"
                      className="input-name"
                      value={comment.name}
                      onChange={(e) => setComment({ ...comment, name: e.target.value })}
                      placeholder="name..."
                    />
                    <input type="text"
                      className="input-message"
                      value={comment.text}
                      onChange={(e) => setComment({ ...comment, text: e.target.value })}
                      placeholder="text comment..."
                    />
                  </div>
                  <button><img src="../../public/img/image.png" alt="error" onClick={sendComment} /></button>
                </div>
              </div>
            </footer>
          </div>
        </div>
      )}
    </main>
  );
}
