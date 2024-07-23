import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    try {
      const response = await axios.post('http://localhost:5045/security/createToken', { email, password });
      console.log('Response:', response); // Log the response
      localStorage.setItem('token', response.data);
      const user = { email, password };

      // Redirect based on credentials
      if (email === 'admin.i@gmail.com' && password === 'Pratik@123') {
        navigate('/users');
      } else if (email === 'jane.smith@example.com' && password === 'hashedpassword2') {
        navigate('/team-tasks');
      } else if (email === 'pratik.i@gmail.com' && password === 'Pratik@1232') {
        // Add the desired navigation or action here for this new condition
        navigate('/add-task');}
        else {
        setError('Invalid credentials');
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response error:', error.response.data);
        setError('Invalid credentials');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request error:', error.request);
        setError('Server did not respond. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
