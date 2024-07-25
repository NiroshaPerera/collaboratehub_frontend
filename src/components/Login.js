import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import BackButton from './BackButton';
import './Login.css'; 
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  
const handleSubmit = async (event) => {
  event.preventDefault();
  
  const loginData = {
    email: email, 
    password,
  };

  try {
    // Send POST request to backend API for login
    const response = await axios.post('http://localhost:5000/api/user/login', loginData);

    console.log('Login successful:', response.data);

    // Handle successful login
    const token = response.data.token; 

    // Store token in local storage 
    localStorage.setItem('jwtToken', token); 

    // Navigate to dashboard after successful login
    navigate('/dashboard');
  } catch (error) {
    console.error('Login error:', error.response.data);
    // Handle errors appropriately 
    alert('Invalid credentials. Please try again.'); 
  }
};

  return (
    <div className="container">
      <BackButton />
    <div className="login-container">
     
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
    </div>
  );
}

export default Login;