"use client";

import React, { createContext, useContext, useCallback, ReactNode } from "react";
import {
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from "@/lib/api"; // Update the path to your `api.ts`

interface VehicleContextProps {
  fetchVehicles: () => Promise<any[]>;
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

export const VehicleProvider: React.FC<VehicleProviderProps> = ({ children }) => {
  const fetchVehicles = useCallback(async () => {
    return await getVehicles();
  }, []);

  const fetchVehicleDetails = useCallback(async (vehicleId: number) => {
    return await getVehicleById(vehicleId);
  }, []);

  const updateVehicleStatus = useCallback(async (vehicleId: number, status: string) => {
    await updateVehicle(vehicleId, { status });
  }, []);

  const deleteVehicleById = useCallback(async (vehicleId: number) => {
    await deleteVehicle(vehicleId);
  }, []);

  const fetchViolations = useCallback(async (vehicleId: number): Promise<Violation[]> => {
    try {
      const response = await fetch(`/api/vehicles/${vehicleId}/violations/`);
      if (!response.ok) {
        throw new Error("Failed to fetch violations.");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching violations:", error);
      return [];
    }
  }, []);

  const fetchFeedback = useCallback(async (vehicleId: number): Promise<Feedback[]> => {
    try {
      const response = await fetch(`/api/vehicles/${vehicleId}/feedback/`);
      if (!response.ok) {
        throw new Error("Failed to fetch feedback.");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching feedback:", error);
      return [];
    }
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

