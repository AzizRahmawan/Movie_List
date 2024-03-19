import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddMovieForm = () => {
    const navigate = useNavigate();
    const [genre, setGenre] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        director: '',
        summary: '',
        genre: []
    });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchGenre();
    }, []);
    
    const fetchGenre = () => {
        fetch('https://technical.test.talenavi.com/api/genre')
            .then(response => response.json())
            .then(data => {
                if (data.response) {
                    setGenre(data.data.data);
                }
            })
            .catch(error => console.error('Error fetching genre:', error));
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
        const requestBody = {
            ...formData,
            genre: formData.genre.split(',').map(genre => genre.trim().toLowerCase())
        };
        fetch('https://technical.test.talenavi.com/api/movie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add movie.');
            }
            return response.json();
        })
        .then(data => {
            if (!data.response) {
                throw new Error(data.message);
            }
            navigate('/');
            console.log('Movie add successfully:', data);
        })
        .catch(error => {
            console.error('Error add movie:', error.message);
            setErrorMessage('Failed to add movie. Please try again later.');
        });
    };

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
                <label htmlFor="genre" className="block text-gray-700">Genre:</label>
                <input
                    type="text"
                    id="genre"
                    name="genre"
                    value={formData.genre}
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
            <button type="submit" className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">Add Movie</button>
        </form>
    );
};

export default AddMovieForm;
