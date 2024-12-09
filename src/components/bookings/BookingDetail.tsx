// src/components/bookings/BookingDetail.tsx
import React from "react";
import { Booking } from "@/context/BookingContext";

interface BookingDetailProps {
  booking: Booking;
}

const BookingDetail: React.FC<BookingDetailProps> = ({ booking }) => {
  return (
    <div className="p-4 mt-2 bg-gray-600 rounded-md shadow-md text-white">
      <h4 className="text-lg font-semibold">Booking Details</h4>
      <p>Passenger Name: {booking.passengerName}</p>
      <p>Destination: {booking.destination}</p>
      <p>Date: {booking.date}</p>
      <p>Vehicle Type: {booking.vehicleType}</p>
      <p>Status: {booking.status}</p>
      <p>Fare: ${booking.fare}</p>
    </div>
  );
};

export default BookingDetail;
