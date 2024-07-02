import React, { useState } from 'react';
import './Contact.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting form:', { name, email, message });
    setSubmitted(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'message':
        setMessage(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
        <h1>Contact Us</h1>
        <div className="form">
    <form onSubmit={handleSubmit}>
        
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message:</label>
        <textarea
          name="message"
          id="message"
          rows="5"
          value={message}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" disabled={submitted}>
        Submit
      </button>
      {submitted && <p>Thanks for your message!</p>}
    </form>
    </div>
    </div>
    
  );
};

export default ContactForm;
