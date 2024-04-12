import {Link} from 'react-router-dom'
import './Genres.scss'
export default function Genres() {
  return (
    <section className="genres-movies">
      <div className="container-movies">
        <nav className="genres-nav">
          <ul className="genres-list">
            <li className="genre-item">
              <Link className="genre-link" href="#">
                Action
              </Link>
            </li>
            <li className="genre-item">
              <Link className="genre-link" href="#">
                Adventure
              </Link>
            </li>
            <li className="genre-item">
              <Link className="genre-link" href="#">
                Drama
              </Link>
            </li>
            <li className="genre-item">
              <Link className="genre-link" href="#">
                Comedy
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
