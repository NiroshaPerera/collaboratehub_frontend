import React, { useState, useEffect} from 'react';
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

  const token = localStorage.getItem('jwtToken');

  // Fetch or populate employee data 
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/employees', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching employees');
        }

      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  fetchEmployees();
}, [token]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleExpertiseSearch = (e) => {
    setExpertiseTerm(e.target.value);
  };

  const handleAddEmployee = async (newEmployee) => {
    try {
      const response = await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}` 
           },
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
  const handleEmployeeClick = (employeeId) => {
    navigate(`/edit-employee/${employeeId}`); 
  };

  const handleUpdateEmployee = (employeeId) => {
    navigate(`/edit-employee/${employeeId}`);
  };

  const handleDeleteEmployee = async (employeeId) => {
    if (window.confirm(`Are you sure you want to delete employee ${employeeId}?`)) {
      try {
        const response = await fetch(`http://localhost:5000/api/employees/${employeeId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
  
        if (!response.ok) {
          throw new Error(`Error deleting employee: ${response.statusText}`);
        }
  
        // Update employee data state after successful deletion
        setEmployees(employees.filter((employee) => employee.id !== employeeId));
        console.log('Employee deleted successfully!');
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const triggerSearch = async () => {
    if (!searchTerm || !expertiseTerm) {
      console.warn('Please enter both search terms (name and expertise)');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/employees/search?searchTerm=${searchTerm}&expertiseTerm=${expertiseTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      if (!response.ok) {
        throw new Error(`Error searching employees: ${response.statusText}`);
      }
  
      const filteredEmployees = await response.json();
  
      // Update EmployeeList component with fetched data
      setEmployees(filteredEmployees);
  
    } catch (error) {
      console.error('Error searching employees:', error);
    }
  };
  

  const handleLogout = () => {
    navigate('/');
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
    <button onClick={triggerSearch}>Search</button> 
        <EmployeeList
          employees={employees}
          searchTerm={searchTerm}
          expertiseTerm={expertiseTerm}
          onEmployeeClick={handleEmployeeClick}
          onUpdateEmployee={handleUpdateEmployee}
          onDeleteEmployee={handleDeleteEmployee}
        />
    </div>
    <div className="view-link">
        <Link to="/add-employee">Add Employee</Link>
        {showAddEmployeeForm && <AddEmployeeForm onSubmit={handleAddEmployee} />}
      </div>
  </div>
);
};

export default EmployeeDirectory;

