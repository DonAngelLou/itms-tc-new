// src/context/DriverContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { fetchDriverData, requestEditDriver, requestDeleteDriver } from '../lib/api';

export enum TravelStatus {
  NoTrip = "No Trip",
  InTerminal = "In Terminal",
  Departed = "Departed",
  Arrived = "Arrived",
}

export interface Driver {
  id: string;
  name: string;
  profilePicture: string;
  licenseInfo: string;
  applicationStatus: "On Process" | "Get NFC" | "Active" | "Inactive";
  travelStatus: TravelStatus;
  type: "Operator" | "Rounder";
  vehicleInfo?: string;
  nfcCode: string;
  lastNfcTap: string | null;
  violations: string[];
  tripHistory: string[];
  citizenship: string;
  address: string;
}

export interface DriverRequest {
  id: string;
  type: "Add" | "Edit" | "Delete";
  driverData: Omit<Driver, "id">;
  status: "Pending" | "Approved" | "Rejected";
}

interface DriverContextType {
  drivers: Driver[];
  driverRequests: DriverRequest[];
  updateNfcCode: (driverId: string, newNfcCode: string) => void;
  recordNfcTap: (driverId: string) => void;
  addViolation: (driverId: string, violation: string) => void;
  deleteViolation: (driverId: string, violation: string) => void;
  addDriverRequest: (request: DriverRequest) => void;
  updateDriverStatus: (driverId: string, newStatus: Driver["applicationStatus"]) => void;
  approveRequest: (requestId: string) => void;
  rejectRequest: (requestId: string) => void;
  fetchDriver: (driverId: string) => Promise<Driver>;
  editDriver: (driverId: string, editedDriver: any) => Promise<void>;
  deleteDriver: (driverId: string) => Promise<void>;
}

const mockDrivers: Driver[] = [
  {
    id: "d1",
    name: "John Doe",
    profilePicture: "/images/john.png",
    licenseInfo: "License #123456789",
    applicationStatus: "Active",
    travelStatus: TravelStatus.InTerminal,
    type: "Operator",
    vehicleInfo: "Bus - Plate #XYZ-1234",
    nfcCode: "NFC-12345",
    lastNfcTap: null,
    violations: ["Speeding"],
    tripHistory: ["2024-11-10", "2024-11-12"],
    citizenship: "USA",
    address: "123 Main St, Anytown, USA",
  },
  {
    id: "d2",
    name: "Jamil Sultan",
    profilePicture: "/images/john.png",
    licenseInfo: "License #123456789",
    applicationStatus: "Active",
    travelStatus: TravelStatus.InTerminal,
    type: "Rounder",
    nfcCode: "NFC-54321",
    lastNfcTap: null,
    violations: ["Speeding"],
    tripHistory: ["2024-11-10", "2024-11-12"],
    citizenship: "USA",
    address: "123 Main St, Anytown, USA",
  },
];

const mockRequests: DriverRequest[] = [];

const DriverContext = createContext<DriverContextType | undefined>(undefined);

export const DriverProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [drivers, setDrivers] = useState<Driver[]>(mockDrivers);
  const [driverRequests, setDriverRequests] = useState<DriverRequest[]>(mockRequests);

  const updateNfcCode = (driverId: string, newNfcCode: string) => {
    setDrivers((prevDrivers) =>
      prevDrivers.map((driver) =>
        driver.id === driverId ? { ...driver, nfcCode: newNfcCode } : driver
      )
    );
    alert(`NFC code updated successfully for driver ID: ${driverId}`);
  };

  const recordNfcTap = (driverId: string) => {
    const currentTime = new Date().toLocaleString();
    setDrivers((prevDrivers) =>
      prevDrivers.map((driver) =>
        driver.id === driverId ? { ...driver, lastNfcTap: currentTime } : driver
      )
    );
    alert(`NFC tap recorded at ${currentTime} for driver ID: ${driverId}`);
  };

  const addViolation = (driverId: string, violation: string) => {
    setDrivers((prevDrivers) =>
      prevDrivers.map((driver) =>
        driver.id === driverId ? { ...driver, violations: [...driver.violations, violation] } : driver
      )
    );
    alert(`Violation added for driver ID: ${driverId}`);
  };

  const deleteViolation = (driverId: string, violation: string) => {
    setDrivers((prevDrivers) =>
      prevDrivers.map((driver) =>
        driver.id === driverId
          ? { ...driver, violations: driver.violations.filter((v) => v !== violation) }
          : driver
      )
    );
    alert(`Violation removed for driver ID: ${driverId}`);
  };

  const addDriverRequest = (request: DriverRequest) => {
    setDriverRequests((prevRequests) => [...prevRequests, request]);
    alert(`Driver request submitted: ${request.type}`);
  };

  const updateDriverStatus = async (driverId: string, status: string) => {
    await fetch(`/api/drivers/${driverId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    fetchDrivers();
  };

  const approveRequest = (requestId: string) => {
    setDriverRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === requestId ? { ...req, status: "Approved" } : req
      )
    );
    alert(`Request approved for ID: ${requestId}`);
  };

  const rejectRequest = (requestId: string) => {
    setDriverRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === requestId ? { ...req, status: "Rejected" } : req
      )
    );
    alert(`Request rejected for ID: ${requestId}`);
  };

  const fetchDrivers = async () => {
    const response = await fetch("/api/drivers/");
    const data = await response.json();
    setDrivers(data);
  };

  const fetchDriver = async (driverId: string) => {
    const driver = await fetchDriverData(driverId);
    setDrivers((prevDrivers) => [...prevDrivers, driver]);
    return driver;
  };

  const editDriver = async (driverId: string, editedDriver: any) => {
    await requestEditDriver(driverId, editedDriver);
  };

  const deleteDriver = async (driverId: string) => {
    await requestDeleteDriver(driverId);
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  return (
    <DriverContext.Provider
      value={{
        drivers,
        driverRequests,
        updateNfcCode,
        recordNfcTap,
        addViolation,
        deleteViolation,
        addDriverRequest,
        updateDriverStatus,
        approveRequest,
        rejectRequest,
        fetchDriver,
        editDriver,
        deleteDriver,
      }}
    >
      {children}
    </DriverContext.Provider>
  );
};

export const useDriverContext = () => {
  const context = useContext(DriverContext);
  if (!context) {
    throw new Error("useDriverContext must be used within a DriverProvider");
  }
  return context;
};
