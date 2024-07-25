import React, { useState, useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import BackButton from './BackButton';
import './DocumentSharingComponent.css';
import { UserContext } from './UserContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DocumentSharingComponent = ({ addDocument}) => {
  const [newDocument, setNewDocument] = useState(null);
  const [documentName, setDocumentName] = useState('');
  const [username, setUsername] = useState('');
  const [collaborators, setCollaborators] = useState('');
  const { user } = useContext(UserContext); 
  

  const onDrop = useCallback((acceptedFiles) => {
    setNewDocument(acceptedFiles[0]);
  }, []);
 

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const token = localStorage.getItem('jwtToken');
  
  const handleUpload = async () => {
   if (newDocument && documentName && username && collaborators) {
      const formData = new FormData();
      formData.append('name', documentName);
      formData.append('content', newDocument);
      formData.append('uploadedBy', user._id);
      formData.append('collaborators', collaborators);

      try {
        
        const response = await axios.post('http://localhost:5000/api/documents', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` 
          },
        });
        console.log(response.data);
      addDocument(formData);
      setNewDocument(null);
        setDocumentName('');
        setUsername('');
        setCollaborators('');
        alert('Document uploaded successfully!');
      } catch (error) {
        console.error(error);
        alert('Error uploading document: ' + error.message); 
        if (error.response && error.response.status === 400) {
          alert('Bad request: Please check the file format or other input values.');
        } else if (error.response && error.response.status === 500) {
          alert('Server error: Please try again later.');
        } 
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="container">
    <BackButton/>
    <div className="document-sharing">
     
      <div className="file-upload">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Drag & drop a file here, or click to select one</p>
        </div>
        <div className="box1">
            <input
              type="text"
              value={documentName} 
              onChange={(e) => setDocumentName(e.target.value)}
              placeholder="Enter document name"
            />
          </div>
        <div className="box2">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter user name"
          />
        </div>
        <div className="box3">
          <input
            type="text"
            value={collaborators}
            onChange={(e) => setCollaborators(e.target.value)}
            placeholder="Enter collaborator (comma-separated)"
          />
        </div>
        <button onClick={handleUpload}>Upload Document</button>
      </div>
      <div className="view-link">
        <Link to="/view-documents">View Uploaded Documents</Link>
      </div>
      </div>
    </div>
  );
};

export default DocumentSharingComponent;