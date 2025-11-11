import React, { useState } from 'react';
import "./contact.css"
function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [messageError, setMessageError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setNameError('');
        setEmailError('');
        setMessageError('');

        let isValid = true;

        if (!name) {
            setNameError('Name is required.');
            isValid = false;
        }

        if (!email) {
            setEmailError('Email is required.');
            isValid = false;
        } else if (!isValidEmail(email)) {
            setEmailError('Invalid email format.');
            isValid = false;
        }

        if (!message) {
            setMessageError('Message is required.');
            isValid = false;
        }

        if (isValid) {
            // Simulate sending the message (replace with actual backend logic)
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Message:', message);

            setSuccessMessage('Thank you for your message!');
            setName('');
            setEmail('');
            setMessage('');
        }
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            <form onSubmit={handleSubmit} className="contact-form">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                <span className="error">{nameError}</span>

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <span className="error">{emailError}</span>

                <label htmlFor="message">Message:</label>
                <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows="4" required />
                <span className="error">{messageError}</span>

                <button type="submit">Submit</button>
                {successMessage && <p className="success-message">{successMessage}</p>}
            </form>
            
        </div>
    );
}

export default Contact;