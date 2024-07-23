// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Add CSS file for styling

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li><Link to="/tasks">Tasks</Link></li>
          <li><Link to="/users">Users</Link></li>
          <li><Link to="/add-task">Add Task</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
