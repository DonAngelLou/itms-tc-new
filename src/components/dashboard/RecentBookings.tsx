// RecentBookings.tsx
import React from "react";

interface Booking {
  id: string;
  bookingCode: string;
  passengerName: string;
  status: string;
}

interface RecentBookingsProps {
  bookings: Booking[];
}

const RecentBookings: React.FC<RecentBookingsProps> = ({ bookings }) => {
  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-100 mb-4">Recent Bookings</h3>
      <table className="w-full text-gray-100">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-border">Booking Code</th>
            <th className="py-2 px-4 border-b border-border">Passenger Name</th>
            <th className="py-2 px-4 border-b border-border">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-gray-700">
              <td className="py-2 px-4 border-b border-border">{booking.bookingCode}</td>
              <td className="py-2 px-4 border-b border-border">{booking.passengerName}</td>
              <td className="py-2 px-4 border-b border-border">{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentBookings;
