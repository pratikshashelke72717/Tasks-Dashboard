import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5045/api/Users', {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log('API response:', response.data);

        if (response.data && response.data.$values && Array.isArray(response.data.$values)) {
          setUsers(response.data.$values);
        } else {
          console.error('Unexpected response format:', response.data);
          setUsers([]);
        }
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users.');
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="user-list-container">
      <h1>User List</h1>
      <div className="button-container">
        <button onClick={handleLogout} className="button logout-button">Logout</button>
        <button onClick={() => navigate('/tasks')} className="button nav-button">Task List</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : users.length === 0 ? (
        <p>No users available</p>
      ) : (
        <ul className="user-list">
          {users.map(user => (
            <li key={user.id} className="user-item">
              <h2>{user.name}</h2>
              <p>Role: {user.role}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
