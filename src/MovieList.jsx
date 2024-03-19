import { useState, useEffect } from 'react';
import './App.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState(null);

  useEffect(() => {
    fetchMovies(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const fetchMovies = (page) => {
    fetch(`https://technical.test.talenavi.com/api/movie?page=${page}`)
      .then(response => response.json())
      .then(data => {
        if (data.response) {
          setMovies(data.data.data.map(movie => ({
            ...movie,
            genres: movie.genres.slice(0, 3)
          })));
          setNextPageUrl(data.data.next_page_url);
        }
      })
      .catch(error => console.error('Error fetching movies:', error));
  };
  
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 840,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          
        }
      }
    ]
  };

  return (
    <div className="container mx-auto mt-4">
      <div className="mt-8 mb-6 mx-8 flex items-center">
        <Link
          to="/add/movie"
          className="mr-4 px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Add
        </Link>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Link
          to={`/search/${searchTerm}`}
          className="ml-4 px-4 py-2 bg-indigo-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Search
        </Link>
      </div>
      {movies.length > 0 ? (
        <Slider {...settings} className="px-2 sm:px-4 md:px-6 lg:px-8">
          {movies.map(movie => (
            <Link to={`/movie/${movie.id}`} key={movie.id} className="px-2">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-sm mx-auto">
                <img className="w-full h-48 object-cover" src={movie.image} alt={movie.title} />
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold line-clamp-1">{movie.title}</h2>
                  </div>
                  <span className="text-gray-500 text-sm">Director: {movie.director}</span>
                  <div className="flex flex-wrap gap-1">
                    {movie.genres.map(genre => (
                      <span key={genre.id} className="px-2 py-1 bg-gray-200 rounded-md text-xs">{genre.name}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      ) : (
        <p>Loading...</p>
      )}
      <div className='mt-8'>
        <h2 className='text-2xl font-bold'>List of Movies</h2>
        <div className="flex flex-wrap mt-4">
          {movies.map(movie => (
            <Link to={`/movie/${movie.id}`} key={movie.id} className="w-full md:w-1/2 lg:w-1/3 p-2">
              <div className="flex bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="w-1/3">
                  <img className="w-full h-32 object-cover" src={movie.image} alt={movie.title} />
                </div>
                <div className="w-2/3 p-4">
                  <h2 className="text-xl font-semibold mb-2 line-clamp-1">{movie.title}</h2>
                  <p className="text-gray-500 mb-2">Director: {movie.director}</p>
                  <div className="flex flex-wrap gap-1">
                    {movie.genres.map(genre => (
                      <span key={genre.id} className="px-2 py-1 bg-gray-200 rounded-md text-xs">{genre.name}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md "
          >
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button
            onClick={handleNextPage}
            disabled={!nextPageUrl}
            className={`bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md ${!nextPageUrl}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );   
};

export default MovieList;
