import React from 'react';
import  { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './About.css';

function About() {
  return (
    <div className="about">
         <header className="header">
        <div className="logo">CollaborateHub</div>
        <nav className="nav">
          <ul>
          <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="#">Features</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
      </header>
      <div className="about-header">
        <div className="about-header__content">
          <div className="about-header__image-container">
            <img
              src="https://www.ledmyway.com.hk/wp-content/uploads/2023/07/hillary-black-iVRXLRcQJxs-unsplash_I4Iuewkj.webp"
              alt="A diverse team collaborating on a project using a collaborative platform"
            />
          </div>
          <div className="about-header__caption">
            <h1>CollaborateHub</h1>
            <p>
              We help employees build better products by providing a modern platform. </p>
             <p>We help employees of all levels be more productive by following the latest trends and best practices.
            </p>
          </div>
        </div>
      </div>
      <div className="about-content">
        
        <h2>Our Mission</h2>
        <p>Empower every employee and every department on the internet to achieve their goals. This is what inspires us and drives us to challenge the status quo and create a better tomorrow.</p>
        <h2>Our Values</h2>
        <ul className="about-values">
          <li><FontAwesomeIcon icon={faStar} />Customer Focus</li>
          <li><FontAwesomeIcon icon={faStar}/>Innovation</li>
          <li><FontAwesomeIcon icon={faStar}/>Teamwork</li>
          <li><FontAwesomeIcon icon={faStar}/>Quality</li>
          <li><FontAwesomeIcon icon={faStar}/>Integrity</li>
          <li><FontAwesomeIcon icon={faStar}/>Growth</li>
        </ul>
      </div>
      <footer className="footer">
        <div className="social-media-links">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
        <p>© 2023 CollaborateHub.</p>
      </footer>
    </div>
  );
}

export default About;
