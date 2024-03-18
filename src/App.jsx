import React, { useState, useEffect } from 'react';
import './App.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// const movies = [
//   {
//     id: 1,
//     title: "Inception",
//     image: "https://via.placeholder.com/300",
//     synopsis: "Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state."
//   },
//   {
//     id: 2,
//     title: "The Shawshank Redemption",
//     image: "https://via.placeholder.com/300",
//     synopsis: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
//   },
//   {
//     id: 3,
//     title: "The Dark Knight",
//     image: "https://via.placeholder.com/300",
//     synopsis: "When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham."
//   },
//   {
//     id: 4,
//     title: "The Godfather",
//     image: "https://via.placeholder.com/300",
//     synopsis: "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son."
//   },
//   {
//     id: 5,
//     title: "Pulp Fiction",
//     image: "https://via.placeholder.com/300",
//     synopsis: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
//   },
//   {
//     id: 6,
//     title: "Forrest Gump",
//     image: "https://via.placeholder.com/300",
//     synopsis: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart."
//   },
//   {
//     id: 7,
//     title: "The Matrix",
//     image: "https://via.placeholder.com/300",
//     synopsis: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers."
//   },
//   {
//     id: 8,
//     title: "Interstellar",
//     image: "https://via.placeholder.com/300",
//     synopsis: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
//   }
// ];

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('https://technical.test.talenavi.com/api/movie')
      .then(response => response.json())
      .then(data => {
        if (data.response) {
          setMovies(data.data.data.map(movie => ({
            ...movie,
            genres: movie.genres.slice(0, 4)
          })));
        }
      })
      .catch(error => console.error('Error fetching movies:', error));
  }, []);
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
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="container mx-auto py-8">
      {movies.length > 0 ? (
        <div>
          <Slider {...settings}>
            {movies.map(movie => (
              <div key={movie.id} className="px-2">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg h-full">
                  <img className="w-full h-48 object-cover" src={movie.image} alt={movie.title} />
                  <div className="p-4 flex flex-col justify-between h-full">
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
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MovieList;