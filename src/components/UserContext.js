import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create UserContext with a method for updating users
export const UserContext = createContext({
  users: [],
  updateUser: () => {},
});

// UserProvider component with updateUser function
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  // Fetch users from  data source 
  useEffect(() => {
    const fetchUsers = async () => {
      const registeredUsers = [
        { id: 1, name: 'User 1', email: 'user1@example.com', role: 'Developer', bio: 'Bio of User 1' },
        { id: 2, name: 'User 2', email: 'user2@example.com', role: 'Manager', bio: 'Bio of User 2' },
        { id: 3, name: 'User 3', email: 'user3@example.com', role: 'Tester', bio: 'Bio of User 3' },
      ];
      setUsers(registeredUsers);
    };
    fetchUsers();
  }, []);

  // Function to update user data ( update logic)
  const updateUser = async (updatedUser) => {
    try {
      // Replace with your actual update logic (using a fetch API call)
      console.log('User updated:', updatedUser);
      const updatedUsers = users.map((user) => (user.id === updatedUser.id ? updatedUser : user));
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error updating user:', error);
      // Handle errors appropriately (display error message to user)
    }
  };
  

  return (
    <UserContext.Provider value={{ users, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
