// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TaskList from './components/TaskList';
import UserList from './components/UserList';
import AddTask from './components/AddTask';
import Login from './components/Login';
import TeamLeaderTasks from './components/TeamLeaderTasks';
import Header from './components/Header'; // Import the Header component
import './App.css';

function App() {
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    setRole(localStorage.getItem('role'));
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  return (
    <Router>
      <div className="App">
        {isLoggedIn && role === 'Admin' && <Header />} {/* Conditionally render the Header for Admins */}
        <main>
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/add-task" element={<AddTask />} />
            <Route path="/login" element={<Login />} />
            <Route path="/team-tasks" element={<TeamLeaderTasks />} />
            {/* Redirect any other routes to the appropriate page based on role */}
            {role === 'TeamLeader' && <Route path="*" element={<Navigate to="/team-tasks" />} />}
            {role === 'Admin' && <Route path="*" element={<Navigate to="/" />} />}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
