import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faDesktop, faDollarSign, faUserTie } from '@fortawesome/free-solid-svg-icons';
import BackButton from './BackButton';
import './EventCalendarPage.css';

const EventCalendarPage = () => {
  const navigate = useNavigate();

  const handleDepartmentClick = (department) => {
    navigate(`/event-calendar/${department}`);
  };

  return (
    <div className="department-selection">
       <BackButton />
     <h2>Select a department to view & add the events</h2>
      <div className="departments">
      <div className="department" onClick={() => handleDepartmentClick('Engineering')}><FontAwesomeIcon icon={faCog} />Engineering</div>
        <div className="department" onClick={() => handleDepartmentClick('Marketing')}><FontAwesomeIcon icon={faDollarSign} />Marketing</div>
        <div className="department" onClick={() => handleDepartmentClick('IT')}><FontAwesomeIcon icon={faDesktop} />IT Software</div>
        <div className="department" onClick={() => handleDepartmentClick('HR')}><FontAwesomeIcon icon={faUserTie} />HR</div>
      </div>
    </div>
  );
};

export default EventCalendarPage;

