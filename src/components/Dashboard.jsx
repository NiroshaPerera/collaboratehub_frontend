import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faBookOpen, faCalendar, faHandshake } from '@fortawesome/free-solid-svg-icons';
import DocumentSharingComponent from './DocumentSharingComponent';
import TaskManagementComponent from './TaskManagementComponent';
import DepartmentalForumsComponent from './DepartmentalForumsComponent';
import ForumDetailComponent from './ForumDetailComponent';
import DepartmentSelectionPage from './DepartmentSelectionPage';
import { UserContext } from './UserContext'; 
import BackButton from './BackButton';
import './Dashboard.css';

const Dashboard = () => {
  const [forums, setForums] = useState([]);
  const navigate = useNavigate();
  const { users } = useContext(UserContext); // Get users from UserContext
  const loggedInUser = users[0]; // Assume the first user is the logged-in user 

  useEffect(() => {
    // Fetch forums data (replace with actual API call)
    const fetchForums = async () => {
      // Placeholder data, replace with actual API call
      const data = [
        { id: 1, name: 'Engineering', posts: [{ id: 1, user: 'User1', content: 'Welcome to the Engineering forum!', likes: 0, replies: [] }] },
        { id: 2, name: 'Marketing', posts: [{ id: 1, user: 'User2', content: 'Welcome to the Marketing forum!', likes: 0, replies: [] }] },
        { id: 3, name: 'IT Software', posts: [{ id: 1, user: 'User3', content: 'Welcome to the IT Software forum!', likes: 0, replies: [] }] },
        { id: 4, name: 'HR', posts: [{ id: 1, user: 'User4', content: 'Welcome to the HR forum!', likes: 0, replies: [] }] }
      ];
      setForums(data);
    };

    fetchForums();
  }, []);

  const handleNewPost = (forumId, newPost) => {
    setForums((prevForums) =>
      prevForums.map((forum) =>
        forum.id === forumId ? { ...forum, posts: [...forum.posts, newPost] } : forum
      )
    );
  };

  const handleLogout = () => {
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
              <Link to={`/profile/${loggedInUser.id}`}>Profile</Link> {/* Update this link */}
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
          <li className="dashboard-nav-item"><Link to="document-sharing"><FontAwesomeIcon icon={faFile} />Document Sharing</Link></li>
          <li className="dashboard-nav-item"><Link to="task-management"><FontAwesomeIcon icon={faBookOpen} />Task Management</Link></li>
          <li className="dashboard-nav-item"><Link to="departmental-forums"><FontAwesomeIcon icon={faHandshake} />Departmental Forums</Link></li>
          <li className="dashboard-nav-item"><Link to="event-calendar"><FontAwesomeIcon icon={faCalendar} />Event Calendar</Link></li>
        </ul>
      </main>
      
    </div>
  );
};

export default Dashboard;
