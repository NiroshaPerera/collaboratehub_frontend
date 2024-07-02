import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import BackButton from './BackButton';
import './Login.css'; 


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  
const handleSubmit = async (event) => {
  event.preventDefault();
  

      
      // Handle successful login, store token
      console.log('Login successful(simulated)');
      navigate('/dashboard'); 
    
};
  return (
    <div className="container">
      <BackButton />
    <div className="login-container">
     
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
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