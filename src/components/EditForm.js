import React, { useState, useEffect, useParams } from 'react';
import axios from 'axios';

const EditForm = ({ username, onCancel, onUpdate }) => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
        setUser(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [username]); 

  const handleInputChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { name, email, bio } = user; 
  
    // Check for required fields
    if (!name || !email || !bio) {
      alert('Please fill in all required fields');
      return false;
    }
  
    //email validation 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Invalid email format');
      return false;
    }
  
    return true;
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return; 
    }
    try {
      setIsLoading(true);

      //  update user data
      const formData = new FormData(); 
      formData.append('username', user.username); 
      formData.append('email', user.email);
      formData.append('bio', user.bio);
      formData.append('profilePicture', event.target.profilePicture.files[0]); 

      const response = await axios.put(`http://localhost:5000/api/user/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });

      onUpdate(response.data); 
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" value={user?.username || ''} onChange={handleInputChange} disabled />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={user?.email || ''} onChange={handleInputChange} disabled />
      </label>

     
      <label>
        Bio:
        <textarea name="bio" value={user?.bio || ''} onChange={handleInputChange} />
      </label>

     
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
