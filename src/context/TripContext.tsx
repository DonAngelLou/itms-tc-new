import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface Passenger {
  id: string;
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
  nfcCode: string;
}

export interface Vehicle {
  id: string;
  type: 'Bus' | 'Van';
  plateNumber: string;
}

export interface Trip {
  id: string;
  companyName: string;
  date: string;
  time: string;
  destination: string;
  fare: number;
  status: 'upcoming' | 'departed';
  passengers: Passenger[];
  packages: Package[];
  driver: Driver | null;
  vehicle: Vehicle | null;
}

export interface Notification {
  id: string;
  message: string;
  tripId: string;
}

interface TripState {
  trips: Trip[];
  notifications: Notification[];
  driverQueue: string[];
}

type TripAction =
  | { type: 'ADD_TRIP'; payload: Trip }
  | { type: 'UPDATE_TRIP'; payload: Trip }
  | { type: 'DELETE_TRIP'; payload: string }
  | { type: 'ADD_PASSENGER'; payload: { tripId: string; passenger: Passenger } }
  | { type: 'UPDATE_PASSENGER'; payload: { tripId: string; passenger: Passenger } }
  | { type: 'ADD_PACKAGE'; payload: { tripId: string; package: Package } }
  | { type: 'UPDATE_DRIVER'; payload: { tripId: string; driver: Driver } }
  | { type: 'UPDATE_VEHICLE'; payload: { tripId: string; vehicle: Vehicle } }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'CLEAR_NOTIFICATION'; payload: string }
  | { type: 'UPDATE_FARE'; payload: { tripId: string; fare: number } }
  | { type: 'CANCEL_TRIP'; payload: string }
  | { type: 'QUEUE_DRIVER'; payload: Driver }
  | { type: 'DEQUEUE_DRIVER'; payload: string };

const tripReducer = (state: TripState, action: TripAction): TripState => {
  switch (action.type) {
    case 'ADD_TRIP':
      return { ...state, trips: [...state.trips, action.payload] };
    case 'UPDATE_TRIP':
      return {
        ...state,
        trips: state.trips.map((trip) =>
          trip.id === action.payload.id ? action.payload : trip
        ),
      };
    case 'DELETE_TRIP':
      return {
        ...state,
        trips: state.trips.filter((trip) => trip.id !== action.payload),
      };
    case 'ADD_PASSENGER':
      return {
        ...state,
        trips: state.trips.map((trip) =>
          trip.id === action.payload.tripId
            ? { ...trip, passengers: [...trip.passengers, action.payload.passenger] }
            : trip
        ),
      };
    case 'UPDATE_PASSENGER':
      return {
        ...state,
        trips: state.trips.map((trip) =>
          trip.id === action.payload.tripId
            ? {
                ...trip,
                passengers: trip.passengers.map((p) =>
                  p.id === action.payload.passenger.id ? action.payload.passenger : p
                ),
              }
            : trip
        ),
      };
    case 'ADD_PACKAGE':
      return {
        ...state,
        trips: state.trips.map((trip) =>
          trip.id === action.payload.tripId
            ? { ...trip, packages: [...trip.packages, action.payload.package] }
            : trip
        ),
      };
    case 'UPDATE_DRIVER':
      return {
        ...state,
        trips: state.trips.map((trip) =>
          trip.id === action.payload.tripId
            ? { ...trip, driver: action.payload.driver }
            : trip
        ),
      };
    case 'UPDATE_VEHICLE':
      return {
        ...state,
        trips: state.trips.map((trip) =>
          trip.id === action.payload.tripId
            ? { ...trip, vehicle: action.payload.vehicle }
            : trip
        ),
      };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case 'CLEAR_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter((n) => n.id !== action.payload),
      };
    case 'UPDATE_FARE':
      return {
        ...state,
        trips: state.trips.map((trip) =>
          trip.id === action.payload.tripId
            ? { ...trip, fare: action.payload.fare }
            : trip
        ),
      };
    case 'CANCEL_TRIP':
      return {
        ...state,
        trips: state.trips.filter((trip) => trip.id !== action.payload),
      };
    case 'QUEUE_DRIVER':
      return {
        ...state,
        driverQueue: [...state.driverQueue, action.payload.id],
      };
    case 'DEQUEUE_DRIVER':
      return {
        ...state,
        driverQueue: state.driverQueue.filter(id => id !== action.payload),
      };
    default:
      return state;
  }
};

const initialState: TripState = {
  trips: [
    {
      id: 'trip1',
      companyName: 'Travel Co.',
      date: '2023-10-01',
      time: '08:00',
      destination: 'City A',
      fare: 50,
      status: 'upcoming',
      passengers: [
        {
          id: 'passenger1',
          bookingCode: 'ABC123',
          name: 'John Doe',
          contactInfo: 'john@example.com',
          seatNumber: '1A',
          onboard: false,
        },
        {
          id: 'passenger2',
          bookingCode: 'DEF456',
          name: 'Jane Doe',
          contactInfo: 'jane@example.com',
          seatNumber: '1B',
          onboard: false,
        },
      ],
      packages: [
        {
          id: 'package1',
          type: 'Box',
          weight: 10,
          dimensions: '30x30x30 cm',
          recipient: 'Alice Smith',
        },
      ],
      driver: {
        id: 'driver1',
        name: 'Michael Johnson',
        nfcCode: 'NFC123456',
      },
      vehicle: {
        id: 'vehicle1',
        type: 'Bus',
        plateNumber: 'XYZ-7890',
      },
    },
    {
      id: 'trip2',
      companyName: 'Journey Ltd.',
      date: '2023-10-02',
      time: '14:00',
      destination: 'City B',
      fare: 75,
      status: 'departed',
      passengers: [
        {
          id: 'passenger3',
          bookingCode: 'GHI789',
          name: 'Bob Smith',
          contactInfo: 'bob@example.com',
          seatNumber: '2A',
          onboard: true,
        },
      ],
      packages: [],
      driver: null,
      vehicle: null,
    },
  ],
  notifications: [
    {
      id: 'notif1',
      message: 'Trip to City A is delayed by 30 minutes.',
      tripId: 'trip1',
    },
  ],
  driverQueue: [],
};

const TripContext = createContext<{
  state: TripState;
  dispatch: React.Dispatch<TripAction>;
} | null>(null);

export const TripProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(tripReducer, initialState);

  return (
    <TripContext.Provider value={{ state, dispatch }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTripContext = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTripContext must be used within a TripProvider');
  }
  return context;
};

// Helper functions
export const addTrip = (dispatch: React.Dispatch<TripAction>, trip: Omit<Trip, 'id'>) => {
  const newTrip: Trip = { ...trip, id: uuidv4() };
  dispatch({ type: 'ADD_TRIP', payload: newTrip });
};

export const updateTripStatus = (
  dispatch: React.Dispatch<TripAction>,
  tripId: string,
  status: 'upcoming' | 'departed'
) => {
  dispatch({
    type: 'UPDATE_TRIP',
    payload: { id: tripId, status } as Trip,
  });
};

export const addPassenger = (
  dispatch: React.Dispatch<TripAction>,
  tripId: string,
  passenger: Omit<Passenger, 'id' | 'bookingCode' | 'onboard'>
) => {
  const newPassenger: Passenger = {
    ...passenger,
    id: uuidv4(),
    bookingCode: Math.random().toString(36).substr(2, 9).toUpperCase(),
    onboard: false,
  };
  dispatch({ type: 'ADD_PASSENGER', payload: { tripId, passenger: newPassenger } });
};

export const updatePassengerOnboard = (
  dispatch: React.Dispatch<TripAction>,
  tripId: string,
  passengerId: string,
  onboard: boolean
) => {
  dispatch({
    type: 'UPDATE_PASSENGER',
    payload: { tripId, passenger: { id: passengerId, onboard } as Passenger },
  });
};

export const addPackage = (
  dispatch: React.Dispatch<TripAction>,
  tripId: string,
  packageData: Omit<Package, 'id'>
) => {
  const newPackage: Package = { ...packageData, id: uuidv4() };
  dispatch({ type: 'ADD_PACKAGE', payload: { tripId, package: newPackage } });
};

export const updateDriver = (
  dispatch: React.Dispatch<TripAction>,
  tripId: string,
  driver: Driver
) => {
  dispatch({ type: 'UPDATE_DRIVER', payload: { tripId, driver } });
};

export const updateVehicle = (
  dispatch: React.Dispatch<TripAction>,
  tripId: string,
  vehicle: Vehicle
) => {
  dispatch({ type: 'UPDATE_VEHICLE', payload: { tripId, vehicle } });
};

export const addNotification = (
  dispatch: React.Dispatch<TripAction>,
  tripId: string,
  message: string
) => {
  const notification: Notification = { id: uuidv4(), tripId, message };
  dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
};

export const clearNotification = (
  dispatch: React.Dispatch<TripAction>,
  notificationId: string
) => {
  dispatch({ type: 'CLEAR_NOTIFICATION', payload: notificationId });
};

export const updateFare = (
  dispatch: React.Dispatch<TripAction>,
  tripId: string,
  fare: number
) => {
  dispatch({ type: 'UPDATE_FARE', payload: { tripId, fare } });
};

export const cancelTrip = (dispatch: React.Dispatch<TripAction>, tripId: string) => {
  dispatch({ type: 'CANCEL_TRIP', payload: tripId });
};

export const queueDriver = (dispatch: React.Dispatch<TripAction>, driver: Driver) => {
  dispatch({ type: 'QUEUE_DRIVER', payload: driver });
};

export const dequeueDriver = (dispatch: React.Dispatch<TripAction>, driverId: string) => {
  dispatch({ type: 'DEQUEUE_DRIVER', payload: driverId });
};

