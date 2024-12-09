// src/components/trips/TripDetails.tsx
"use client";

import React, { useState } from "react";
import { useTripContext } from "@/context/TripContext";
import { useUserContext } from "@/context/UserContext";

const vehicleTypes = ["Bus", "Van"];

interface TripDetailsProps {
  tripId: string;
  onClose: () => void;
}

const TripDetails: React.FC<TripDetailsProps> = ({ tripId, onClose }) => {
  const {
    trips,
    updateTripStatus,
    markPassengerOnboard,
    addDriver,
    updateVehicle,
    requestCancellation,
    addPackage,
  } = useTripContext();
  const { users } = useUserContext();
  const trip = trips.find((trip) => trip.id === tripId);
  const drivers = users.filter((user) => user.role === "Driver");

  const [selectedDriver, setSelectedDriver] = useState<string>("");
  const [vehicleType, setVehicleType] = useState<string>("");
  const [plateNumber, setPlateNumber] = useState<string>("");

  // State for adding a new package
  const [packageType, setPackageType] = useState<string>("");
  const [packageWeight, setPackageWeight] = useState<number>(0);
  const [packageDimensions, setPackageDimensions] = useState<string>("");
  const [packageRecipient, setPackageRecipient] = useState<string>("");
  const [showAddPackageForm, setShowAddPackageForm] = useState<boolean>(false);

  if (!trip) {
    return null;
  }

  const handleMarkDeparted = () => {
    updateTripStatus(tripId, "departed");
    alert("Trip marked as departed.");
  };

  const handleOnboardPassenger = (bookingCode: string) => {
    markPassengerOnboard(tripId, bookingCode);
    alert(`Passenger with booking code ${bookingCode} marked as onboard.`);
  };

  const handleAddDriver = () => {
    const selected = drivers.find((driver) => driver.id === selectedDriver);
    if (selected) {
      addDriver(tripId, selected);
      alert(`Driver ${selected.name} assigned.`);
    }
  };

  const handleUpdateVehicle = () => {
    updateVehicle(tripId, {
      id: Date.now().toString(),
      type: vehicleType as "Bus" | "Van",
      plateNumber,
    });
    alert("Vehicle updated successfully.");
  };

  const handleCancelRequest = () => {
    requestCancellation(tripId);
    alert("Trip cancellation request sent to LTT admin.");
  };

  const handleAddPackage = () => {
    if (!packageType || !packageWeight || !packageRecipient) {
      alert("Please fill in the required fields: Package Type, Weight, and Recipient.");
      return;
    }

    const newPackage = {
      id: Date.now().toString(),
      type: packageType,
      weight: packageWeight,
      dimensions: packageDimensions || "N/A", // Optional dimensions
      recipient: packageRecipient,
    };

    addPackage(tripId, newPackage);
    alert("Package added successfully!");

    // Reset form fields
    setPackageType("");
    setPackageWeight(0);
    setPackageDimensions("");
    setPackageRecipient("");
    setShowAddPackageForm(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-lg">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-700 dark:text-gray-300">
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">{trip.destination} - Trip Details</h2>

        <div className="mb-4">
          <p>Transport Company: {trip.companyName}</p>
          <p>Status: {trip.status}</p>
          {trip.status === "upcoming" && (
            <button onClick={handleMarkDeparted} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
              Mark as Departed
            </button>
          )}
        </div>

        <h3 className="text-lg font-semibold mb-2">Passengers</h3>
        <ul className="space-y-2 max-h-40 overflow-y-auto">
          {trip.passengers.map((passenger) => (
            <li key={passenger.bookingCode} className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
              <p>{passenger.name} (Seat: {passenger.seatNumber})</p>
              <button onClick={() => handleOnboardPassenger(passenger.bookingCode)} className="mt-2 bg-green-600 text-white rounded">
                Mark as Onboard
              </button>
            </li>
          ))}
        </ul>

        <h3 className="text-lg font-semibold mb-2 mt-6">Packages</h3>
        <ul className="space-y-2 max-h-40 overflow-y-auto">
          {trip.packages.length > 0 ? (
            trip.packages.map((pkg) => (
              <li key={pkg.id} className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
                <p>Type: {pkg.type}</p>
                <p>Weight: {pkg.weight} kg</p>
                <p>Dimensions: {pkg.dimensions}</p>
                <p>Recipient: {pkg.recipient}</p>
              </li>
            ))
          ) : (
            <p>No packages added yet.</p>
          )}
        </ul>

        {/* Toggle Button for Add Package Form */}
        <button
          onClick={() => setShowAddPackageForm((prev) => !prev)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          {showAddPackageForm ? "Hide Add Package Form" : "Add Package"}
        </button>

        {/* Add Package Form */}
        {showAddPackageForm && (
          <div className="mt-4">
            <input
              type="text"
              value={packageType}
              onChange={(e) => setPackageType(e.target.value)}
              className="input-field w-full mb-2"
              placeholder="Package Type (e.g., Box, Envelope)"
              required
            />
            <input
              type="number"
              value={packageWeight}
              onChange={(e) => setPackageWeight(Number(e.target.value))}
              className="input-field w-full mb-2"
              placeholder="Package Weight (kg)"
              required
            />
            <input
              type="text"
              value={packageDimensions}
              onChange={(e) => setPackageDimensions(e.target.value)}
              className="input-field w-full mb-2"
              placeholder="Package Dimensions (Optional)"
            />
            <input
              type="text"
              value={packageRecipient}
              onChange={(e) => setPackageRecipient(e.target.value)}
              className="input-field w-full mb-2"
              placeholder="Recipient Name"
              required
            />
            <button onClick={handleAddPackage} className="w-full px-4 py-2 bg-green-600 text-white rounded">
              Submit Package
            </button>
          </div>
        )}

        <button onClick={handleCancelRequest} className="mt-4 w-full bg-red-600 text-white rounded">
          Request Trip Cancellation
        </button>
      </div>
    </div>
  );
};

export default TripDetails;
