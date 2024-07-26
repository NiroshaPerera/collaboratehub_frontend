import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import BackButton from './BackButton';
import './EventCalendarComponent.css';
import axios from 'axios';

const EventCalendarComponent = () => {
  const { department } = useParams();
  const navigate = useNavigate(); 
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [responses, setResponses] = useState({});

 const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get(`http://localhost:5000/api/events?department=${department}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
  
    useEffect(() => {
      fetchEvents();
    }, [department]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleEventClick = (event) => {
    setCurrentEvent(event);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentEvent(null);
  };

  const handleResponse = async (eventId, response) => { 
    try {
      await axios.put(`http://localhost:5000/api/events/${eventId}/respond`, { response }); 
      setResponses(prevResponses => ({ ...prevResponses, [eventId]: response }));
    } catch (error) {
      console.error('Error updating event response:', error);
    }
  };

  const setReminder = (eventId) => {
    const reminder = {
      eventId,
      time: new Date().getTime() + 60000
    };
    setReminders([...reminders, reminder]);
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

  const eventsForSelectedDate = events.filter(event => 
    new Date(event.date).toDateString() === selectedDate.toDateString()
  );

 

 return (
    <div className="event-calendar">
      <BackButton />
      <Calendar onChange={handleDateChange} value={selectedDate} />
     
      <div className="event-list">
        <h3>Events on {selectedDate.toDateString()}</h3>
        <ul>
          {eventsForSelectedDate.map(event => (
            <li key={event.id} onClick={() => handleEventClick(event)}>
              {event.title} - {event.department}
            </li>
          ))}
        </ul>
        <button onClick={() => navigate(`/add-event/${department}`)}>Add Event</button>
      </div>
     

      {showModal && currentEvent && (
        <div className="event-modal">
          <div className="event-modal-content">
            <h3>{currentEvent.title}</h3>
            <p>{currentEvent.description}</p>
            <p><strong>Department:</strong> {currentEvent.department}</p>
            {responses[currentEvent.id] && (
        <p>Your response: {responses[currentEvent.id]}</p>
      )}

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

export default EventCalendarComponent;
