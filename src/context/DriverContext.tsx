// src/context/DriverContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Remove API imports
// import api, { fetchDriverData, requestEditDriver, requestDeleteDriver } from '../lib/api';

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
  fetchDriver: (driverId: string) => Promise<Driver | undefined>;
  editDriver: (driverId: string, editedDriver: Partial<Driver>) => void;
  deleteDriver: (driverId: string) => void;
}

const mockDrivers: Driver[] = [
  {
    id: "d1",
    name: "John Doe",
    profilePicture: "/images/john.png",
    licenseInfo: "License #A123456",
    applicationStatus: "Active",
    travelStatus: TravelStatus.InTerminal,
    type: "Operator",
    vehicleInfo: "Bus - Plate #XYZ-1234",
    nfcCode: "NFC-1001",
    lastNfcTap: null,
    violations: ["Speeding", "Unauthorized Stop"],
    tripHistory: ["2023-09-10", "2023-09-12"],
    citizenship: "American",
    address: "123 Main St, Cityville, USA",
  },
  {
    id: "d2",
    name: "Jane Smith",
    profilePicture: "/images/jane.png",
    licenseInfo: "License #B987654",
    applicationStatus: "Active",
    travelStatus: TravelStatus.Departed,
    type: "Rounder",
    nfcCode: "NFC-1002",
    lastNfcTap: null,
    violations: ["Late Arrival"],
    tripHistory: ["2023-09-11", "2023-09-13"],
    citizenship: "Canadian",
    address: "456 Elm St, Townsville, Canada",
  },
];

const mockDriverRequests: DriverRequest[] = [];

const DriverContext = createContext<DriverContextType | undefined>(undefined);

export const DriverProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [drivers, setDrivers] = useState<Driver[]>(mockDrivers);
  const [driverRequests, setDriverRequests] = useState<DriverRequest[]>(mockDriverRequests);

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

  const updateDriverStatus = (driverId: string, newStatus: Driver["applicationStatus"]) => {
    setDrivers(prevDrivers =>
      prevDrivers.map(driver =>
        driver.id === driverId ? { ...driver, applicationStatus: newStatus } : driver
      )
    );
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

  const fetchDriver = async (driverId: string) => {
    return drivers.find(driver => driver.id === driverId);
  };

  const editDriver = (driverId: string, editedDriver: Partial<Driver>) => {
    setDrivers(prevDrivers =>
      prevDrivers.map(driver =>
        driver.id === driverId ? { ...driver, ...editedDriver } : driver
      )
    );
  };

  const deleteDriver = (driverId: string) => {
    setDrivers(prevDrivers => prevDrivers.filter(driver => driver.id !== driverId));
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setDrivers(mockDrivers);
    }
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
