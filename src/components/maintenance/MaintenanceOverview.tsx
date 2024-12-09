// src/components/maintenance/MaintenanceOverview.tsx
"use client";

import React from "react";
import { useMaintenanceContext } from "@/context/MaintenanceContext";
import MaintenanceItem from "./MaintenanceItem";

const MaintenanceOverview: React.FC = () => {
  const { maintenanceItems } = useMaintenanceContext();

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-100 mb-4">Maintenance Overview</h3>
      {maintenanceItems.length > 0 ? (
        maintenanceItems.map((item) => (
          <MaintenanceItem key={item.id} {...item} />
        ))
      ) : (
        <p className="text-gray-400">No maintenance scheduled.</p>
      )}
    </div>
  );
};

export default MaintenanceOverview;
