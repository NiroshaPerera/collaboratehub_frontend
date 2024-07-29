import React, { useState, useEffect, useCallback } from 'react';

const EmployeeList = ({ onEmployeeClick, searchTerm, expertiseTerm, onUpdateEmployee, onDeleteEmployee }) => {
  const [employees, setEmployees] = useState([]);
  const filteredEmployees = employees.filter((employee) => {
  
    return employee.firstName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/employees/search?searchTerm=${searchTerm}&expertiseTerm=${expertiseTerm}`);
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, expertiseTerm]);

  useEffect(() => {
    if (searchTerm || expertiseTerm) {
      handleSearch();
    }
  }, [searchTerm, expertiseTerm]);
  

  return (
    <ul>
      {isLoading ? (
        <li>Loading employees...</li>
      ) : (
        filteredEmployees.map((employee) => (
          <li key={employee.id}>
            <button onClick={() => onEmployeeClick(employee.id)}>
              {employee.firstName} {employee.lastName} - {employee.department} ({employee.location})
            </button>
            <button onClick={() => onUpdateEmployee(employee.id)}>Update</button>
            <button onClick={() => onDeleteEmployee(employee.id)}>Delete</button>
          </li>
        ))
      )}
    </ul>
  );
};

export default EmployeeList;
