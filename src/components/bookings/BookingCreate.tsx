// src/components/BookingCreate.tsx
import React, { useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';

export default function BookingCreate() {
  const [tripId, setTripId] = useState('');
  const [passengerName, setPassengerName] = useState('');

  async function createBooking() {
    try {
      await axiosInstance.post('/bookings/', { trip: tripId, passenger_name: passengerName });
      alert('Booking created successfully');
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  }

  return (
    <div>
      <h2>Create Booking</h2>
      <input
        type="text"
        placeholder="Trip ID"
        value={tripId}
        onChange={(e) => setTripId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Passenger Name"
        value={passengerName}
        onChange={(e) => setPassengerName(e.target.value)}
      />
      <button onClick={createBooking}>Create Booking</button>
    </div>
  );
}
