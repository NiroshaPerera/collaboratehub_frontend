import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
import './DocumentListComponent.css';
import axios from 'axios';
import { UserContext } from './UserContext';

const DocumentListComponent = ({}) => {
  const [documents, setDocuments] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 5;
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  

useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('http://localhost:5000/api/documents', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            sortBy,
            filterBy,
            searchTerm,
            page: currentPage,
          },
        });
        setDocuments(response.data.documents);
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchDocuments();
  }, [sortBy, filterBy, searchTerm, currentPage, user]);


  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterBy(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDownload = async (documentId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      console.log('Token:', token);
      const response = await axios.get(`http://localhost:5000/api/documents/${documentId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const document = response.data;

      if (!document) {
        alert('Document not found');
        return;
      }

      if (!user || !document.collaborators.includes(user._id)) {
        alert('You are not authorized to download this document');
        return;
      }

      const url = URL.createObjectURL(new Blob([document.content], { type: document.type }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', document.name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
      alert('Error downloading document: ' + error.message);
    }
  };

  const sortedDocuments = [...documents].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date);
    }
    return 0;
  });

  const filteredDocuments = filterBy === 'all' ? sortedDocuments : sortedDocuments.filter(doc => doc.type.startsWith(filterBy));

  const searchedDocuments = filteredDocuments.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(searchedDocuments.length / documentsPerPage);
  const currentDocuments = searchedDocuments.slice((currentPage - 1) * documentsPerPage, currentPage * documentsPerPage);

  const handleLogout = () => {
    navigate('/');
  };
  
  return (
    <div className="view-documents">
       <header className="header">
       <div className="logo">CollaborateHub</div>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </li>
          </ul>
        </nav>
      </header>
        <BackButton />
      <h2>Uploaded Documents</h2>
      <div className="controls">
        <div className="filters">
          <label>
            <select value={sortBy} onChange={handleSortChange}>
              <option value="name">Sort by: Name</option>
              <option value="date">Sort by:Date</option>
            </select>
          </label>
          <label>
           
            <select value={filterBy} onChange={handleFilterChange}>
              <option value="all">Filter by:All Documents</option>
              <option value="application/pdf">Filter by:PDF</option>
              <option value="application/vnd.openxmlformats-officedocument.wordprocessingml.document">Filter by:DOCX</option>
              <option value="application/vnd.ms-powerpoint">Filter by:PPT</option>
              <option value="text/plain">Filter by:TXT</option>
            </select>
          </label>
          <label name="searh-bar">
            
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="File name or user name"
            />
          </label>
        </div>
      </div>
      <div className="doc-list">
        <ul>
          {currentDocuments.map((doc) => (
            <li key={doc.id}>
              <span>{doc.name} (Uploaded by: {doc.uploadedBy})</span>
              <button onClick={() => handleDownload(doc)}>Download</button>
            </li>
          ))}
        </ul>
        <div className="pagination">
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <span>{currentPage} of {totalPages}</span>
          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default DocumentListComponent;