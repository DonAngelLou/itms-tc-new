// src/pages/bookings.tsx
"use client";

import React from "react";
import { BookingProvider } from "@/context/BookingContext";
import BookingList from "@/components/bookings/BookingList";
import BookingCreate from "@/components/bookings/BookingCreate";

const BookingsPage: React.FC = () => {
  return (
    <BookingProvider>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Bookings Management</h1>
        <BookingCreate />
        <BookingList />
      </div>
    </BookingProvider>
  );
};

export default BookingsPage;
