import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BackButton from './BackButton';
import './DocumentListComponent.css';

const DocumentListComponent = ({ documents, currentUserId }) => {
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 5;
  const navigate = useNavigate();

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterBy(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDownload = (doc) => {
    if (doc.collaborators.includes(currentUserId)) {
      const url = URL.createObjectURL(new Blob([doc.content], { type: doc.type }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', doc.name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('You do not have permission to download this document.');
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

  const filteredDocuments = filterBy === 'all' ? sortedDocuments : sortedDocuments.filter(doc => doc.type.includes(filterBy));

  const searchedDocuments = filteredDocuments.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(searchedDocuments.length / documentsPerPage);
  const currentDocuments = searchedDocuments.slice((currentPage - 1) * documentsPerPage, currentPage * documentsPerPage);

  const handleLogout = () => {
    navigate('/login');
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
