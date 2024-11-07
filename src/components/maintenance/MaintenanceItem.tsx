// src/components/Maintenance/MaintenanceItem.tsx
import React from "react";
import { Maintenance } from "@/types/apiTypes";

interface MaintenanceItemProps {
  maintenance: Maintenance;
}

const MaintenanceItem: React.FC<MaintenanceItemProps> = ({ maintenance }) => {
  return (
    <li className="p-4 border rounded-md my-2 bg-gray-100">
      <div>
        <span className="font-bold">Vehicle:</span> {maintenance.vehicle}
      </div>
      <div>
        <span className="font-bold">Scheduled Date:</span> {maintenance.scheduled_date}
      </div>
      <div>
        <span className="font-bold">Description:</span> {maintenance.description}
      </div>
      <div>
        <span className="font-bold">Completed:</span> {maintenance.is_completed ? "Yes" : "No"}
      </div>
    </li>
  );
};

export default MaintenanceItem;
