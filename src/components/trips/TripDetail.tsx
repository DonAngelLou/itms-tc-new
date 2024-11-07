// src/components/trips/TripDetail.tsx
import React from 'react';
import TripStatusUpdate from '@/components/trips/TripStatusUpdate';

interface TripDetailProps {
  trip: {
    id: number;
    destination: { name: string };
    vehicle: { vehicle_type: string };
    driver: { name: string };
    departure_time: string;
    status: string;
  };
}

export default function TripDetail({ trip }: TripDetailProps) {
  return (
    <div>
      <h3>Trip to {trip.destination.name}</h3>
      <p>Vehicle: {trip.vehicle.vehicle_type}</p>
      <p>Driver: {trip.driver.name}</p>
      <p>Departure Time: {new Date(trip.departure_time).toLocaleString()}</p>
      <p>Status: {trip.status}</p>
      <TripStatusUpdate tripId={trip.id} currentStatus={trip.status} />
    </div>
  );
}
