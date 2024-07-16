import React, { useState, useEffect } from 'react';

const EmployeeList = ({ onEmployeeClick, searchTerm, expertiseTerm }) => {
  const [employees, setEmployees] = useState([]);
  const filteredEmployees = employees.filter((employee) => {
    const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) &&
      employee.expertise.toLowerCase().includes(expertiseTerm.toLowerCase())
    );
  });


  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true); // Set loading state to true 
    try {
      const response = await fetch(`/employees/search?searchTerm=${searchTerm}&expertiseTerm=${expertiseTerm}`);
      if (!response.ok) {
        throw new Error('Failed to fetch employees'); // Handle non-200 status codes
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error); // Log the error for debugging
    } finally {
      setIsLoading(false); // Set loading state to false (optional)
    }
  };

  useEffect(() => {
    if (searchTerm || expertiseTerm) {
      handleSearch();
    }
  }, [searchTerm, expertiseTerm]);

  return (
    <ul>
      {filteredEmployees.map((employee) => (
        <li key={employee.id}>
          <button onClick={() => onEmployeeClick(employee.id)}>
            {employee.firstName} {employee.lastName} - {employee.department} ({employee.location})
          </button>
        </li>
      ))}
    </ul>
  );
};

export default EmployeeList;
