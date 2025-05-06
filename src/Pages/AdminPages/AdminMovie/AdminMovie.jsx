import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './AdminMovie.css';

const AdminMovie = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 6;

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/movies');
            console.log("API Response:", response.data); // Log the entire response
            
            if (response.data && Array.isArray(response.data.myData)) {
                setMovies(response.data.myData);
            } else {
                throw new Error('Data format is incorrect');
            }
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
            console.error('Error creating movie:', error.response?.data || error.message);
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

    const handleEdit = (movie) => {
        Swal.fire({
            title: 'Update Movie',
            html: `
                <input id="swal-input1" class="swal2-input" placeholder="Title" value="${movie.title}">
                <input id="swal-input2" class="swal2-input" placeholder="Year" value="${movie.year}">
                <input id="swal-input3" class="swal2-input" placeholder="Image URL" value="${movie.image}">
                <input id="swal-input4" class="swal2-input" placeholder="Description" value="${movie.description}">
                <input id="swal-input5" class="swal2-input" placeholder="Wikipedia Link" value="${movie.wikipedia}">
            `,
            focusConfirm: false,
            preConfirm: () => {
                const title = document.getElementById('swal-input1').value;
                const year = document.getElementById('swal-input2').value;
                const image = document.getElementById('swal-input3').value;
                const description = document.getElementById('swal-input4').value;
                const wikipedia = document.getElementById('swal-input5').value;

                if (!title || !year || !image || !description || !wikipedia) {
                    Swal.showValidationMessage('All fields are required');
                }

                return { title, year, image, description, wikipedia };
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
                <input id="swal-input2" class="swal2-input" placeholder="Year">
                <input id="swal-input3" class="swal2-input" placeholder="Image URL">
                <input id="swal-input4" class="swal2-input" placeholder="Description">
                <input id="swal-input5" class="swal2-input" placeholder="Wikipedia Link">
            `,
            focusConfirm: false,
            preConfirm: () => {
                const title = document.getElementById('swal-input1').value;
                const year = document.getElementById('swal-input2').value;
                const image = document.getElementById('swal-input3').value;
                const description = document.getElementById('swal-input4').value;
                const wikipedia = document.getElementById('swal-input5').value;

                if (!title || !year || !image || !description || !wikipedia) {
                    Swal.showValidationMessage('All fields are required');
                }

                return { title, year, image, description, wikipedia };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                handleCreate(result.value);
            }
        });
    };

    // Pagination logic
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
    const totalPages = Math.ceil(movies.length / moviesPerPage);

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    disabled={currentPage === i}
                    style={{
                        margin: '0 5px',
                        padding: '5px 10px',
                        backgroundColor: currentPage === i ? '#3085d6' : '#fff',
                        color: currentPage === i ? '#fff' : '#000',
                        border: '1px solid #ccc',
                        cursor: currentPage === i ? 'default' : 'pointer'
                    }}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className='prod'>
            <h2>Manage Movies</h2>
            {error && <p>Error: {error}</p>}
            <div>
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
                                    <span className='icon' onClick={() => handleEdit(movie)}>✏️</span>
                                    <span className='icon' onClick={() => handleDelete(movie._id)}>🗑️</span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className='pagination'>
                    <button onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                    {renderPageNumbers()}
                    <button onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default AdminMovie;