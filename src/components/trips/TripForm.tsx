// src/components/trips/TripCreateForm.tsx
"use client";

import React, { useState } from "react";
import { useTripContext } from "@/context/TripContext";
import { useUserContext } from "@/context/UserContext";

const vehicleTypes = ["Bus", "Van"];
const destinations = ["City Center", "Airport", "Seaport", "Suburbs"];

const TripCreateForm: React.FC = () => {
  const { createTrip } = useTripContext();
  const { users } = useUserContext();
  const drivers = users.filter((user) => user.role === "Driver");

  const [destination, setDestination] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [fare, setFare] = useState<string>("");
  const [selectedDriver, setSelectedDriver] = useState<string>("");

  const [vehicleType, setVehicleType] = useState<string>("");
  const [plateNumber, setPlateNumber] = useState<string>("");

  const handleCreateTrip = () => {
    if (!destination || !date || !time || !fare || !vehicleType || !plateNumber) {
      alert("Please fill in all required fields.");
      return;
    }

    createTrip({
      companyName: "Your Transport Co",
      destination,
      date,
      time,
      fare: parseFloat(fare),
      driver: drivers.find((driver) => driver.id === selectedDriver) || null,
      vehicle: {
        id: Date.now().toString(),
        type: vehicleType as "Bus" | "Van",
        plateNumber,
      },
      passengers: [],
      packages: [],
      status: "upcoming",
    });

    alert("Trip created successfully!");
    setDestination("");
    setDate("");
    setTime("");
    setFare("");
    setSelectedDriver("");
    setVehicleType("");
    setPlateNumber("");
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Create New Trip</h2>

      <div className="mb-4">
        <label>Destination</label>
        <select value={destination} onChange={(e) => setDestination(e.target.value)} className="input-field w-full">
          <option value="">Select Destination</option>
          {destinations.map((dest) => (
            <option key={dest} value={dest}>
              {dest}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label>Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input-field w-full" />
      </div>

      <div className="mb-4">
        <label>Time</label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="input-field w-full" />
      </div>

      <div className="mb-4">
        <label>Fare (PHP)</label>
        <input type="number" value={fare} onChange={(e) => setFare(e.target.value)} className="input-field w-full" />
      </div>

      <div className="mb-4">
        <label>Vehicle Type</label>
        <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} className="input-field w-full">
          <option value="">Select Vehicle Type</option>
          {vehicleTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label>Plate Number</label>
        <input type="text" value={plateNumber} onChange={(e) => setPlateNumber(e.target.value)} className="input-field w-full" />
      </div>

      <div className="mb-4">
        <label>Assign Driver</label>
        <select value={selectedDriver} onChange={(e) => setSelectedDriver(e.target.value)} className="input-field w-full">
          <option value="">Select Driver</option>
          {drivers.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.name}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleCreateTrip} className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded">
        Create Trip
      </button>
    </div>
  );
};

export default TripCreateForm;
