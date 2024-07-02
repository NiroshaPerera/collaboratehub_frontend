import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditForm = ({ username, onCancel, onUpdate }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/users/${username}`);
        setUser(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [username]); // Fetch data only when username changes

  const handleInputChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    // Implement your validation logic here
    // Check for required fields, email format, etc.
    // Return true if valid, false if invalid
    return true; // Replace with actual validation logic
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return; // Prevent submission if form is invalid
    }
    try {
      setIsLoading(true);

      // Implement your API call to update user data
      const formData = new FormData(); // For handling file uploads
      formData.append('username', user.username); // Replace with actual fields
      formData.append('email', user.email);
      formData.append('bio', user.bio);
      formData.append('profilePicture', event.target.profilePicture.files[0]); // Access uploaded file

      const response = await axios.put(`/api/users/${username}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Required for file uploads
        },
      });

      onUpdate(response.data); // Pass updated user data to parent component
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Username and Email (disabled for editing) */}
      <label>
        Username:
        <input type="text" name="username" value={user?.username || ''} onChange={handleInputChange} disabled />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={user?.email || ''} onChange={handleInputChange} disabled />
      </label>

      {/* Bio (editable) */}
      <label>
        Bio:
        <textarea name="bio" value={user?.bio || ''} onChange={handleInputChange} />
      </label>

      {/* Profile Picture (with file upload) */}
      <label>
        Profile Picture:
        <input type="file" name="profilePicture" />
      </label>

      {isLoading && <p>Updating...</p>}
      {error && <p>Error: {error}</p>}
      <button type="submit" disabled={isLoading}>
        Save Changes
      </button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditForm;
