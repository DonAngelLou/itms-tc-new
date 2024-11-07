// src/components/bookings/PaymentStatusUpdate.tsx
import React, { useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';

interface PaymentStatusUpdateProps {
  bookingId: number;
}

export default function PaymentStatusUpdate({ bookingId }: PaymentStatusUpdateProps) {
  const [paymentStatus, setPaymentStatus] = useState('pending');

  async function handlePaymentStatusUpdate(newStatus: string) {
    try {
      await axiosInstance.patch(`/bookings/${bookingId}/update_payment_status/`, { status: newStatus });
      setPaymentStatus(newStatus);
    } catch (error) {
      console.error('Failed to update payment status:', error);
    }
  }

  return (
    <div>
      <h4>Update Payment Status</h4>
      <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
      <button onClick={() => handlePaymentStatusUpdate(paymentStatus)}>Update Payment Status</button>
    </div>
  );
}
