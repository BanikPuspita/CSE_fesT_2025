import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


const AdminMovie = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; 

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/movies');
            if (!response.data) throw new Error('Failed to fetch movies');
            setMovies(response.data.data);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleCreate = async (newMovie) => {
        try {
            const response = await axios.post('http://localhost:5000/api/movies', newMovie);
            if (!response.data) throw new Error('Failed to create movie');
            await fetchMovies();
            Swal.fire('Created!', 'Movie has been created.', 'success');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleUpdate = async (id, updatedMovie) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/movies/${id}`, updatedMovie);
            if (!response.data) throw new Error('Failed to update movie');
            await fetchMovies();
            Swal.fire('Updated!', 'Movie has been updated.', 'success');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this movie!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                const response = await axios.delete(`http://localhost:5000/api/movies/${id}`);
                if (!response.data) throw new Error('Failed to delete movie');
                await fetchMovies();
                Swal.fire('Deleted!', 'Movie has been deleted.', 'success');
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const handleView = (movie) => {
        Swal.fire({
            title: 'Movie Details',
            html: `
                <strong>Title:</strong> ${movie.title}<br>
                <strong>Director:</strong> ${movie.director}<br>
                <strong>Genre:</strong> ${movie.genre}<br>
                <strong>Release Year:</strong> ${movie.releaseYear}
            `,
            icon: 'info',
            confirmButtonText: 'Close'
        });
    };

    const handleEdit = (movie) => {
        Swal.fire({
            title: 'Update Movie',
            html: `
                <input id="swal-input1" class="swal2-input" placeholder="Title" value="${movie.title}">
                <input id="swal-input2" class="swal2-input" placeholder="Director" value="${movie.director}">
                <input id="swal-input3" class="swal2-input" placeholder="Genre" value="${movie.genre}">
                <input id="swal-input4" class="swal2-input" placeholder="Release Year" value="${movie.releaseYear}">
            `,
            focusConfirm: false,
            preConfirm: () => {
                const title = document.getElementById('swal-input1').value;
                const director = document.getElementById('swal-input2').value;
                const genre = document.getElementById('swal-input3').value;
                const releaseYear = document.getElementById('swal-input4').value;

                if (!title || !director || !genre || !releaseYear) {
                    Swal.showValidationMessage('All fields are required');
                }

                return { title, director, genre, releaseYear };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                handleUpdate(movie._id, result.value);
            }
        });
    };

    const openCreateMovieModal = () => {
        Swal.fire({
            title: 'Create New Movie',
            html: `
                <input id="swal-input1" class="swal2-input" placeholder="Title">
                <input id="swal-input2" class="swal2-input" placeholder="Director">
                <input id="swal-input3" class="swal2-input" placeholder="Genre">
                <input id="swal-input4" class="swal2-input" placeholder="Release Year">
            `,
            focusConfirm: false,
            preConfirm: () => {
                const title = document.getElementById('swal-input1').value;
                const director = document.getElementById('swal-input2').value;
                const genre = document.getElementById('swal-input3').value;
                const releaseYear = document.getElementById('swal-input4').value;

                if (!title || !director || !genre || !releaseYear) {
                    Swal.showValidationMessage('All fields are required');
                }

                return { title, director, genre, releaseYear };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                handleCreate(result.value);
            }
        });
    };

    const indexOfLastMovie = currentPage * itemsPerPage;
    const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(movies.length / itemsPerPage);

    return (
        <div className='prod'>
            <h2>Manage Movies</h2>
            {error && <p>Error: {error}</p>}
            <div>
                <h3>Create Movies</h3>
                <button onClick={openCreateMovieModal}>
                    <span role="img" aria-label="plus">➕</span> Add Movie
                </button>
            </div>

            <div className='listt'>
                <h3>Movie List</h3>
                <ul className='movie-list'>
                    {currentMovies.map((movie) => (
                        <li key={movie._id} className='movie-item'>
                            <div className='movie-box'>
                                <span className='movie-title'>{movie.title}</span>
                                <div className='icons'>
                                    <span className='icon' onClick={() => handleView(movie)}>👁️</span>
                                    <span className='icon' onClick={() => handleEdit(movie)}>✏️</span>
                                    <span className='icon' onClick={() => handleDelete(movie._id)}>🗑️</span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className='pagination'>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={index + 1 === currentPage ? 'active' : ''}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminMovie;