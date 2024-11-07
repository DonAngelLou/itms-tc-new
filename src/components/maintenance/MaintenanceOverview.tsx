// src/components/Maintenance/MaintenanceOverview.tsx
"use client";
import React, { useState, useEffect } from "react";
import axios from "@/lib/api";
import MaintenanceItem from "@/components/maintenance/MaintenanceItem";
import { Maintenance } from "@/types/apiTypes";

const MaintenanceOverview: React.FC = () => {
  const [maintenanceList, setMaintenanceList] = useState<Maintenance[]>([]);

  useEffect(() => {
    const fetchMaintenance = async () => {
      const { data } = await axios.get<Maintenance[]>("/maintenance/upcoming_maintenance/");
      setMaintenanceList(data);
    };
    fetchMaintenance();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold">Maintenance Schedule</h2>
      <ul className="mt-4">
        {maintenanceList.map((maintenance) => (
          <MaintenanceItem key={maintenance.id} maintenance={maintenance} />
        ))}
      </ul>
    </div>
  );
};

export default MaintenanceOverview;
