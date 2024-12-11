"use client";

import React, { createContext, useContext, useCallback, ReactNode, useState } from "react";
// Remove API imports
// import { getVehicles, getVehicleById, updateVehicle, deleteVehicle, getVehicleViolations, getVehicleFeedback } from "@/lib/api";

interface VehicleContextProps {
  fetchVehicles: (driverId?: string) => Promise<any[]>;
  fetchVehicleDetails: (vehicleId: number) => Promise<any>;
  updateVehicleStatus: (vehicleId: number, status: string) => Promise<void>;
  deleteVehicle: (vehicleId: number) => Promise<void>;
  fetchViolations: (vehicleId: number) => Promise<Violation[]>;
  fetchFeedback: (vehicleId: number) => Promise<Feedback[]>;
}

interface VehicleProviderProps {
  children: ReactNode;
}

interface Violation {
  id: number;
  description: string;
}

interface Feedback {
  id: number;
  content: string;
}

const VehicleContext = createContext<VehicleContextProps | undefined>(undefined);

// Mock data for vehicles
const mockVehicles = [
  {
    id: 1,
    lttNumber: "LTT-1001",
    type: "Bus",
    status: "Operational",
    travelStatus: "In Terminal",
    model: "Volvo 7700",
    year: 2022,
    plateNumber: "XYZ-1234",
    color: "Red",
    capacity: 50,
    rightImage: "/images/vehicle-right.png",
    leftImage: "/images/vehicle-left.png",
    backImage: "/images/vehicle-back.png",
    frontImage: "/images/vehicle-front.png",
    lastDriverOperated: "d1",
    violations: 2,
    feedback: 5,
  },
  {
    id: 2,
    lttNumber: "LTT-1002",
    type: "Van",
    status: "Operational",
    travelStatus: "Departed",
    model: "Ford Transit",
    year: 2021,
    plateNumber: "ABC-5678",
    color: "Blue",
    capacity: 15,
    rightImage: "/images/vehicle-right.png",
    leftImage: "/images/vehicle-left.png",
    backImage: "/images/vehicle-back.png",
    frontImage: "/images/vehicle-front.png",
    lastDriverOperated: "d2",
    violations: 1,
    feedback: 3,
  },
];

const mockViolations = [
  { id: 1, description: "Over Speeding" },
  { id: 2, description: "Signal Violation" },
];

const mockFeedbacks = [
  { id: 1, content: "Clean and comfortable." },
  { id: 2, content: "Driver was courteous." },
];

export const VehicleProvider: React.FC<VehicleProviderProps> = ({ children }) => {
  const [vehicles, setVehicles] = useState<any[]>(mockVehicles);

  const fetchVehicles = useCallback(async (driverId?: string) => {
    if (driverId) {
      return vehicles.filter(vehicle => vehicle.lastDriverOperated === driverId);
    }
    return vehicles;
  }, [vehicles]);

  const fetchVehicleDetails = useCallback(async (vehicleId: number) => {
    return vehicles.find(vehicle => vehicle.id === vehicleId);
  }, [vehicles]);

  const updateVehicleStatus = useCallback(async (vehicleId: number, status: string) => {
    setVehicles(prevVehicles =>
      prevVehicles.map(vehicle =>
        vehicle.id === vehicleId ? { ...vehicle, status } : vehicle
      )
    );
  }, []);

  const deleteVehicleById = useCallback(async (vehicleId: number) => {
    setVehicles(prevVehicles => prevVehicles.filter(vehicle => vehicle.id !== vehicleId));
  }, []);

  const fetchViolations = useCallback(async (vehicleId: number): Promise<Violation[]> => {
    return mockViolations;
  }, []);

  const fetchFeedback = useCallback(async (vehicleId: number): Promise<Feedback[]> => {
    return mockFeedbacks;
  }, []);

  return (
    <VehicleContext.Provider
      value={{
        fetchVehicles,
        fetchVehicleDetails,
        updateVehicleStatus,
        deleteVehicle: deleteVehicleById,
        fetchViolations,
        fetchFeedback,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicleContext = () => {
  const context = useContext(VehicleContext);
  if (!context) {
    throw new Error("useVehicleContext must be used within a VehicleProvider");
  }
  return context;
};

