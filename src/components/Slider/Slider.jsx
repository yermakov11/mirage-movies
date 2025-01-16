import { useState, useEffect } from "react";
import axios from "axios";
import "./Slider.scss";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

export default function Slider() {
  const stylesArrow = {
    width: "50px",
    height: "50px",
    cursor: "pointer",
  };

  const [slideIndex, setSlideIndex] = useState(0);
  const [slidersData, setSliderData] = useState([]);
  const visibleSlides = 4;

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
    }, 3000); 
    return () => clearInterval(interval);
  }, [slidersData]);

  const nextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + visibleSlides) % slidersData.length);
  };

  const prevSlide = () => {
    setSlideIndex((prevIndex) =>
      prevIndex === 0 ? slidersData.length - visibleSlides
      : (prevIndex - visibleSlides + slidersData.length) % slidersData.length
    );
  };

  return (
    <section>
      <h1>New Movies</h1>
      <div className="carousel">
        <SlArrowLeft className="arrow-style" style={stylesArrow} onClick={prevSlide}/>
        <div className="carousel-track">
          {slidersData.map((slide, index) => (
            <div className="carousel-slide" key={index}
              style={{
                transform: `translateX(-${slideIndex * (100 / visibleSlides)}%)`,
                flex: `0 0 calc(100% / ${visibleSlides})`,
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/original${slide.poster_path}`}
                alt={slide.title || `Slide ${index}`}
                className="api_image"
              />
            </div>
          ))}
        </div>
        <SlArrowRight className="arrow-style" style={stylesArrow} onClick={nextSlide}/>
      </div>
    </section>
  );
}

