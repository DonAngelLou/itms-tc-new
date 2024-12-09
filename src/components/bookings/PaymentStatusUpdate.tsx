// src/components/bookings/PaymentStatusUpdate.tsx
import React from "react";
import { useBookingContext } from "@/context/BookingContext";

interface PaymentStatusUpdateProps {
  bookingId: string;
}

const PaymentStatusUpdate: React.FC<PaymentStatusUpdateProps> = ({ bookingId }) => {
  const { updateBookingStatus } = useBookingContext();

  const handleStatusChange = (status: "confirmed" | "pending" | "cancelled") => {
    updateBookingStatus(bookingId, status);
  };

  return (
    <div className="p-4 bg-gray-700 rounded-md mt-2 text-white">
      <h4 className="text-lg">Update Status</h4>
      <button
        onClick={() => handleStatusChange("confirmed")}
        className="bg-green-600 text-white p-2 rounded-md mr-2"
      >
        Confirm
      </button>
      <button
        onClick={() => handleStatusChange("pending")}
        className="bg-yellow-600 text-white p-2 rounded-md mr-2"
      >
        Pending
      </button>
      <button
        onClick={() => handleStatusChange("cancelled")}
        className="bg-red-600 text-white p-2 rounded-md"
      >
        Cancel
      </button>
    </div>
  );
};

export default PaymentStatusUpdate;
