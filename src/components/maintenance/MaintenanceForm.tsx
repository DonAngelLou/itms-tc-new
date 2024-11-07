// src/components/Maintenance/MaintenanceForm.tsx
"use client";
import React, { useState } from "react";
import axios from "@/lib/api";

const MaintenanceForm: React.FC = () => {
  const [vehicleId, setVehicleId] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("/maintenance/", {
      vehicle: vehicleId,
      scheduled_date: date,
      description,
    });
    // Reset form
    setVehicleId("");
    setDate("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-md bg-white">
      <h3 className="text-lg font-semibold">Schedule Maintenance</h3>
      <div className="mt-4">
        <label htmlFor="vehicleId" className="block font-medium">Vehicle</label>
        <input
          type="text"
          id="vehicleId"
          value={vehicleId}
          onChange={(e) => setVehicleId(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
          required
        />
      </div>
      <div className="mt-4">
        <label htmlFor="date" className="block font-medium">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
          required
        />
      </div>
      <div className="mt-4">
        <label htmlFor="description" className="block font-medium">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
          required
        />
      </div>
      <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
        Schedule Maintenance
      </button>
    </form>
  );
};

export default MaintenanceForm;
