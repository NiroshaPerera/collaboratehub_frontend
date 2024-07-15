import React from 'react';

const EmployeeList = ({ employees, onEmployeeClick, searchTerm, expertiseTerm }) => {
  const filteredEmployees = employees.filter((employee) => {
    const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) &&
      employee.expertise.toLowerCase().includes(expertiseTerm.toLowerCase())
    );
  });

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
