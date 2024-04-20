import './emailform.css';
import React, { useState } from 'react';
import Cart from './cart';

function EmailForm() {
  const [formData, setFormData] = useState({
    userEmail: '',
    name: '',
    lastName: '',
    clientadrss: '',
    postalCode: '',
    city: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming you have a server-side API or library to send emails
    try {
      // Send an email to clientEmail and your own email address
      await sendEmail(formData.clientEmail, formData.userEmail, formData);
      alert('Email sent successfully!');
    } catch (error) {
      
      alert('Email sending failed.');
    }
  };

  // Replace this with your email sending code (e.g., using Nodemailer)
  const sendEmail = async (to, from, data) => {
    // Example: Send email using Fetch API to a server endpoint
    const response = await fetch('/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to, from, data }),
    });

    if (!response.ok) {
      throw new Error('Email sending failed');
    }
  };

  return (
  <div className="wrapper">
    <div className="email-form-container">
      <h2>commande validation</h2>
      <form onSubmit={handleSubmit} className="email-form">
        <div className="form-group">
          <label>Email: </label>
          <input
            type="email"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>LastName: </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>client address: </label>
          <input
            type="text"
            name="clientadrss"
            value={formData.clientadrss}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>postal code: </label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>City: </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>phoneNumber: </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
      </form>
    </div>
    <div className="two">
      <Cart className="form-group"></Cart>
      <div className="form-group">
          <button type="submit" >achat</button>
        </div>
    </div>
  </div>
  );
}

export default EmailForm;
