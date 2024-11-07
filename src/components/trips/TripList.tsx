// src/components/trips/TripList.tsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import TripDetail from '@/components/trips/TripDetail';

interface Trip {
  id: number;
  destination: { name: string };
  vehicle: { vehicle_type: string };
  driver: { name: string };
  departure_time: string;
  status: string;
  fare: number;
}

export default function TripList() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [filters, setFilters] = useState({
    date: '',
    destination: '',
    vehicleType: '',
    status: ''
  });

  useEffect(() => {
    async function fetchTrips() {
      try {
        const response = await axiosInstance.get('/trips/', { params: filters });
        
        if (Array.isArray(response.data)) {
          setTrips(response.data);
        } else {
          console.error("Unexpected data format:", response.data);
          setTrips([]);
        }
      } catch (error) {
        console.error('Error fetching trips:', error);
        setTrips([]); // Ensure trips is an empty array in case of error
      }
    }
    fetchTrips();
  }, [filters]);

  return (
    <div>
      <h2>Trips</h2>
      
      {/* Filter Inputs */}
      <input
        type="text"
        placeholder="Destination"
        value={filters.destination}
        onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
      />
      <input
        type="date"
        value={filters.date}
        onChange={(e) => setFilters({ ...filters, date: e.target.value })}
      />
      <select
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
      >
        <option value="">All Statuses</option>
        <option value="scheduled">Scheduled</option>
        <option value="departed">Departed</option>
        <option value="arrived">Arrived</option>
      </select>
      
      {/* Trip List */}
      <ul>
        {trips.length > 0 ? (
          trips.map((trip) => (
            <li key={trip.id} onClick={() => setSelectedTrip(trip)}>
              {trip.destination.name} - {trip.vehicle.vehicle_type} - {trip.status}
            </li>
          ))
        ) : (
          <li>No trips available.</li>
        )}
      </ul>
      
      {/* Trip Detail */}
      {selectedTrip && <TripDetail trip={selectedTrip} />}
    </div>
  );
}
