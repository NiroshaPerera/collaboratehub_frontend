import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
import './AddEventComponent.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AddEventComponent = ({ addEvent }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
 

    const newEvent = {
      id: Date.now(),
      title,
      description,
      department,
      date: new Date(`${date}T${time}`).toISOString(), 
    };

    addEvent(newEvent);
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.post('http://localhost:5000/api/events', newEvent, {
        headers: { Authorization: `Bearer ${token}` }, 
      });
      console.log('Event created successfully:', response.data);
      navigate('/view-events');
    } catch (error) {
      console.error('Error creating event:', error);

    }
  };
  return (
    <div className="add-event">
       <BackButton />
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <label>
          Department:
          <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} required />
        </label>
        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
        <label>
          Time:
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        </label>
        <button type="submit">Add Event</button>
        <div className="view-link">
        <Link to="/view-events">View Events</Link>
      </div>
      </form>
    </div>
  );
};

export default AddEventComponent;
