import Header from '../components/Header/Header'
import Slider from '../components/Slider/Slider'
import Genres from '../components/Genres/Genres'
import WatchMovies from '../components/WatchMovies/WatchMovies'
import Footer from '../components/Footer/Footer'

export default function MainPage() {
  return (
    <div>
      <Header/>
      <Slider/>
      <Genres/>
      <WatchMovies/>
      <Footer/>
    </div>
  )
}
