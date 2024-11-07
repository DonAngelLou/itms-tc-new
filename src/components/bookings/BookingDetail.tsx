// src/components/bookings/BookingDetail.tsx
import React, { useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import PaymentStatusUpdate from '@/components/bookings/PaymentStatusUpdate';

interface BookingDetailProps {
  booking: {
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
  };
}

export default function BookingDetail({ booking }: BookingDetailProps) {
  const [status, setStatus] = useState(booking.status);

  async function updateStatus(newStatus: string) {
    try {
      await axiosInstance.patch(`/bookings/${booking.id}/update_status/`, { status: newStatus });
      setStatus(newStatus);
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  }

  return (
    <div>
      <h3>Booking Code: {booking.booking_code}</h3>
      <p>Status: {status}</p>
      <p>Payment Status: {booking.payment_status}</p>
      <p>Passenger: {booking.passenger_name}</p>
      <p>Destination: {booking.trip.destination.name}</p>
      <p>Vehicle Type: {booking.trip.vehicle.vehicle_type}</p>
      <button onClick={() => updateStatus('confirmed')}>Confirm</button>
      <button onClick={() => updateStatus('cancelled')}>Cancel</button>
      <PaymentStatusUpdate bookingId={booking.id} />
    </div>
  );
}
