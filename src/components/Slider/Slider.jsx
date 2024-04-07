import { useState, useEffect } from "react";
import axios from 'axios'
// import { slidersData } from "../../data/slidersData";
import "./Slider.scss";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

export default function Slider() {
  const stylesArrow = {
    width: "50px",
    height: "50px",
    cursor: "pointer",
  };
  const fixedImageHeight = 400;
  const stretchedImageWidth = 1300;
  const styleImage = {
    width: `${stretchedImageWidth}px`,
    height: `${fixedImageHeight}px`,
    objectFit: "cover",
    borderRadius: "12px",
  };
  const [slideIndex, setSlideIndex] = useState(0);
  const [slidersData, setSliderData] = useState([]);

  useEffect(() => {
    const movieData = async () => {
      try {
        const URL = `https://api.themoviedb.org/3/movie/popular?api_key=6a5975a6ff005e72a1bb358d51dbb3ff`;
        const response = await axios.get(URL);
        if (response.data && response.data.results) {
          setSliderData(response.data.results);
        } else {
          console.error("No results in the response data.");
        }
      } catch (error) {
        console.error("Data error:", error);
      }
    };
    movieData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000); 
    return () => clearInterval(interval);
  },);

  const nextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % slidersData.length);
  };

  const prevSlide = () => {
    setSlideIndex((prevIndex) => prevIndex === 0 ? slidersData.length - 1 : prevIndex - 1);
  };

  return (
    <section>
      <h1 style={{ textAlign: "center", fontSize: "35px" }}>New movies</h1>
      <div className="slider">
        <SlArrowLeft  style={stylesArrow} onClick={prevSlide} />
        {slidersData.map((slide, index) => (
          <div
            className={index === slideIndex ? "slide active" : "slide"}
            key={index}
          >
            {index === slideIndex && (
              <img src={`https://image.tmdb.org/t/p/original/${slide.poster_path}`} style={styleImage}  alt={`Slide ${index}`} />
            )}
          </div>
        ))}
        <SlArrowRight style={stylesArrow} onClick={nextSlide} />
      </div>
    </section>
  );
}
