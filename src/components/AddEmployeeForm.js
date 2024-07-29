import React, { useState } from 'react';
import BackButton from './BackButton';
import './AddEmployeeForm.css';

const AddEmployeeForm = ({}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [department, setDepartment] = useState('');
  const [expertise, setExpertise] = useState('');
  const [email, setEmail] = useState(''); 
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEmployee = {
      id: Date.now(),
      firstName,
      lastName,
      department,
      expertise,
      email, 
    };

    const token = localStorage.getItem('jwtToken');
    
    try {
      const response = await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
         },
        body: JSON.stringify(newEmployee),
      });

      if (!response.ok) {
        throw new Error('Error adding employee');
      }

      // Handle successful submission 
      console.log('Employee added successfully');
      alert('Employee added successfully!');
      // Reset form fields or navigate to employee list
    } catch (error) {
      setErrorMessage('Error adding employee. Please try again.');
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div className="add-employee">
       <BackButton />
    <form onSubmit={handleSubmit}>
      <h2>Add Employee</h2>
      <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
      <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      <input type="text" placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} required />
      <input type="text" placeholder="Expertise" value={expertise} onChange={(e) => setExpertise(e.target.value)} required />
      <input type="email" placeholder="Email (optional)" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">Add Employee</button>
    </form>
    </div>
  );
};

export default AddEmployeeForm;
