import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from './UserContext';
import BackButton from './BackButton';
import './UserProfile.css';

const UserProfile = () => {
  const { user } = useContext(UserContext);

  // State for editing profile details 
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || '',
    bio: user?.bio || '',
    imagePreview: user?.image || '', 
  });

 
  const handleEditProfileClick = () => {
    setIsEditProfileOpen(!isEditProfileOpen);
  };

  const handleChange = (event) => {
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
  };

  
  // Functionality for saving profile 
  const handleSaveProfile = () => {
    // updating user details
    console.log('Profile details updated (simulated):', userDetails);
    setIsEditProfileOpen(false);
    alert('Profile updated successfully (simulated)');
  };

  const renderUserProfile = () => (
    <div className="user-profile">
      <h2>{userDetails.name}</h2>
      <p><strong>Email:</strong> {userDetails.email}</p>
      <p><strong>Role:</strong> {userDetails.role}</p>
      <p><strong>Bio:</strong> {userDetails.bio}</p>
      {userDetails.imagePreview && <img src={userDetails.imagePreview} alt="Profile Picture" />}
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
      <input type="file" name="image" disabled /> 
     
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
