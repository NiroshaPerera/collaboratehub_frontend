import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Registration from './components/Registration';
import UserProfile from './components/UserProfile';
import Dashboard from './components/Dashboard';
import DocumentSharingComponent from './components/DocumentSharingComponent';
import TaskManagementComponent from './components/TaskManagementComponent';
import DepartmentalForumsComponent from './components/DepartmentalForumsComponent';
import EventCalendarComponent from './components/EventCalendarComponent';
import ForumDetailComponent from './components/ForumDetailComponent';
import DepartmentSelectionPage from './components/DepartmentSelectionPage';
import EventCalendarPage from './components/EventCalendarPage';
import DocumentListComponent from './components/DocumentListComponent';
import AddEventComponent from './components/AddEventComponent';
import ViewEventsComponent from './components/ViewEventsComponent';
import DepartmentSelectComponent from './components/DepartmentSelectComponent';
import TaskListComponent from './components/TaskListComponent';
import { TaskProvider } from './components/TaskContext';
import { UserProvider } from './components/UserContext';


const isAuthenticated = () => {
  return true; // For demo purposes, always return true
};

const App = () => {
  const [forums, setForums] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
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

  useEffect(() => {
    const fetchForums = async () => {
      const data = [
        { id: 1, name: 'Engineering', posts: [{ id: 1, user: 'EID1', content: 'Welcome to the Engineering forum!'}] },
        { id: 2, name: 'Marketing', posts: [{ id: 1, user: 'MID1', content: 'Welcome to the Marketing forum!' }] },
        { id: 3, name: 'IT Software', posts: [{ id: 1, user: 'IID1', content: 'Welcome to the IT Software forum!' }] },
        { id: 4, name: 'HR', posts: [{ id: 1, user: 'HID1', content: 'Welcome to the HR forum!' }] }
      ];
      setForums(data);
    };

    fetchForums();
  }, []);

  const handleNewPost = (forumId, newPost) => {
    setForums((prevForums) =>
      prevForums.map((forum) =>
        forum.id === forumId
          ? { ...forum, posts: [...forum.posts, newPost] }
          : forum
      )
    );
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
         
       
          <Route path="/dashboard/departmental-forums" element={isAuthenticated() ? <DepartmentalForumsComponent /> : <Navigate to="/login" />} />
          <Route path="/dashboard/document-sharing" element={isAuthenticated() ? <DepartmentSelectionPage /> : <Navigate to="/login" />} />
          <Route path="/dashboard/event-calendar" element={isAuthenticated() ? <EventCalendarPage /> : <Navigate to="/login" />} />
          <Route path="/dashboard/task-management" element={isAuthenticated() ? <DepartmentSelectComponent /> : <Navigate to="/login" />} />
          <Route path="/departmental-forums/:forumId" element={isAuthenticated() ? <ForumDetailComponent forums={forums} handleNewPost={handleNewPost} /> : <Navigate to="/login" />} />
          <Route path="/document-sharing/:department" element={isAuthenticated() ? <DocumentSharingComponent addDocument={addDocument} currentUserId={currentUserId} /> : <Navigate to="/login" />} />
          <Route path="/view-documents" element={isAuthenticated() ? <DocumentListComponent documents={documents} currentUserId={currentUserId} /> : <Navigate to="/login" />} />
          <Route path="/event-calendar/:department" element={isAuthenticated() ? <EventCalendarComponent /> : <Navigate to="/login" />} />
          <Route path="/add-event/:department" element={isAuthenticated() ? <AddEventComponent addEvent={addEvent} /> : <Navigate to="/login" />} />
          <Route path="/view-events" element={isAuthenticated() ? <ViewEventsComponent events={events} /> : <Navigate to="/login" />} />
          <Route path="/task-management/:department"  element={isAuthenticated() ? <TaskManagementComponent addTask={addTask} /> : <Navigate to="/login" />} />
          <Route path="/view-tasks" element={isAuthenticated() ? <TaskListComponent /> : <Navigate to="/login" />} />
        </Routes>
       
      </Router>
     
      </UserProvider>
    </TaskProvider>
  );
};

export default App;
