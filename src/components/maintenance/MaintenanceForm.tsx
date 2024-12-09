// src/components/maintenance/MaintenanceForm.tsx
"use client";

import React, { useState } from "react";
import { useMaintenanceContext } from "@/context/MaintenanceContext";

const MaintenanceForm: React.FC = () => {
  const { addMaintenance } = useMaintenanceContext();
  const [vehicleName, setVehicleName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (vehicleName && date && description) {
      addMaintenance({
        id: Date.now().toString(),
        vehicleId: Date.now().toString(),
        vehicleName,
        date,
        description,
        status: "Scheduled",
      });
      setVehicleName("");
      setDate("");
      setDescription("");
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-100">Schedule Maintenance</h3>
      <input
        type="text"
        placeholder="Vehicle Name"
        value={vehicleName}
        onChange={(e) => setVehicleName(e.target.value)}
        className="w-full p-2 mb-2 rounded bg-gray-700 text-gray-100"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 mb-2 rounded bg-gray-700 text-gray-100"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-2 rounded bg-gray-700 text-gray-100"
      />
      <button
        onClick={handleSubmit}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
      >
        Submit
      </button>
    </div>
  );
};

export default MaintenanceForm;
