import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faBookOpen, faCalendar, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from './UserContext'; 
import BackButton from './BackButton';
import './Dashboard.css';

const Dashboard = ({ loggedInUser }) => {
  const navigate = useNavigate();
  const { users } = useContext(UserContext); 
  
  const [storedToken, setStoredToken] = useState(null);

  useEffect(() => {
    const retrievedToken = localStorage.getItem('jwtToken');
    setStoredToken(retrievedToken); // Retrieve token on component mount
  }, []);
 
  const handleLogout = () => {
    localStorage.removeItem('jwtToken'); // Remove token on logout
    setStoredToken(null);
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="logo">CollaborateHub</div>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
             <Link to={`/profile/${loggedInUser?.id}`}>Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </li>
          </ul>
        </nav>
      </header>
      
      <main className="dashboard-content">
      <BackButton />
        <h2 className="dashboard-heading">Dashboard</h2>
        <ul className="dashboard-nav-list">
        <li className="dashboard-nav-item"><Link to="/dashboard/document-sharing"><FontAwesomeIcon icon={faFile} />Document Sharing</Link></li>
        <li className="dashboard-nav-item"><Link to="/dashboard/employee-directory"><FontAwesomeIcon icon={faAddressBook} />Employee Directory</Link></li>
        <li className="dashboard-nav-item"><Link to="/dashboard/event-calendar"><FontAwesomeIcon icon={faCalendar} />Event Calendar</Link></li>
        <li className="dashboard-nav-item"><Link to="/dashboard/task-management"><FontAwesomeIcon icon={faBookOpen} />Task Management</Link></li>
        </ul>
      </main>
      
    </div>
  );
};

export default Dashboard;
