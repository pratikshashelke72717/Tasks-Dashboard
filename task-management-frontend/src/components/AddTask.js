import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5147/api/Tasks', { title, description, dueDate })
      .then(response => {
        console.log('Task added:', response.data);
        navigate('/');
      })
      .catch(error => console.error('Error adding task:', error));
  };

  return (
    <div>
      <h1>Add Task</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <br />
        <label>
          Due Date:
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
