import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './AdminJob.css';

const AdminJob = () => {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 5;

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/jobs');
            if (response.data && Array.isArray(response.data.myData)) {
                setJobs(response.data.myData);
            } else {
                throw new Error('Data format is incorrect');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleCreate = async (newJob) => {
        try {
            const response = await axios.post('http://localhost:5000/api/jobs', newJob);
            if (!response.data) throw new Error('Failed to create job');
            await fetchJobs();
            Swal.fire('Created!', 'Job has been created.', 'success');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleUpdate = async (id, updatedJob) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/jobs/${id}`, updatedJob);
            if (!response.data) throw new Error('Failed to update job');
            await fetchJobs();
            Swal.fire('Updated!', 'Job has been updated.', 'success');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this job!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                const response = await axios.delete(`http://localhost:5000/api/jobs/${id}`);
                if (!response.data) throw new Error('Failed to delete job');
                await fetchJobs();
                Swal.fire('Deleted!', 'Job has been deleted.', 'success');
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const handleEdit = (job) => {
        Swal.fire({
            title: 'Update Job',
            html: `
                <input id="swal-input1" class="swal2-input" placeholder="Name" value="${job.name}">
                <input id="swal-input2" class="swal2-input" placeholder="Description" value="${job.description}">
                <input id="swal-input3" class="swal2-input" placeholder="Work Hours" value="${job.work_hours}">
                <input id="swal-input4" class="swal2-input" placeholder="Salary" value="${job.salary}">
            `,
            focusConfirm: false,
            preConfirm: () => {
                const name = document.getElementById('swal-input1').value;
                const description = document.getElementById('swal-input2').value;
                const work_hours = document.getElementById('swal-input3').value;
                const salary = document.getElementById('swal-input4').value;

                if (!name || !description || !work_hours || !salary) {
                    Swal.showValidationMessage('All fields are required');
                }

                return { name, description, work_hours, salary };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                handleUpdate(job._id, result.value);
            }
        });
    };

    const openCreateJobModal = () => {
        Swal.fire({
            title: 'Create New Job',
            html: `
                <input id="swal-input1" class="swal2-input" placeholder="Name">
                <input id="swal-input2" class="swal2-input" placeholder="Description">
                <input id="swal-input3" class="swal2-input" placeholder="Work Hours">
                <input id="swal-input4" class="swal2-input" placeholder="Salary">
            `,
            focusConfirm: false,
            preConfirm: () => {
                const name = document.getElementById('swal-input1').value;
                const description = document.getElementById('swal-input2').value;
                const work_hours = document.getElementById('swal-input3').value;
                const salary = document.getElementById('swal-input4').value;

                if (!name || !description || !work_hours || !salary) {
                    Swal.showValidationMessage('All fields are required');
                }

                return { name, description, work_hours, salary };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                handleCreate(result.value);
            }
        });
    };

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
    const totalPages = Math.ceil(jobs.length / jobsPerPage);

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
            {error && <p>Error: {error}</p>}
            <div>
                <h3>See potential jobs</h3>
                <button onClick={openCreateJobModal}>
                    <span role="img" aria-label="plus">➕</span> Add Job
                </button>
            </div>
            <div className='listt'>
                <h3>Job List (Page {currentPage} of {totalPages})</h3>
                <ul className='job-list'>
                    {currentJobs.map((job) => (
                        <li key={job._id} className='job-item'>
                            <div className='job-box'>
                                <span className='job-title'>{job.name}</span>
                                <div className='icons'>
                                    <span className='icon' onClick={() => handleEdit(job)}>✏️</span>
                                    <span className='icon' onClick={() => handleDelete(job._id)}>🗑️</span>
                                </div>
                                <div className='job-details'>
                                    <p><strong>Description:</strong> {job.description}</p>
                                    <p><strong>Work Hours:</strong> {job.work_hours}</p>
                                    <p><strong>Salary:</strong> {job.salary}</p>
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

export default AdminJob;