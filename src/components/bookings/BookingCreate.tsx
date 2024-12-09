// src/components/bookings/BookingCreate.tsx
import React, { useState } from "react";
import { useBookingContext, Booking } from "@/context/BookingContext";

const BookingCreate: React.FC = () => {
  const { createBooking } = useBookingContext();
  const [passengerName, setPassengerName] = useState("");
  const [destination, setDestination] = useState("");
  const [vehicleType, setVehicleType] = useState("Bus");

  const handleSubmit = () => {
    const newBooking: Booking = {
      id: Math.random().toString(),
      bookingCode: `BOOK${Math.floor(Math.random() * 10000)}`,
      passengerName,
      destination,
      date: new Date().toISOString().split("T")[0],
      vehicleType,
      status: "pending",
      fare: 20.0,
    };
    createBooking(newBooking);
    setPassengerName("");
    setDestination("");
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="p-4 bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-white mb-4">Create New Booking</h3>
      <input
        type="text"
        value={passengerName}
        onChange={(e) => setPassengerName(e.target.value)}
        placeholder="Passenger Name"
        className="mb-2 p-2 w-full"
      />
      <input
        type="text"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="Destination"
        className="mb-2 p-2 w-full"
      />
      <select
        value={vehicleType}
        onChange={(e) => setVehicleType(e.target.value)}
        className="mb-2 p-2 w-full"
      >
        <option value="Bus">Bus</option>
        <option value="Van">Van</option>
      </select>
      <button onClick={handleSubmit} className="bg-blue-600 text-white p-2 rounded-md w-full">
        Add Booking
      </button>
    </form>
  );
};

export default BookingCreate;
