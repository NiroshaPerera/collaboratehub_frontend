import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <header className="header">
        <div className="logo">CollaborateHub</div>
        <nav className="nav">
          <ul>
            <li>
            
              <Link to="/about"></Link>
            </li>
            <li>
             
              <Link to="/contact"></Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="main">
        <div className="image-container">
          <img
            src="https://img.freepik.com/premium-photo/resolving-conflict_810293-168540.jpg?w=740"
            alt="A diverse team collaborating on a project using a collaborative platform"
          />
        </div>
        <div className="hero">
          <h1>Welcome to the</h1>
          <h1>Employee Collaboration Platform</h1>
          <p>Please log in or register to access the platform.</p>
          <div className="buttons">
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/register">
              <button>Sign Up</button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
