import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        }); 
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', task, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/tasks/${taskId}`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedTask = response.data;

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };


  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };


  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTaskStatus, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};