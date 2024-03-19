import { useState, useEffect } from 'react';
import './App.css';
import { Link, useParams } from 'react-router-dom';

const SearchResult = () => {
  const { searchTerm } = useParams();
  const [searchedMovies, setSearchedMovies] = useState([]);

  useEffect(() => {
    fetchMovies(searchTerm);
  }, [searchTerm]);

  const fetchMovies = searchTerm => {
    fetch(`https://technical.test.talenavi.com/api/movie?page=1&search=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        if (data.response) {
          setSearchedMovies(data.data.data.map(movie => ({
            ...movie,
            genres: movie.genres.slice(0, 3)
          })));
        }
      })
      .catch(error => console.error('Error fetching movies:', error));
  };
  const getGridWidth = (searchedMoviesLength) => {
    switch (searchedMoviesLength) {
      case 1:
        return "w-full";
      case 2:
        return "w-full sm:w-1/2";
      default:
        return "w-full sm:w-1/2 md:w-1/3"; 
    }
  };  

  return (
    <div className="container mx-auto mt-4">
      <div className="mb-4">
        <Link to="/" className="text-indigo-500 hover:underline">Back to Home</Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">Search Results for {searchTerm}</h1>
      <div className="flex flex-wrap">
        {searchedMovies.map(movie => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className={`w-full ${getGridWidth(searchedMovies.length)} p-2`}>
            <div className="flex bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="w-1/3">
                <img className="w-full h-32 object-cover" src={movie.image} alt={movie.title} />
              </div>
              <div className="w-2/3 p-4">
                <h2 className="text-xl font-semibold mb-2 line-clamp-1">{movie.title}</h2>
                <p className="text-gray-500 mb-2">Director: {movie.director}</p>
                <div className="flex flex-wrap gap-1 line-clamp-1">
                  {movie.genres.map(genre => (
                    <span key={genre.id} className="px-2 py-1 bg-gray-200 rounded-md text-xs">{genre.name}</span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
