import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from './UserContext';
import BackButton from './BackButton';
import './UserProfile.css';
import axios from 'axios';


const UserProfile = () => {
  const { userId } = useParams();
  const { user } = useContext(UserContext);

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || '',
    bio: user?.bio || '',
    imagePreview: user?.image || '',
  });

  const token = localStorage.getItem('jwtToken');

  const handleChange = (event) => {
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
  };

  const handleEditProfileClick = () => {
    setIsEditProfileOpen(!isEditProfileOpen);
  };

  const handleSaveProfile = async (event) => {
    event.preventDefault();

    try {
      console.log('Updating profile with data:', userDetails);
      const response = await axios.put(`http://localhost:5000/api/user/${userId}`, userDetails, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Profile updated successfully:', response.data);
      setIsEditProfileOpen(false);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    }
  };

  const renderUserProfile = () => (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Bio:</strong> {user.bio}</p>
      {user.image && <img src={user.image} alt="Profile Picture" />}
    </div>
  );

  const renderEditProfileForm = () => (
    <form onSubmit={handleSaveProfile} className="edit-profile-form">
      <label htmlFor="name">Name: </label>
      <input
        type="text"
        name="name"
        value={userDetails.name}
        onChange={handleChange}
        required
      />
      <label htmlFor="email">Email: </label>
      <input
        type="email"
        name="email"
        value={userDetails.email}
        onChange={handleChange}
        disabled
      />
      <label htmlFor="role">Role: </label>
      <input
        type="text"
        name="role"
        value={userDetails.role}
        onChange={handleChange}
      />
      <label htmlFor="bio">Bio: </label>
      <textarea name="bio" value={userDetails.bio} onChange={handleChange} />
      <label htmlFor="image">Profile Image: </label>
      <input type="file" name="image"/>

      <button type="submit">Save Profile</button>
      <button type="button" onClick={handleEditProfileClick}>Cancel</button>
    </form>
  );

  return (
    <div className="profile">
      <BackButton />
      <div className="edit-profile">
        {!isEditProfileOpen ? (
          <>
            {renderUserProfile()}
            <button onClick={handleEditProfileClick}>Edit Profile</button>
          </>
        ) : (
          renderEditProfileForm()
        )}
      </div>
    </div>
  );
};

export default UserProfile;
