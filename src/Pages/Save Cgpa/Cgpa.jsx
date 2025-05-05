import React, { useState } from 'react';
import './Cgpa.css';
import StudyOrganizer from './StudyOrganizer/StudyOrganizer';
const Cgpa = () => {
  const [numCourses, setNumCourses] = useState(0);
  const [courses, setCourses] = useState([]);
  const [cgpa, setCgpa] = useState(null);
  const [showCourses, setShowCourses] = useState(false);

  const gradePoints = {
    'A+': 4.0,
    'A': 4.0,
    'B+': 3.5,
    'B': 3.0,
    'C+': 2.5,
    'C': 2.0,
    'D+': 1.5,
    'D': 1.0,
    'F': 0.0,
  };

  const handleNumCoursesChange = (e) => {
    const num = parseInt(e.target.value);
    setNumCourses(num);
    setCourses(new Array(num).fill({ name: '', grade: '', credits: 0 }));
  };

  const handleCourseChange = (index, field, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index][field] = value;
    setCourses(updatedCourses);
  };

  const calculateCGPA = () => {
    let totalCredits = 0;
    let weightedPoints = 0;

    for (let i = 0; i < numCourses; i++) {
      const { grade, credits } = courses[i];
      if (gradePoints[grade] && credits > 0) {
        weightedPoints += gradePoints[grade] * credits;
        totalCredits += credits;
      }
    }

    if (totalCredits > 0) {
      setCgpa((weightedPoints / totalCredits).toFixed(2));
    } else {
      alert("Please ensure all inputs are valid.");
    }
  };

  const toggleCourses = () => {
    setShowCourses(!showCourses);
  };

  return (
    <div className="cgpa-calculator">
      <h1>CGPA Calculator for Next Semester</h1>
      <p>Prepare Hablu for new semester by looking at courses and setting a target for new semester.</p>
      <div>
        <label>Enter the number of courses: </label>
        <input
          type="number"
          value={numCourses}
          onChange={handleNumCoursesChange}
          min="1"
        />
      </div>

      <div className="courses">
        {Array.from({ length: numCourses }, (_, index) => (
          <div key={index} className="course-input">
            <h4>Course {index + 1}</h4>
            <label>Course Name: </label>
            <input
              type="text"
              value={courses[index].name}
              onChange={(e) => handleCourseChange(index, 'name', e.target.value)}
              placeholder="Enter Course Name"
            />
            <label>Grade: </label>
            <input
              type="text"
              value={courses[index].grade}
              onChange={(e) => handleCourseChange(index, 'grade', e.target.value)}
              placeholder="Enter Grade (A+, A, B+, etc.)"
            />
            <label>Credits: </label>
            <input
              type="number"
              value={courses[index].credits}
              onChange={(e) => handleCourseChange(index, 'credits', e.target.value)}
              min="1"
              placeholder="Credits"
            />
          </div>
        ))}
      </div>

      <button onClick={calculateCGPA}>Calculate CGPA</button>

      {cgpa !== null && <h3>Your CGPA is: {cgpa}</h3>}

      <button onClick={toggleCourses}>
        {showCourses ? 'Hide Enrolled Courses' : 'Show Enrolled Courses'}
      </button>

      {showCourses && (
        <div className="enrolled-courses">
          <h3>Hablu is enrolled in the following courses:</h3>
          <table>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Credits</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Chemistry</td>
                <td>3</td> {/* Example credit value */}
              </tr>
              <tr>
                <td>DSA</td>
                <td>4</td> {/* Example credit value */}
              </tr>
              <tr>
                <td>Software</td>
                <td>4</td> {/* Example credit value */}
              </tr>
              <tr>
                <td>Compiler</td>
                <td>3</td> {/* Example credit value */}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <StudyOrganizer />
    </div>
  );
};


export default Cgpa;