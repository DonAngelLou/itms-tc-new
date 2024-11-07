// src/app/trips/page.tsx
"use client";

import React, { useState } from 'react';
import TripList from '@/components/trips/TripList';
import TripForm from '@/components/trips/TripForm';

export default function TripsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Trip Management</h1>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Create New Trip'}
      </button>
      {showForm && <TripForm onSubmit={() => setShowForm(false)} />}
      <TripList />
    </div>
  );
}
