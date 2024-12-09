// src/app/trips/page.tsx
"use client";
// src/app/trips/page.tsx or your specific page file
import React from "react";
import { TripProvider } from "@/context/TripContext";
import TripList from "@/components/trips/TripList";
import TripForm from "@/components/trips/TripForm";

const TripsPage: React.FC = () => {
  return (
    <TripProvider>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Trip Management</h1>
        <TripList />
        <TripForm />
      </div>
    </TripProvider>
  );
};

export default TripsPage;
