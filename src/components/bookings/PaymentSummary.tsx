// src/components/bookings/PaymentSummary.tsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';

interface Payment {
  id: number;
  booking_code: string;
  payment_status: string;
  passenger_name: string;
}

export default function PaymentSummary() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filterStatus, setFilterStatus] = useState('pending');

  useEffect(() => {
    async function fetchPayments() {
      try {
        // Ensure the correct endpoint path
        const response = await axiosInstance.get('/api/submit-payment/', { params: { status: filterStatus } });
        setPayments(response.data);
      } catch (error) {
        console.error('Failed to fetch payments:', error);
      }
    }
    fetchPayments();
  }, [filterStatus]);

  return (
    <div>
      <h3>Payment Summary</h3>
      <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
      <ul>
        {payments.map((payment) => (
          <li key={payment.id}>
            {payment.booking_code} - {payment.payment_status} - {payment.passenger_name}
          </li>
        ))}
      </ul>
    </div>
  );
}
