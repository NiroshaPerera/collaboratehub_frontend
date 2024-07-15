import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import BackButton from './BackButton';
import './DocumentSharingComponent.css';
import { Link } from 'react-router-dom';

const DocumentSharingComponent = ({ addDocument, currentUserId }) => {
  const [newDocument, setNewDocument] = useState(null);
  const [employeeId, setEmployeeId] = useState('');
  const [collaborators, setCollaborators] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    setNewDocument(acceptedFiles[0]);
  }, []);
 

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleUpload = () => {
    if (newDocument && employeeId && collaborators) {
      const newDoc = {
        id: Date.now(),
        name: newDocument.name,
        content: newDocument,
        type: newDocument.type,
        uploadedBy: employeeId,
        date: new Date().toISOString(),
        collaborators: collaborators.split(',').map(id => id.trim()),
      };
      addDocument(newDoc);
      setNewDocument(null);
      setEmployeeId('');
      setCollaborators('');
      alert('Document uploaded successfully!');
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
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="Enter user name"
          />
        </div>
        <div className="box2">
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
