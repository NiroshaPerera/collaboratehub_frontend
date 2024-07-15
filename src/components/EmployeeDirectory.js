import React, { useState, useEffect } from 'react';
import EmployeeList from './EmployeeList';
import AddEmployeeForm from './AddEmployeeForm';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
import './EmployeeDirectory.css';

const EmployeeDirectory = () => {
  const [employees, setEmployees] = useState([]);
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expertiseTerm, setExpertiseTerm] = useState('');
  const navigate = useNavigate();

  // Fetch or populate employee data 
  useEffect(() => {
    const fetchEmployees = async () => {
      // Fetch employee data from API
      const response = await fetch('');
      const data = await response.json();
      setEmployees(data);
    };

    fetchEmployees();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleExpertiseSearch = (e) => {
    setExpertiseTerm(e.target.value);
  };

  

  
  const handleAddEmployee = async (newEmployee) => {
    try {
      const response = await fetch('http://backend-api-endpoint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEmployee),
      });

      if (!response.ok) {
        throw new Error(`Error adding employee: ${response.statusText}`);
      }

      const addedEmployee = await response.json(); 

      // Update employee data state with the added employee
      setEmployees([...employees, addedEmployee]);
      setShowAddEmployeeForm(false);

      console.log('Employee added successfully!');
     
    } catch (error) {
      console.error('Error adding employee:', error);
    
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

return (
  
  <div className="view-employees">
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
    <h2>Employee Directory</h2>
    <div className="controls">
    <div className="box1">
    <input type="text" placeholder="Search by Name" value={searchTerm} onChange={handleSearch} />
    </div>
    <div className="box2">
    <input type="text" placeholder="Search by Expertise" value={expertiseTerm} onChange={handleExpertiseSearch} />
    <EmployeeList employees={employees} searchTerm={searchTerm} expertiseTerm={expertiseTerm} />
    </div>
    </div>
    <div className="view-link">
        <Link to="/add-employee">Add Employee</Link>
        {showAddEmployeeForm && <AddEmployeeForm onSubmit={handleAddEmployee} />}
      </div>
  </div>
);
};

export default EmployeeDirectory;

