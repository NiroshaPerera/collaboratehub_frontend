import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import UserProfile from './components/UserProfile';
import Dashboard from './components/Dashboard';
import DocumentSharingComponent from './components/DocumentSharingComponent';
import TaskManagementComponent from './components/TaskManagementComponent';
import EventCalendarComponent from './components/EventCalendarComponent';
import DepartmentSelectionPage from './components/DepartmentSelectionPage';
import EventCalendarPage from './components/EventCalendarPage';
import DocumentListComponent from './components/DocumentListComponent';
import AddEventComponent from './components/AddEventComponent';
import ViewEventsComponent from './components/ViewEventsComponent';
import DepartmentSelectComponent from './components/DepartmentSelectComponent';
import TaskListComponent from './components/TaskListComponent';
import { TaskProvider } from './components/TaskContext';
import { UserProvider } from './components/UserContext';
import EmployeeDirectory from './components/EmployeeDirectory';
import EmployeeDirectoryComponent from './components/EmployeeDirectoryComponent';
import AddEmployeeForm from './components/AddEmployeeForm';

const isAuthenticated = () => {
  return true; // For demo purposes, always return true
};

const App = () => {
  const [documents, setDocuments] = useState([]);
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const currentUserId = 'currentUserId'; // Replace with actual current user ID
  
  const addDocument = (doc) => {
    setDocuments(prevDocuments => [...prevDocuments, doc]);
  };

  const addEvent = (event) => {
    setEvents(prevEvents => [...prevEvents, event]);
  };

  const addTask = (task) => {
    setTasks(prevTasks => [...prevTasks, task]);
  };

  const addEmployee = (employee) => {
    setEmployees(prevEmployees => [...prevEmployees, employee]);
  };

  
  
  return (
    <TaskProvider value={{ tasks, addTask }}>
      <UserProvider>
     
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          
          <Route path="/profile/:userId" element={<UserProfile />} /> 
          <Route
            path="/dashboard/*"
            element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
          />
         
          <Route path="/dashboard/document-sharing" element={isAuthenticated() ? <DepartmentSelectionPage /> : <Navigate to="/login" />} />
          <Route path="/dashboard/event-calendar" element={isAuthenticated() ? <EventCalendarPage /> : <Navigate to="/login" />} />
          <Route path="/dashboard/task-management" element={isAuthenticated() ? <DepartmentSelectComponent /> : <Navigate to="/login" />} />
          <Route path="/dashboard/employee-directory" element={isAuthenticated() ? <EmployeeDirectoryComponent /> : <Navigate to="/login" />} />
          <Route path="/document-sharing/:department" element={isAuthenticated() ? <DocumentSharingComponent addDocument={addDocument} currentUserId={currentUserId} /> : <Navigate to="/login" />} />
          <Route path="/view-documents" element={isAuthenticated() ? <DocumentListComponent documents={documents} currentUserId={currentUserId} /> : <Navigate to="/login" />} />
          <Route path="/event-calendar/:department" element={isAuthenticated() ? <EventCalendarComponent /> : <Navigate to="/login" />} />
          <Route path="/add-event/:department" element={isAuthenticated() ? <AddEventComponent addEvent={addEvent} /> : <Navigate to="/login" />} />
          <Route path="/view-events" element={isAuthenticated() ? <ViewEventsComponent events={events} /> : <Navigate to="/login" />} />
          <Route path="/task-management/:department"  element={isAuthenticated() ? <TaskManagementComponent addTask={addTask} /> : <Navigate to="/login" />} />
          <Route path="/view-tasks" element={isAuthenticated() ? <TaskListComponent /> : <Navigate to="/login" />} />
          <Route path="/employee-directory/:department" element={isAuthenticated() ?<EmployeeDirectory addEmployee={addEmployee}/> : <Navigate to="/login" />} />
          <Route path="/add-employee" element={isAuthenticated() ? <AddEmployeeForm /> : <Navigate to="/login" />} />
        </Routes>
       
      </Router>
     
      </UserProvider>
    </TaskProvider>
  );
};

export default App;
