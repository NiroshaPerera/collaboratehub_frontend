import React, { useState } from 'react';
import BackButton from './BackButton';
import './TaskManagementComponent.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TaskManagementComponent = ({ addTask }) => {
 
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [assignee, setAssignee] = useState('');
  const [priority, setPriority] = useState('Medium');
 
  

  const handleAddTask = async () => {
    if (taskName && description && deadline && assignee && priority) {
      const newTask = {
        id: Date.now(),
        name: taskName,
        description,
        deadline,
        assignee,
        priority,
        status: 'Pending',
      };
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.post('http://localhost:5000/api/tasks', newTask, {
          headers: { Authorization: `Bearer ${token}` },
        });
      addTask(response.data);
      setTaskName('');
      setDescription('');
      setDeadline('');
      setAssignee('');
      setPriority('Medium');
      alert('Task added successfully');
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Failed to add task. Please try again.');
    }
    }  else {
    alert('Please fill in all fields');
  }
};


  return (
    <div className="task-management">
     <BackButton />
      <div className="task-creation-form">
        <h3>Create a New Task</h3>
        <input
          type="text"
          placeholder="Task"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          placeholder="Deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <input
          type="text"
          placeholder="Assignee"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button onClick={handleAddTask}>Add Task</button>
     
      <div className="view-link">
        <Link to="/view-tasks">View Tasks</Link>
      </div>
      </div>
    </div>
  );
};

export default TaskManagementComponent;