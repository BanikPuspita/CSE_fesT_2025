import React, { useState, useEffect } from 'react';
import './StudyOrganizer.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';

const StudyOrganizer = () => {
  const [ctEvents, setCtEvents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [exams, setExams] = useState([]);
  const [labTasks, setLabTasks] = useState([]);

  const addCtEvent = (event, date) => setCtEvents([...ctEvents, { event, date, completed: false }]);
  const addAssignment = (assignment, date) => setAssignments([...assignments, { assignment, date, completed: false }]);
  const addExam = (exam, date) => setExams([...exams, { exam, date, completed: false }]);
  const addLabTask = (task, date) => setLabTasks([...labTasks, { task, date, completed: false }]);

  const toggleCompletion = (items, setItems, index) => {
    const updatedItems = [...items];
    updatedItems[index].completed = !updatedItems[index].completed;
    setItems(updatedItems);
  };

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const reminderTime = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds

      [...ctEvents, ...assignments, ...exams, ...labTasks].forEach(item => {
        if (item.date && item.date - now < reminderTime && item.date - now > 0) {
          Swal.fire({
            title: 'Reminder!',
            text: `You have less time for: ${item.event || item.assignment || item.exam || item.task}. Study hard!`,
            icon: 'warning',
            confirmButtonText: 'Okay'
          });
        }
      });
    };

    const intervalId = setInterval(checkReminders, 3600000); // Check every hour

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [ctEvents, assignments, exams, labTasks]);

  return (
    <div className="study-organizer">
      <h1>Study Organizer</h1>
      <Section title="Upcoming CT Events" addItem={addCtEvent} items={ctEvents} toggleCompletion={toggleCompletion} setItems={setCtEvents} />
      <Section title="Due Assignments" addItem={addAssignment} items={assignments} toggleCompletion={toggleCompletion} setItems={setAssignments} />
      <Section title="Exam Routine" addItem={addExam} items={exams} toggleCompletion={toggleCompletion} setItems={setExams} />
      <Section title="Lab Tasks to Complete" addItem={addLabTask} items={labTasks} toggleCompletion={toggleCompletion} setItems={setLabTasks} />
    </div>
  );
};

const Section = ({ title, addItem, items, toggleCompletion, setItems }) => {
  const [inputValue, setInputValue] = useState('');
  const [date, setDate] = useState(null);

  const handleAddItem = () => {
    if (inputValue.trim() && date) {
      addItem(inputValue.trim(), date);
      setInputValue('');
      setDate(null);
    }
  };

  return (
    <div className="section">
      <h2>{title}</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={`Add a new ${title.toLowerCase()}`}
      />
      <DatePicker
        selected={date}
        onChange={(date) => setDate(date)}
        dateFormat="yyyy/MM/dd"
        placeholderText="Select a date"
      />
      <button onClick={handleAddItem}>Add</button>
      
      <ul>
        {items.map((item, index) => (
          <li key={index} className={item.completed ? 'completed' : ''}>
            <label>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleCompletion(items, setItems, index)}
              />
              {item.event || item.assignment || item.exam || item.task} - {item.date.toLocaleDateString()}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudyOrganizer;