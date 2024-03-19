import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieList from './MovieList';
import SearchResult from './SearchResult';
import MovieDetail from './MovieDetail';
import UpdateMovieForm from './UpdateMovie';
import AddMovieForm from './AddMovie';

function App() {
  return (
    <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/search/:searchTerm" element={<SearchResult />} />
        <Route path="/movie/:movieId" element={<MovieDetail />} />
        <Route path="/add/movie" element={<AddMovieForm />} />
        <Route path="/update/movie/:movieId" element={<UpdateMovieForm/>} />
    </Routes>
  );
}

export default App;
