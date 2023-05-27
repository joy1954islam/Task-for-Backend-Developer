import React, { useState } from 'react';
import axios from 'axios';
import { ReactMultiEmail, isEmail } from 'react-multi-email';
import './App.css';
import { API_URL } from './API.js'

const EmailForm = () => {
  const [emails, setEmails] = useState([]);
  const [focused, setFocused] = React.useState(false);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [attachment, setAttachment] = useState(null);

  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const handleEmailChange = (emails) => {
    setEmails(emails);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', emails);
    formData.append('subject', subject);
    formData.append('body', body);

    if (attachment) {
      formData.append('attachment', attachment);
    }

    try {
      const res = await axios.post(API_URL + '/api/send-emails/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('res = ', res.data.message)
      alert('Emails sent successfully');
      // Clear the form inputs and attachment
      setEmails('');
      setSubject('');
      setBody('');
      setAttachment(null);
    } catch (error) {
      alert('An error occurred while sending emails');
      console.error(error);
    }
  };

  return (
  <div className='container mt-5'>

    <form onSubmit={handleSubmit}>
      <div className="form-group">
            <label>Email:</label>

      <ReactMultiEmail
        placeholder='Input your email'
        emails={emails}
        onChange={handleEmailChange}
        autoFocus={true}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        getLabel={(email, index, removeEmail) => {
          return (
            <div data-tag key={index}>
              <div data-tag-item>{email}</div>
              <span data-tag-handle onClick={() => removeEmail(index)}>
                ×
              </span>
            </div>
          );
        }}
      />
      </div>
      <div className="form-group">
        <label>Subject:</label>
        <input
          type="text"
          className="form-control"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Body:</label>
        <textarea
          className="form-control"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Attachment:</label>
        <input type="file" className="form-control-file" onChange={handleFileChange} />
      </div>
      <button type="submit" className="btn btn-primary">Send Emails</button>
    </form>
    </div>
  );
};


export default EmailForm;
