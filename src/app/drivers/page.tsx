"use client";

import React from "react";
import { DriverProvider } from "@/context/DriverContext";
import DriverList from "@/components/drivers/DriverList";

export default function DriversPage() {
  return (
    <DriverProvider>
      <div className="p-8 bg-background text-foreground min-h-screen">
        <DriverList />
      </div>
    </DriverProvider>
  );
}

