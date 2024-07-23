import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TaskList.css'; // Assuming you want to use the same styles as TaskList

const TeamLeaderTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5045/api/TeamLeader/team-tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('API response:', response.data);

        // Format tasks for rendering
        const formattedTasks = response.data.$values.map(task => ({
          id: task.id,
          title: task.title,
          description: task.description,
          dueDate: task.dueDate,
          userName: task.userName,
          userRole: task.userRole,
        }));

        setTasks(formattedTasks);
      } catch (err) {
        console.error('Error fetching tasks:', err.response ? err.response.data : err.message);
        setError('Failed to fetch tasks.');
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

  return (
    <div className="task-list-container">
      <header>
        <h1>Task List</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>
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

export default TeamLeaderTasks;
