// src/components/BookingList.tsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import BookingDetail from '@/components/bookings/BookingDetail';

interface Booking {
  id: number;
  booking_code: string;
  status: string;
  payment_status: string;
  passenger_name?: string;
  trip: {
    destination: {
      name: string;
    };
    vehicle: {
      vehicle_type: string;
    };
  };
  created_at: string;
}

export default function BookingList() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [filters, setFilters] = useState({
    date: '',
    destination: '',
    status: '',
    paymentStatus: '',
    vehicleType: '',
    driver: ''
  });

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await axiosInstance.get('/bookings/', { params: filters });
        
        // Ensure response data is an array before setting it to avoid map errors
        if (Array.isArray(response.data)) {
          setBookings(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setBookings([]); // Default to an empty array if response is unexpected
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setBookings([]); // Default to an empty array on error
      }
    }
    fetchBookings();
  }, [filters]);

  return (
    <div>
      <h2>Bookings</h2>
      <input
        type="text"
        placeholder="Destination"
        value={filters.destination}
        onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
      />
      <input
        type="date"
        placeholder="Date"
        value={filters.date}
        onChange={(e) => setFilters({ ...filters, date: e.target.value })}
      />
      <select
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
      >
        <option value="">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="cancelled">Cancelled</option>
      </select>
      <select
        value={filters.paymentStatus}
        onChange={(e) => setFilters({ ...filters, paymentStatus: e.target.value })}
      >
        <option value="">All Payment Statuses</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id} onClick={() => setSelectedBooking(booking)}>
            {booking.booking_code} - {booking.status} - {booking.payment_status}
          </li>
        ))}
      </ul>
      {selectedBooking && <BookingDetail booking={selectedBooking} />}
    </div>
  );
}
