// src/app/maintenance/page.tsx
"use client";

import React from "react";
import MaintenanceForm from "@/components/maintenance/MaintenanceForm";
import MaintenanceOverview from "@/components/maintenance/MaintenanceOverview";
import { MaintenanceProvider } from "@/context/MaintenanceContext";

export default function MaintenancePage() {
  return (
    <MaintenanceProvider>
      <div className="space-y-8">
        <MaintenanceForm />
        <MaintenanceOverview />
      </div>
    </MaintenanceProvider>
  );
}
