import React, { useState } from 'react';
import BackButton from './BackButton';
import './AddEmployeeForm.css';

const AddEmployeeForm = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [department, setDepartment] = useState('');
  const [expertise, setExpertise] = useState('');
  const [email, setEmail] = useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmployee = {
      firstName,
      lastName,
      department,
      expertise,
      email, 
    };
    onSubmit(newEmployee);
    // Clear form after submission
    setFirstName('');
    setLastName('');
    setDepartment('');
    setExpertise('');
    setEmail(''); 
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
