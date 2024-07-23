// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import TaskList from './components/TaskList';
import UserList from './components/UserList';
import AddTask from './components/AddTask';
import Login from './components/Login';
import './App.css';

function PrivateRoute({ element: Component, ...rest }) {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Task Management System</h1>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/tasks">Tasks</Link></li>
              <li><Link to="/users">Users</Link></li>
              <li><Link to="/add-task">Add Task</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/tasks" element={<PrivateRoute element={TaskList} />} />
            <Route path="/users" element={<PrivateRoute element={UserList} />} />
            <Route path="/add-task" element={<PrivateRoute element={AddTask} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
