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

  const handleBookmark = (jobId) => {
    setBookmarkedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

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
      <h1 className="job-title">Explore Jobs</h1>

      <div className="filter-container">
        <select value={salaryFilter} onChange={(e) => setSalaryFilter(e.target.value)}>
          <option value="All">All Salaries</option>
          <option value="<70000">Below 70k</option>
          <option value=">=70000">70k or Above</option>
        </select>

        <select value={workTypeFilter} onChange={(e) => setWorkTypeFilter(e.target.value)}>
          <option value="All">All Work Types</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="remote">Remote</option>
          <option value="shift">Shift-based</option>
        </select>
      </div>

      <div className="job-card-container">
        {loading ? (
          <p className="loading-message">Loading jobs...</p>
        ) : filteredJobs.length === 0 ? (
          <p className="empty-message">No jobs match your filters.</p>
        ) : (
          filteredJobs.map((job) => {
            const numericSalary = parseInt(job.salary.replace(/\D/g, ""));
            const isHighSalary = numericSalary >= 70000;
            const bookmarked = bookmarkedJobs.includes(job._id);

            return (
              <div className="job-card" key={job._id}>
                <div className="job-header">
                  <h2 className="job-name">{job.name}</h2>
                  <span className={`job-badge ${job.work_hours.includes("remote") ? "remote" : "onsite"}`}>
                    {job.work_hours}
                  </span>
                </div>

                <p className="job-description">{job.description}</p>

                <div className="job-info">
                  <p><strong>Salary:</strong> {job.salary}</p>
                  <p className={`status-badge ${isHighSalary ? "accept" : "reject"}`}>
                    {isHighSalary ? "baba bolo kobul" : "bhaag beta abul"}
                  </p>
                </div>

                <button
                  onClick={() => handleBookmark(job._id)}
                  className={bookmarked ? "bookmarked" : ""}
                >
                  {bookmarked ? "Bookmarked" : "Bookmark"}
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
