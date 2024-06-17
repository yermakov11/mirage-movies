import "./index.css";
import MainPage from "./pages/MainPage";
import MoviePage from "./pages/MoviePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/mirage-movies/" element={<MainPage />} />
          <Route path="/movie/:movieId" element={<MoviePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
