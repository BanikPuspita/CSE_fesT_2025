// JobComponents.jsx
import React, { useEffect, useState } from "react";
import "./Job.css";

const JobComponents = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [salaryFilter, setSalaryFilter] = useState("All");
  const [workTypeFilter, setWorkTypeFilter] = useState("All");
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobs");
        const data = await response.json();
        setJobs(data.myData || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Handle bookmark
  const handleBookmark = (jobId) => {
    setBookmarkedJobs((prevBookmarks) =>
      prevBookmarks.includes(jobId)
        ? prevBookmarks.filter((id) => id !== jobId)
        : [...prevBookmarks, jobId]
    );
  };

  // Apply filters
  const filteredJobs = jobs.filter((job) => {
    const salary = parseInt(job.salary.replace(/\D/g, ""));
    const matchesSalary =
      salaryFilter === "All"
        ? true
        : salaryFilter === "<70000"
        ? salary < 70000
        : salary >= 70000;

    const matchesWorkType =
      workTypeFilter === "All" ||
      job.work_hours.toLowerCase().includes(workTypeFilter.toLowerCase());

    return matchesSalary && matchesWorkType;
  });

  return (
    <div className="job-wrapper">
      <h1 className="job-title">Job Listings</h1>

      {/* Filters */}
      <div className="filter-container">
        <select onChange={(e) => setSalaryFilter(e.target.value)}>
          <option value="All">All Salaries</option>
          <option value="<70000">Below 70k</option>
          <option value=">=70000">70k or Above</option>
        </select>

        <select onChange={(e) => setWorkTypeFilter(e.target.value)}>
          <option value="All">All Work Types</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="remote">Remote</option>
          <option value="shift">Shift-based</option>
        </select>
      </div>

      {/* Job Cards */}
      <div className="job-card-container">
        {loading ? (
          <p>Loading jobs...</p>
        ) : filteredJobs.length === 0 ? (
          <p>No jobs match the selected filters.</p>
        ) : (
          filteredJobs.map((job) => {
            const numericSalary = parseInt(job.salary.replace(/\D/g, ""));
            return (
              <div className="job-card" key={job._id}>
                <h2 className="job-name">{job.name}</h2>
                <p className="job-description">{job.description}</p>

                <div className="job-info">
                  <p>
                    <strong>Work Hours:</strong> {job.work_hours}
                  </p>
                  <p>
                    <strong>Salary:</strong> {job.salary}
                  </p>
                  <p className={numericSalary < 70000 ? "reject" : "accept"}>
                    {numericSalary < 70000
                      ? "bhaag beta abul"
                      : "baba bolo kobul"}
                  </p>
                </div>

                <button
                  onClick={() => handleBookmark(job._id)}
                  className={bookmarkedJobs.includes(job._id) ? "bookmarked" : ""}
                >
                  {bookmarkedJobs.includes(job._id)
                    ? "Bookmarked"
                    : "Bookmark"}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default JobComponents;
