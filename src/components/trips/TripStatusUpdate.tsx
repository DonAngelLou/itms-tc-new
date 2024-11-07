// src/components/trips/TripStatusUpdate.tsx
import React, { useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';

interface TripStatusUpdateProps {
  tripId: number;
  currentStatus: string;
}

export default function TripStatusUpdate({ tripId, currentStatus }: TripStatusUpdateProps) {
  const [status, setStatus] = useState(currentStatus);

  const handleStatusChange = async (newStatus: string) => {
    try {
      await axiosInstance.patch(`/trips/${tripId}/update_status/`, { status: newStatus });
      setStatus(newStatus);
      alert(`Trip status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div>
      <p>Update Status:</p>
      <button onClick={() => handleStatusChange('departed')}>Mark as Departed</button>
      <button onClick={() => handleStatusChange('arrived')}>Mark as Arrived</button>
    </div>
  );
}
