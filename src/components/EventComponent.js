import React, { useState } from 'react';
import AddEventComponent from './AddEventComponent';
import EventCalendarComponent from './EventCalendarComponent';

const EventComponent = () => {
  const [events, setEvents] = useState([]);

  const handleEventAdd = (newEvent) => {
    setEvents([...events, newEvent]); 
  };

  return (
    <div>
      <AddEventComponent onEventAdd={handleEventAdd} />
      <EventCalendarComponent events={events} />
    </div>
  );
};

export default EventComponent;
