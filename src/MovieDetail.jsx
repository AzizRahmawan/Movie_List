import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const MovieDetail = () => {
    const navigate = useNavigate();
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMovieDetails(movieId);
    }, [movieId]);

    const fetchMovieDetails = (id) => {
        fetch(`https://technical.test.talenavi.com/api/movie/${id}`)
            .then(response => response.json())
            .then(data => {
                if (data.response) {
                setMovie(data.data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
                setLoading(false);
            });
    };

    const handleDelete = () => {
        fetch(`https://technical.test.talenavi.com/api/movie/${movieId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete movie.');
            }
            return response.json();
        })
        .then(data => {
            if (!data.response) {
                throw new Error(data.message);
            }
            console.log('Movie deleted successfully');
            navigate('/');
        })
        .catch(error => {
            console.error('Error deleting movie:', error.message);
        });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!movie) {
        return <p>Movie not found</p>;
    }

    return (
        <main className="h-full px-4 font-dm-sans md:px-12">
        <section className="flex flex-col md:w-full md:flex-row md:space-x-12 items-center">
            <div className="flex flex-grow-0 flex-col space-y-3">
            <img src={movie.image} alt={movie.title} className="max-h-[1200px] max-w-[400px] object-cover" />
            </div>
            <section className="flex-grok mt-4 w-full flex-col md:mt-0">
            <div className="flex flex-col space-y-8">
                <section className="flex flex-col space-y-4">
                    <section className="flex flex-col items-start justify-between space-y-3 md:space-y-0 lg:flex-row lg:space-x-4">
                        <section className="flex w-full flex-row justify-center">
                        <h2 className="max-w-fit text-wrap font-dm-display text-3xl font-bold tracking-tight text-primary md:block md:text-4xl">
                            {movie.title}
                        </h2>
                        </section>
                    </section>
                    <p className="text-gray-500 mb-2">Director: {movie.director}</p>
                    <section className="flex flex-row items-center justify-center lg:space-x-2">
                        <div className="flex flex-wrap gap-1 justify-center">
                        {movie.genres.map(genre => (
                            <span key={genre.id} className="px-2 py-1 bg-gray-200 rounded-md text-xs">{genre.name}</span>
                        ))}
                        </div>
                    </section>
                </section>
                <section className="flex flex-col justify-items-center">
                    <div className="text-wrap font-dm-sans text-sm font-medium leading-normal tracking-normal text-primary md:text-lg">
                        {movie.summary}
                    </div>
                </section>
            </div>
            <div className="flex flex-row space-x-4 justify-center mt-10">
                <Link to={`/update/movie/${movieId}`} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
                    Edit
                </Link>
                <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600">
                    Delete
                </button>
            </div>
            <div className="mt-4">
                <Link to="/" className="text-indigo-500 hover:underline">Back to Home</Link>
            </div>
            </section>
        </section>
        </main>
    );
};

export default MovieDetail;
