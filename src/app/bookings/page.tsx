// src/app/bookings/page.tsx
"use client";

import React from 'react';
import BookingList from '@/components/bookings/BookingList';
import PaymentSummary from '@/components/bookings/PaymentSummary';

export default function BookingsPage() {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Booking Management</h1>
      <BookingList />
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Payment Management</h2>
        <PaymentSummary />
      </div>
    </div>
  );
}
