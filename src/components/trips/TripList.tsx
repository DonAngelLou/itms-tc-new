// src/components/trips/TripList.tsx
"use client";

import React, { useState } from "react";
import { useTripContext } from "@/context/TripContext";
import TripDetails from "@/components/trips/TripDetail";
import { format } from "date-fns";

const TripList: React.FC = () => {
  const { trips } = useTripContext();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);

  // Filter trips based on selected date
  const filteredTrips = selectedDate
    ? trips.filter((trip) => trip.date === selectedDate)
    : trips;

  // Categorize trips by status
  const upcomingTrips = filteredTrips.filter((trip) => trip.status === "upcoming");
  const pastTrips = filteredTrips.filter((trip) => trip.status === "departed");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleTripClick = (tripId: string) => {
    setSelectedTripId(tripId);
  };

  const handleCloseModal = () => {
    setSelectedTripId(null);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Trip Management</h2>

      {/* Date Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Filter by Date</label>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="input-field w-full"
        />
      </div>

      {/* Upcoming Trips */}
      <h3 className="text-lg font-semibold mb-2">Upcoming Trips</h3>
      <div className="space-y-4">
        {upcomingTrips.length > 0 ? (
          upcomingTrips.map((trip) => (
            <div
              key={trip.id}
              className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-800"
              onClick={() => handleTripClick(trip.id)}
            >
              <h4 className="text-lg font-semibold">{trip.destination}</h4>
              <p className="text-sm">Date: {format(new Date(trip.date), "yyyy-MM-dd")}</p>
              <p className="text-sm">Time: {trip.time}</p>
              <p className="text-sm">Status: {trip.status}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No upcoming trips found.</p>
        )}
      </div>

      {/* Past Trips */}
      <h3 className="text-lg font-semibold mb-2 mt-6">Past Trips</h3>
      <div className="space-y-4">
        {pastTrips.length > 0 ? (
          pastTrips.map((trip) => (
            <div
              key={trip.id}
              className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-800"
              onClick={() => handleTripClick(trip.id)}
            >
              <h4 className="text-lg font-semibold">{trip.destination}</h4>
              <p className="text-sm">Date: {format(new Date(trip.date), "yyyy-MM-dd")}</p>
              <p className="text-sm">Time: {trip.time}</p>
              <p className="text-sm">Status: {trip.status}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No past trips found.</p>
        )}
      </div>

      {/* Trip Details Modal */}
      {selectedTripId && (
        <TripDetails tripId={selectedTripId} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default TripList;
