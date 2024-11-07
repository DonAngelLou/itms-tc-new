// src/components/RecentBookings.tsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';

interface Booking {
  id: number;
  bookingCode: string;
  passengerName: string;
  status: string;
}

export default function RecentBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    async function fetchRecentBookings() {
      try {
        const response = await axiosInstance.get('/bookings/recent/');
        setBookings(response.data.recent_bookings);
      } catch (error) {
        console.error('Failed to fetch recent bookings:', error);
      }
    }
    fetchRecentBookings();
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded-lg mb-6">
      <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id} className="border-b py-2">
            <p>Booking Code: {booking.bookingCode}</p>
            <p>Passenger: {booking.passengerName}</p>
            <p>Status: {booking.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
