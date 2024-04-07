import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function MoviePage() {
  const { movieId } = useParams();
  const [moviePost, setMoviePost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMoviePost = async () => {
      try {
        const URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=6a5975a6ff005e72a1bb358d51dbb3ff`;
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

  if (error) {
    return <div>Error: {error.message}</div>; 
  }

  return (
    <div>
      {moviePost && (
        <div>
          <img className="image-post" src={`https://image.tmdb.org/t/p/w300${moviePost.poster_path}`} alt={moviePost.title}/>
          <p className="name-movie">{moviePost.title}</p>
          <p className="desc-movie">{moviePost.overview}</p>
        </div>
      )}
    </div>
  );
}
