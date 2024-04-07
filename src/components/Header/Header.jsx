import { useState } from "react";
import {FaSearch} from "react-icons/fa";
import "./Header.scss";
export default function Header() {
  const [searchMovie, setSearchMovie] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const handleSearch = async () => {
    try {
      const apiKey = "6a5975a6ff005e72a1bb358d51dbb3ff";
      const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${filterData}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setSearchMovie(data.results);
      console.log(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const changeHandler = (e) => {
    const value = e.target.value;
    setFilterData(value);
    handleSearch(value);
  };
  return (
    <header className="flex-header">
      <section className="logo">
        <img src="../../../public/img/Logo.png" className="logo-header" alt="error"/>
      </section>
      <section className="searchBar">
        <div className="header-content">
          <img className="header-img" src="../../../public/img/header-img.svg" alt="#"/>
          <nav className="header-nav">
            <ul className="header-list">
              <li className="header-item">
                <a className="header-item__link" href="#Home">
                  Home
                </a>
              </li>
              <li className="header-item">
                <a className="header-item__link" href="#Movies">
                  Movies
                </a>
              </li>
              <li className="header-item">
                <a className="header-item__link" href="#TV Series">
                  TV Series
                </a>
              </li>
              <li className="header-item">
                <a className="header-item__link" href="#Genre">
                  Genre
                </a>
              </li>
            </ul>
            <div className="search">
              <div className="inputSearch">
                <input className="header-input" type="text" placeholder="Search..." name="q" onChange={changeHandler}/>
                {filterData&&searchMovie.length>0&&(
                  <div className="search-result">
                    <ul>
                      {searchMovie.map((movie,index)=>(
                        <li key={index}>{movie.title}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <FaSearch className="search_loop"/>
            </div>
          </nav>
          <img className="header-img_2" src="../../../public/img/header-img.svg" alt="#"/>
        </div>
      </section>
    </header>
  );
}
