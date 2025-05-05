import React, { useState } from 'react';
import './Cgpa.css';

const Cgpa = () => {
  const [numCourses, setNumCourses] = useState(0);
  const [courses, setCourses] = useState([]);
  const [cgpa, setCgpa] = useState(null);

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
    setCourses(new Array(num).fill({ grade: '', credits: 0 }));
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

  return (
    <div className="cgpa-calculator">
      <h1>CGPA Calculator</h1>
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
    </div>
  );
};

export default Cgpa;
