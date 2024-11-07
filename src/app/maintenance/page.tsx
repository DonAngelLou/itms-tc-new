// src/app/maintenance/page.tsx
"use client";

import React from "react";
import MaintenanceOverview from "@/components/maintenance/MaintenanceOverview";
import MaintenanceForm from "@/components/maintenance/MaintenanceForm";

const MaintenancePage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Maintenance Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Maintenance Form for scheduling new maintenance */}
        <div>
          <MaintenanceForm />
        </div>
        {/* Maintenance Overview for viewing scheduled maintenance */}
        <div>
          <MaintenanceOverview />
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
