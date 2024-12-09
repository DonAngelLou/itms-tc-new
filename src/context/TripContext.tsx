// src/context/TripContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Passenger {
  bookingCode: string;
  name: string;
  contactInfo: string;
  seatNumber: string;
  onboard: boolean;
}

export interface Package {
  id: string;
  type: string;
  weight: number;
  dimensions: string;
  recipient: string;
}

export interface Driver {
  id: string;
  name: string;
}

export interface Vehicle {
  id: string;
  type: "Bus" | "Van";
  plateNumber: string;
}

export interface Trip {
  id: string;
  companyName: string;
  date: string;
  time: string;
  destination: string;
  fare: number;
  status: "upcoming" | "departed";
  passengers: Passenger[];
  packages: Package[];
  driver: Driver | null;
  vehicle: Vehicle | null;
}

interface TripContextType {
  trips: Trip[];
  addTrip: (trip: Trip) => void;
  createTrip: (tripData: Omit<Trip, "id">) => void;
  updateTripStatus: (id: string, status: "upcoming" | "departed") => void;
  addPassenger: (tripId: string, passenger: Passenger) => void;
  addPackage: (tripId: string, packageInfo: Package) => void;
  updateVehicle: (tripId: string, vehicle: Vehicle) => void;
  addDriver: (tripId: string, driver: Driver) => void;
  markPassengerOnboard: (tripId: string, bookingCode: string) => void;
  requestCancellation: (tripId: string) => void;
  notifyNewBooking: (tripId: string) => void;
}

const mockTrips: Trip[] = [
  {
    id: "1",
    companyName: "Fast Transport Co",
    date: "2024-11-20",
    time: "10:00 AM",
    destination: "City Center",
    fare: 200,
    status: "upcoming",
    passengers: [
      {
        bookingCode: "ABC123",
        name: "John Doe",
        contactInfo: "09123456789",
        seatNumber: "1A",
        onboard: false,
      },
      {
        bookingCode: "DEF456",
        name: "Jane Smith",
        contactInfo: "09876543210",
        seatNumber: "1B",
        onboard: true,
      },
    ],
    packages: [
      {
        id: "pkg1",
        type: "Box",
        weight: 5,
        dimensions: "30x30x30 cm",
        recipient: "Si Carl"
      },
    ],
    driver: {
      id: "d1",
      name: "Mike Johnson",
    },
    vehicle: {
      id: "v1",
      type: "Bus",
      plateNumber: "XYZ-1234",
    },
  },
  {
    id: "2",
    companyName: "Speedy Shuttle",
    date: "2024-11-21",
    time: "12:00 PM",
    destination: "Airport",
    fare: 300,
    status: "departed",
    passengers: [
      {
        bookingCode: "GHI789",
        name: "Alice Brown",
        contactInfo: "09223334455",
        seatNumber: "2A",
        onboard: true,
      },
    ],
    packages: [],
    driver: {
      id: "d2",
      name: "Sarah Lee",
    },
    vehicle: {
      id: "v2",
      type: "Van",
      plateNumber: "ABC-5678",
    },
  },
];

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [trips, setTrips] = useState<Trip[]>(mockTrips);

  const addTrip = (trip: Trip) => setTrips((prevTrips) => [...prevTrips, trip]);

  const createTrip = (tripData: Omit<Trip, "id">) => {
    const newTrip: Trip = {
      ...tripData,
      id: Date.now().toString(),
    };
    addTrip(newTrip);
    console.log(`Trip created: ${JSON.stringify(newTrip)}`);
  };

  const updateTripStatus = (id: string, status: "upcoming" | "departed") => {
    setTrips((prevTrips) =>
      prevTrips.map((trip) => (trip.id === id ? { ...trip, status } : trip))
    );
  };

  const addPassenger = (tripId: string, passenger: Passenger) => {
    setTrips((prevTrips) =>
      prevTrips.map((trip) =>
        trip.id === tripId ? { ...trip, passengers: [...trip.passengers, passenger] } : trip
      )
    );
    notifyNewBooking(tripId);
  };

  const addPackage = (tripId: string, packageInfo: Package) => {
    setTrips((prevTrips) =>
      prevTrips.map((trip) =>
        trip.id === tripId ? { ...trip, packages: [...trip.packages, packageInfo] } : trip
      )
    );
  };

  const updateVehicle = (tripId: string, vehicle: Vehicle) => {
    setTrips((prevTrips) =>
      prevTrips.map((trip) => (trip.id === tripId ? { ...trip, vehicle } : trip))
    );
  };

  const addDriver = (tripId: string, driver: Driver) => {
    setTrips((prevTrips) =>
      prevTrips.map((trip) => (trip.id === tripId ? { ...trip, driver } : trip))
    );
  };

  const markPassengerOnboard = (tripId: string, bookingCode: string) => {
    setTrips((prevTrips) =>
      prevTrips.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              passengers: trip.passengers.map((p) =>
                p.bookingCode === bookingCode ? { ...p, onboard: true } : p
              ),
            }
          : trip
      )
    );
  };

  const requestCancellation = (tripId: string) => {
    console.log(`Requesting cancellation for trip ID: ${tripId}`);
  };

  const notifyNewBooking = (tripId: string) => {
    console.log(`New booking notification for trip ID: ${tripId}`);
  };

  return (
    <TripContext.Provider
      value={{
        trips,
        addTrip,
        createTrip,
        updateTripStatus,
        addPassenger,
        addPackage,
        updateVehicle,
        addDriver,
        markPassengerOnboard,
        requestCancellation,
        notifyNewBooking,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTripContext = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error("useTripContext must be used within a TripProvider");
  }
  return context;
};
