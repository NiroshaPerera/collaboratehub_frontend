
import React from 'react';
import BackButton from './BackButton';
import './EventListPage.css';

const EventListPage = ({ events }) => {
  return (
    <div className="event-list-container">
       <BackButton />
      <h2>Event List</h2>
      <ul className="event-list">
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.title}</strong> - {event.date} - {event.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventListPage;
