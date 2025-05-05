import React from "react";
import JobComponents from "./JobComponents";
import "./Job.css";

const Job = () => {
  return (
    <div className="job-wrapper">
      <h1 className="job-title">Available Jobs for Habul</h1>
      <JobComponents />
    </div>
  );
};

export default Job;
