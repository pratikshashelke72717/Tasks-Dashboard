// src/components/TaskList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5045/api/Tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('API response:', response.data);

        if (Array.isArray(response.data)) {
          setTasks(response.data);
        } else if (response.data.$values && Array.isArray(response.data.$values)) {
          setTasks(response.data.$values);
        } else {
          console.error('Unexpected response format:', response.data);
          setTasks([]);
        }
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Failed to fetch tasks.');
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const role = localStorage.getItem('role'); // Get role from local storage
  console.log('User role:', role); // Debugging: Check if the role is being correctly identified

  return (
    <div className="task-list-container">
      <h1>Task List</h1>
      <div className="button-container">
        <button onClick={handleLogout} className="button logout-button">Logout</button>
        <button onClick={() => navigate('/users')} className="button nav-button">User List</button>
        
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className="task-item">
              <h2>{task.title}</h2>
              <p>{task.description}</p>
              <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
              <p>Assigned to: {task.userName}</p>
              <p>Role: {task.userRole}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
