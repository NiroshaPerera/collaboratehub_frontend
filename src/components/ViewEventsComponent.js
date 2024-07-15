import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faChevronRight  } from '@fortawesome/free-solid-svg-icons';
import BackButton from './BackButton';
import './ViewEventsComponent.css';
import { format } from 'date-fns';

const ViewEventsComponent = ({ events }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [responses, setResponses] = useState({});
  const navigate = useNavigate();

  const handleEventClick = (event) => {
    setCurrentEvent(event);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentEvent(null);
  };

  const handleResponse = (eventId, response) => {
    setResponses(prevResponses => ({ ...prevResponses, [eventId]: response }));
 if (response === 'accepted') {
  alert('Event participation confirmed!');
 } else if (response === 'declined') {
  const reason = prompt('Please provide the reason for declining');
  alert(`Event declined: ${reason}`);
 }
};

  const setReminder = (eventId) => {
    const event = events.find(event => event.id === eventId);
    if (event) {
      const reminderTime = new Date(event.date).getTime() - 30 * 60 * 1000;
      const reminder = {
        eventId,
        time: reminderTime
      };
      setReminders([...reminders, reminder]);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      reminders.forEach(reminder => {
        if (now >= reminder.time) {
          alert('Reminder for event: ' + events.find(event => event.id === reminder.eventId).title);
          setReminders(reminders.filter(r => r !== reminder));
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [reminders, events]);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="view-events">
      
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
      <div className="event-list">
        <ul>
          {events.map(event => (
            <li key={event.id} onClick={() => handleEventClick(event)}>
             <FontAwesomeIcon icon={faCalendar} />  {event.title} - {event.department}<FontAwesomeIcon icon={faChevronRight} />
            </li>
          ))}
        </ul>
      </div>

      {showModal && currentEvent && (
        <div className="event-modal">
          <div className="event-modal-content">
            <h3>{currentEvent.title}</h3>
            <p>{currentEvent.description}</p>
            <p><strong>Department:</strong> {currentEvent.department}</p>
            <p><strong>Date:</strong> {format(new Date(currentEvent.date), 'Pp')}</p>
            <p>Your response: {responses[currentEvent.id] || 'Not Responded'}</p>
            <button onClick={() => handleResponse(currentEvent.id, 'accepted')}>Accept</button>
            <button onClick={() => handleResponse(currentEvent.id, 'declined')}>Decline</button>
            <button onClick={() => setReminder(currentEvent.id)}>Set Reminder</button>
            <button onClick={handleModalClose}>Close</button>
          </div>
        </div>
      )}
      

    </div>
  );
};

export default ViewEventsComponent;
