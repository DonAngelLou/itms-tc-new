// src/components/trips/TripForm.tsx
import React, { useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';

interface TripFormProps {
  trip?: { id: number; destination: string; vehicle: string; driver: string; departure_time: string; fare: number };
  onSubmit: () => void;
}

export default function TripForm({ trip, onSubmit }: TripFormProps) {
  const [formData, setFormData] = useState({
    destination: trip?.destination || '',
    vehicle: trip?.vehicle || '',
    driver: trip?.driver || '',
    departure_time: trip?.departure_time || '',
    fare: trip?.fare || 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (trip) {
        await axiosInstance.patch(`/trips/${trip.id}/`, formData);
      } else {
        await axiosInstance.post('/trips/', formData);
      }
      onSubmit();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Destination:
        <input type="text" name="destination" value={formData.destination} onChange={handleChange} />
      </label>
      <label>
        Vehicle:
        <input type="text" name="vehicle" value={formData.vehicle} onChange={handleChange} />
      </label>
      <label>
        Driver:
        <input type="text" name="driver" value={formData.driver} onChange={handleChange} />
      </label>
      <label>
        Departure Time:
        <input type="datetime-local" name="departure_time" value={formData.departure_time} onChange={handleChange} />
      </label>
      <label>
        Fare:
        <input type="number" name="fare" value={formData.fare} onChange={handleChange} />
      </label>
      <button type="submit">{trip ? 'Update Trip' : 'Create Trip'}</button>
    </form>
  );
}
