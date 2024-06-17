import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./Header.scss";
export default function Header() {
  const [searchMovie, setSearchMovie] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const KEY='6a5975a6ff005e72a1bb358d51dbb3ff'
      const URL = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${filterData}`;
      const response = await axios.get(URL);
      setSearchMovie(response.data.results);
      if (response.data.results.length > 0) {
          navigate(`/mirage-movies/${movie.id}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [filterData]);

  const changeHandler = (e) => {
    const value = e.target.value;
    setFilterData(value);
    handleSearch(value);
  };

  const hanndleMoonClick = () => {
    handleSearch();
    handleSearch(filterData);
  }
  return (
    <header className="flex-header">
      <section className="logo">
        <img src="../../../public/img/Logo.png" className="logo-header" alt="error" />
      </section>
      <section className="searchBar">
        <div className="header-content">
          <img className="header-img" src="../../../public/img/header-img.svg" alt="#" />
          <nav className="header-nav">
            <ul className="header-list">
              <li className="header-item">
                <Link className="header-item__link" href="#Home">
                  Home
                </Link>
              </li>
              <li className="header-item">
                <Link className="header-item__link" href="#Movies">
                  Movies
                </Link>
              </li>
              <li className="header-item">
                <Link className="header-item__link" href="#TV Series">
                  TV Series
                </Link>
              </li>
              <li className="header-item">
                <Link className="header-item__link" href="#Genre">
                  Genre
                </Link>
              </li>
            </ul>
            <div className="search">
              <div className="inputSearch">
                <input className="header-input" type="text" placeholder="Search..." name="q" onChange={changeHandler} />
                {filterData && searchMovie.length > 0 && (
                  <div className="search-result">
                    <ul>
                      {searchMovie.map((movie) => (
                        <Link to={`/movie/${movie.id}`}>
                          <li key={movie.id}>{movie.title}</li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <FaSearch className="search_loop" onClick={hanndleMoonClick} />
            </div>
          </nav>
          <img className="header-img_2" src="../../../public/img/header-img.svg" alt="#" />
        </div>
      </section>
    </header>
  );
}
