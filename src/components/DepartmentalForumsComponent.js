
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import BackButton from './BackButton';
import './DepartmentalForumsComponent.css';

const DepartmentalForumsComponent = () => {
  const [forums, setForums] = useState([]);
  const [selectedForum, setSelectedForum] = useState(null);

  useEffect(() => {
    // Fetch forums data (replace with actual API call)
    const fetchForums = async () => {
      // Placeholder data, replace with actual API call
      const data = [
        { id: 1, name: 'Engineering', posts: [{ id: 1, user: 'EID1', content: 'Welcome to the Engineering forum!' }] },
        { id: 2, name: 'Marketing', posts: [{ id: 1, user: 'MID1', content: 'Welcome to the Marketing forum!' }] },
        { id: 3, name: 'IT Software', posts: [{ id: 1, user: 'IID1', content: 'Welcome to the IT Software forum!' }] },
        { id: 4, name: 'HR', posts: [{ id: 1, user: 'HID', content: 'Welcome to the HR forum!' }] }
      ];
      setForums(data);
    };

    fetchForums();
  }, []);

  const handleNewPost = (forumId, newPost) => {
    setForums((prevForums) =>
      prevForums.map((forum) =>
        forum.id === forumId
          ? { ...forum, posts: [...forum.posts, newPost] }
          : forum
      )
    );
  };

  return (
    <div className="departmental-forums">
        <header className="header">
       <div className="logo">CollaborateHub</div>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            
          </ul>
        </nav>
      </header>
      <BackButton />
      <div className="forums-container">
        <div className="forums-list">
          <h3>Departments</h3>
          <p>Navigate through different forums</p>
          <ul>
            {forums.map((forum) => (
              <li key={forum.id} onClick={() => setSelectedForum(forum)}>
                 <FontAwesomeIcon icon={faFolderOpen} /> {forum.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="forum-posts">
        <h2>Departmental Forums</h2>
          {selectedForum ? (
            <>
              <h3>{selectedForum.name} Forum</h3>
              <div className="link">
              <Link to={`/departmental-forums/${selectedForum.id}`}>View Full Discussion</Link>
              </div>
              </>
            
          ) : (
            <p>Select a department to view its forum.</p>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default DepartmentalForumsComponent;
