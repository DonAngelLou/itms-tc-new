// src/components/SupportRequestForm.tsx
import React, { useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';

export default function SupportRequestForm() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  async function submitSupportRequest() {
    try {
      await axiosInstance.post('/support-requests/', { subject, message });
      alert('Support request submitted successfully');
      setSubject('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting support request:', error);
    }
  }

  return (
    <div>
      <h4>Contact Support</h4>
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button onClick={submitSupportRequest}>Submit</button>
    </div>
  );
}
