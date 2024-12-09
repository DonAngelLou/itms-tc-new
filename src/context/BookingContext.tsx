// src/context/BookingContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Booking {
  id: string;
  bookingCode: string;
  passengerName: string;
  destination: string;
  date: string;
  vehicleType: string;
  status: "confirmed" | "pending" | "cancelled";
  fare: number;
}

interface BookingContextType {
  bookings: Booking[];
  createBooking: (booking: Booking) => void;
  updateBookingStatus: (id: string, status: "confirmed" | "pending" | "cancelled") => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const mockBookings: Booking[] = [
  {
    id: "1",
    bookingCode: "ABC123",
    passengerName: "John Doe",
    destination: "City Center",
    date: "2024-11-08",
    vehicleType: "Bus",
    status: "confirmed",
    fare: 25.0,
  },
  {
    id: "2",
    bookingCode: "XYZ789",
    passengerName: "Jane Smith",
    destination: "Airport",
    date: "2024-11-08",
    vehicleType: "Van",
    status: "pending",
    fare: 30.0,
  },
];

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);

  const createBooking = (booking: Booking) => {
    setBookings([...bookings, booking]);
  };

  const updateBookingStatus = (id: string, status: "confirmed" | "pending" | "cancelled") => {
    setBookings((prev) =>
      prev.map((booking) => (booking.id === id ? { ...booking, status } : booking))
    );
  };

  return (
    <BookingContext.Provider value={{ bookings, createBooking, updateBookingStatus }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookingContext must be used within a BookingProvider");
  }
  return context;
};
