import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateMovieForm = () => {
    const navigate = useNavigate();
    const { movieId } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        director: '',
        summary: '',
        image: '',
        genres: []
    });
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchMovieDetails(movieId);
    }, [movieId]);

    const fetchMovieDetails = (id) => {
        fetch(`https://technical.test.talenavi.com/api/movie/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.response) {
                    const movieData = data.data;
                    setFormData({
                        title: movieData.title,
                        director: movieData.director,
                        summary: movieData.summary,
                        image: movieData.image,
                        genres: movieData.genres.map(genre => genre.name),
                    });
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
                setLoading(false);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { title, director, summary, image, genres } = formData;
        const requestBody = {
            title,
            director,
            summary,
            image,
            genre: genres
        };

        fetch(`https://technical.test.talenavi.com/api/movie/${movieId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update movie.');
            }
            return response.json();
        })
        .then(data => {
            if (!data.response) {
                throw new Error('Failed to update movie.' + data.message);
            }
            navigate('/');
            console.log('Movie updated successfully:', data);
        })
        .catch(error => {
            console.error('Error updating movie:', error);
            setErrorMessage('Failed to update movie. Please try again later.');
        });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-xl px-4" style={{ width: '400px', minWidth: '50vw', maxWidth: '80vw' }}>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700">Title:</label>
                <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="director" className="block text-gray-700">Director:</label>
                <input 
                    type="text" 
                    id="director" 
                    name="director" 
                    value={formData.director} 
                    onChange={handleChange} 
                    className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="summary" className="block text-gray-700">Summary:</label>
                <textarea 
                    id="summary" 
                    name="summary" 
                    value={formData.summary} 
                    onChange={handleChange} 
                    className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <button type="submit" className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">Update Movie</button>
        </form>
    );
};

export default UpdateMovieForm;
