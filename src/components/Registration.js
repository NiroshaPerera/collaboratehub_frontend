import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
import './Registration.css';
import axios from 'axios';

function Registration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
   // Check if passwords match
   if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  

  try {
    const registrationData = {
      username,
      password,
      email,
    };

    // Send POST request to backend API for registration
    const response = await axios.post('http://localhost:5000/api/user/register', registrationData);

    console.log('Registration successful:', response.data);

    // Reset form details
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setEmail('');

    // Navigate to login page after successful registration
    navigate('/login');
  } catch (error) {
    console.error('Registration error:', error.response.data);
    // Handle errors appropriately 
    alert('Registration failed. Please try again.');
  }
};

  return (
    <div className="container">
       <BackButton />
    <div className="register-container">
     
      <h1>Create your account</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
    </div>
  );
}

export default Registration;