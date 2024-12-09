// src/components/maintenance/MaintenanceItem.tsx
"use client";

import React from "react";
import { useMaintenanceContext } from "@/context/MaintenanceContext";

interface MaintenanceItemProps {
  id: string;
  vehicleName: string;
  date: string;
  description: string;
  status: string;
}

const MaintenanceItem: React.FC<MaintenanceItemProps> = ({ id, vehicleName, date, description, status }) => {
  const { updateMaintenanceStatus } = useMaintenanceContext();

  const handleStatusChange = (newStatus: string) => {
    updateMaintenanceStatus(id, newStatus as "Scheduled" | "In Progress" | "Completed");
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
      <h4 className="text-lg font-bold text-gray-100">{vehicleName}</h4>
      <p>Date: {new Date(date).toLocaleDateString()}</p>
      <p>Description: {description}</p>
      <p>Status: {status}</p>
      <select
        value={status}
        onChange={(e) => handleStatusChange(e.target.value)}
        className="w-full p-2 mt-2 bg-gray-700 text-gray-100 rounded"
      >
        <option value="Scheduled">Scheduled</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};

export default MaintenanceItem;
