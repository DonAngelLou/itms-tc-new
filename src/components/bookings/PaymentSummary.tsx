// src/components/bookings/PaymentSummary.tsx
import React, { useEffect, useState } from 'react';
import { fetchPayments } from '@/lib/api'; // Import the mock fetchPayments function

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
    async function loadPayments() {
      try {
        const data = await fetchPayments(filterStatus); // Use the mock fetchPayments function
        setPayments(Array.isArray(data) ? data : []); // Ensure payments is always set to an array
      } catch (error) {
        console.error('Failed to fetch payments:', error);
      }
    }
    loadPayments();
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
