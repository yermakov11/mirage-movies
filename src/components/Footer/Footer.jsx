import "./Footer.scss";
export default function Footer() {
  return (
    <footer>
      <div className="footer-btn">
        <button className="footer-btn__link" role="link">
          Sign in for more access
        </button>
      </div>
      <div className="footer-cont container">
        <div className="footer-cont__links">
          <p className="footer-cont__text">
            On our online movie theater you can watch movies exclusively in <br />
            English. This will help you to learn and understand the language by <br />
            ear. Through unique subtitles you can write out words in our <br />
            dictionary.
          </p>
          <div className="footer-cont__logo">
            <h3 className="footer-cont__title">© 2025 Mirage movies</h3>
          </div>
        </div>
      </div>
    </footer>
  );
}
