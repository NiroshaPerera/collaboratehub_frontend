import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
import './TaskListComponent.css';
import { TaskContext } from './TaskContext';

const TaskListComponent = () => {
  const { tasks,  updateTaskStatus, deleteTask } = useContext(TaskContext);
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortOption, setSortOption] = useState('Date');
  const navigate  = useNavigate();


  const filterTasks = (tasks) => {
    if (filterStatus === 'All') return tasks;
    return tasks.filter(task => task.status === filterStatus);
  };

  const sortTasks = (tasks) => {
    if (sortOption === 'Date') {
      return tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    } else if (sortOption === 'Priority') {
      const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
      return tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }
    return tasks;
  };

  const filteredAndSortedTasks = sortTasks(filterTasks(tasks));

  const getTaskDeadlineStatus = (deadline) => {
    const today = new Date();
    const taskDeadline = new Date(deadline);
    const timeDiff = taskDeadline - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff < 0) return 'overdue';
    if (daysDiff <= 3) return 'due-soon';
    return 'on-track';
  };

  useEffect(() => {
    const checkDeadlines = () => {
      const today = new Date();
      tasks.forEach(task => {
        const taskDeadline = new Date(task.deadline);
        const timeDiff = taskDeadline - today;
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (daysDiff === 1) {
          alert(`Reminder: The task "${task.name}" is due tomorrow!`);
        } else if (daysDiff === 0) {
          alert(`Reminder: The task "${task.name}" is due today!`);
        } else if (daysDiff < 0 && task.status !== 'Completed') {
          alert(`Reminder: The task "${task.name}" is overdue!`);
        }
      });
    };

    checkDeadlines();
    const interval = setInterval(checkDeadlines, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [tasks]);


  const handleLogout = () => {
    navigate('/login');
};

  return (
    <div className="view-tasks">
       <header className="header">
       <div className="logo">CollaborateHub</div>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </li>
          </ul>
        </nav>
      </header>
      <BackButton />
      <div className="task-filter-sort">
        <div>
          <label>Status</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label>Sort By</label>
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="Date">Date</option>
            <option value="Priority">Priority</option>
          </select>
        </div>
      </div>
      <div className="task-list">
        <ul>
          {filteredAndSortedTasks.map(task => (
            <li key={task.id} className={`task-item ${task.status.toLowerCase()}`}>
              <h4>{task.name}</h4>
              <p>{task.description}</p>
              <p><strong>Deadline:</strong> {task.deadline}</p>
              <p><strong>Assignee:</strong> {task.assignee}</p>
              <p><strong>Priority:</strong> {task.priority}</p>
              <p><strong>Status:</strong> {task.status}</p>
              <button onClick={() => updateTaskStatus(task.id, 'Pending')}>Pending</button>
              <button onClick={() => updateTaskStatus(task.id, 'In Progress')}>In Progress</button>
              <button onClick={() => updateTaskStatus(task.id, 'Completed')}>Completed</button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskListComponent;