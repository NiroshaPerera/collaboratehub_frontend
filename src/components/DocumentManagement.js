import React, { useState, useEffect, useContext } from 'react';
import DocumentSharingComponent from './DocumentSharingComponent';
import DocumentListComponent from './DocumentListComponent';
import { UserContext } from './UserContext';
import axios from 'axios';

const DocumentManagement = () => {
    const [documents, setDocuments] = useState([]);
    const { user } = useContext(UserContext);

    const token = localStorage.getItem('jwtToken');

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/documents', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setDocuments(response.data);
            } catch (error) {
                console.error('Error fetching documents:', error);
            }
        };

        fetchDocuments();
    }, [token]);

    const addDocument = async (formData) => {
        const documentData = {
            name: formData.get('name'),
            content: formData.get('content'),
            uploadedBy: user._id,
            collaborators: formData.get('collaborators'),
        };

        try {
            const response = await axios.post('http://localhost:5000/api/documents', documentData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            const newDocument = response.data;
            setDocuments([...documents, newDocument]);
        }  catch (error) {
            console.error('Error uploading document:', error);
        }
    };


    return (
        <div className="document-management">
            <DocumentSharingComponent addDocument={addDocument}/>
            <DocumentListComponent documents={documents} />
        </div>
    );
};

export default DocumentManagement;