import './index.css';
import MainPage from './pages/MainPage';
import MoviePage from './pages/MoviePage';
import { Route,Routes } from 'react-router-dom';
function App() { 
 return (
    <div>
      <Routes>
        <Route path='/mirage-movies/' element={ <MainPage/>}/>
        <Route path='/movie/:movieId' element={<MoviePage/>}/>
      </Routes>
    </div>
  )
}
export default App
