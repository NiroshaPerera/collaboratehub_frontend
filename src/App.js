import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Home from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login';
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
import DocumentManagement from './components/DocumentManagement';


import axios from 'axios'; 



const isAuthenticated = async () => {
  try {
    // Retrieve token from local storage
    const token = localStorage.getItem('jwtToken');

    // Check if token exists
    if (!token) {
      return false;
    }

    // Verify token using backend API
    const verificationResponse = await axios.get('http://localhost:5000/api/auth/verify', {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Check for successful verification response
    if (verificationResponse.data.success) {
      return true;
    } else {
      console.error('Token verification failed:', verificationResponse.data.message);
      // Handle expired or invalid token 
      localStorage.removeItem('jwtToken');
      return false;
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    return false;
  }
};

const App = () => {
  const [documents, setDocuments] = useState([]);
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const currentUserId = 'currentUserId'; 
  
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
     
      <Router >
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
          <Route path="/document-sharing/:department"element={isAuthenticated() ? ( <DocumentManagement addDocument={setDocuments} />  ) : (<Navigate to="/login" />  )}/>

          <Route path="/view-documents" element={isAuthenticated() ? <DocumentListComponent documents={documents} currentUserId={currentUserId} /> : <Navigate to="/login" />} />
          <Route path="/event-calendar/:department" element={isAuthenticated() ? <EventCalendarComponent /> : <Navigate to="/login" />} />
          <Route path="/add-event/:department" element={isAuthenticated() ? <AddEventComponent addEvent={addEvent} /> : <Navigate to="/login" />} />
          <Route path="/view-events" element={isAuthenticated() ? <ViewEventsComponent events={events} /> : <Navigate to="/login" />} />
          <Route path="/task-management/:department"  element={isAuthenticated() ? <TaskManagementComponent addTask={addTask} /> : <Navigate to="/login" />} />
          <Route path="/view-tasks" element={isAuthenticated() ? <TaskListComponent /> : <Navigate to="/login" />} />
          <Route path="/employee-directory/:department" element={isAuthenticated() ?<EmployeeDirectory employees={employees}/> : <Navigate to="/login" />} />
          <Route path="/add-employee" element={isAuthenticated() ? <AddEmployeeForm addEmployee={addEmployee}/> : <Navigate to="/login" />} />
        </Routes>
       
      </Router>
     
      </UserProvider>
    </TaskProvider>
  );
};

export default App;