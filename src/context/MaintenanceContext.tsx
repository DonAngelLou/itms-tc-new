// src/context/MaintenanceContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the Maintenance interface
export interface Maintenance {
  id: string;
  vehicleId: string;
  vehicleName: string;
  date: string;
  description: string;
  status: "Scheduled" | "In Progress" | "Completed";
}

// Define the context type
interface MaintenanceContextType {
  maintenanceItems: Maintenance[];
  addMaintenance: (item: Maintenance) => void;
  updateMaintenanceStatus: (id: string, status: Maintenance["status"]) => void;
}

// Mock data for initial state
export const mockMaintenanceData: Maintenance[] = [
  {
    id: "1",
    vehicleId: "101",
    vehicleName: "Bus A",
    date: "2024-11-10",
    description: "Engine check and oil change",
    status: "Scheduled",
  },
  {
    id: "2",
    vehicleId: "102",
    vehicleName: "Van B",
    date: "2024-11-12",
    description: "Tire replacement",
    status: "Completed",
  },
];

// Create the context
const MaintenanceContext = createContext<MaintenanceContextType | undefined>(undefined);

// Provider component
export const MaintenanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [maintenanceItems, setMaintenanceItems] = useState<Maintenance[]>(mockMaintenanceData);

  // Function to add a new maintenance item
  const addMaintenance = (item: Maintenance) => {
    if (!item.id || !item.vehicleId || !item.vehicleName || !item.date || !item.description) {
      console.error("Invalid maintenance item data.");
      return;
    }
    setMaintenanceItems((prevItems) => [...prevItems, item]);
  };

  // Function to update the status of a maintenance item
  const updateMaintenanceStatus = (id: string, status: Maintenance["status"]) => {
    if (!["Scheduled", "In Progress", "Completed"].includes(status)) {
      console.error("Invalid status update.");
      return;
    }
    setMaintenanceItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );
  };

  // Provide context value
  return (
    <MaintenanceContext.Provider value={{ maintenanceItems, addMaintenance, updateMaintenanceStatus }}>
      {children}
    </MaintenanceContext.Provider>
  );
};

// Custom hook to use the Maintenance context
export const useMaintenanceContext = () => {
  const context = useContext(MaintenanceContext);
  if (!context) {
    throw new Error("useMaintenanceContext must be used within a MaintenanceProvider");
  }
  return context;
};
