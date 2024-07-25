import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// UserContext with a method for updating users
export const UserContext = createContext(null); 

  
// UserProvider component with updateUser function
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch users from  data source 
  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('http://localhost:5000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data.user); 
      } catch (error) {
        console.error('Error fetching logged-in user:', error);
      }
    };
  
    fetchLoggedInUser();
  }, []);
  

  const addUser = (user) => {
    setUsers([...users, user]);
    // Store users in local storage 
    localStorage.setItem('users', JSON.stringify([...users, user]));
  };

  const removeUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
    // Update local storage 
    localStorage.setItem('users', JSON.stringify(users.filter((user) => user.id !== userId)));
  };
  const updateUser = (userId, updatedData) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return { ...user, ...updatedData };
      }
      return user;
    }));
  };
  

  return (
    <UserContext.Provider value={{ user, users, addUser, removeUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
