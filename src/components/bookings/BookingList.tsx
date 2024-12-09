// src/components/bookings/BookingList.tsx
import React from "react";
import { useBookingContext, Booking } from "@/context/BookingContext";
import BookingDetail from "./BookingDetail";

const BookingList: React.FC = () => {
  const { bookings } = useBookingContext();

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-white mb-4">Booking List</h3>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
};

const BookingCard: React.FC<{ booking: Booking }> = ({ booking }) => {
  return (
    <div className="p-4 bg-gray-700 rounded-md shadow-md">
      <p className="text-white">Code: {booking.bookingCode}</p>
      <p className="text-white">Passenger: {booking.passengerName}</p>
      <p className="text-white">Destination: {booking.destination}</p>
      <p className="text-white">Status: {booking.status}</p>
      <BookingDetail booking={booking} />
    </div>
  );
};

export default BookingList;
