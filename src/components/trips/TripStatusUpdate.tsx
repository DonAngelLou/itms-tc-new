// src/components/trips/TripStatusUpdate.tsx
import React from "react";
import { Trip } from "@/context/TripContext";

interface TripStatusUpdateProps {
  trip: Trip;
  onStatusChange?: (status: "scheduled" | "departed" | "arrived") => void;
}

const TripStatusUpdate: React.FC<TripStatusUpdateProps> = ({ trip, onStatusChange }) => {
  const handleStatusChange = (newStatus: "scheduled" | "departed" | "arrived") => {
    if (onStatusChange) {
      onStatusChange(newStatus);
    }
  };

  return (
    <div className="mt-4">
      <h4 className="text-gray-100 mb-2">Update Status</h4>
      <div className="flex space-x-2">
        <button
          onClick={() => handleStatusChange("scheduled")}
          className={`py-1 px-4 rounded ${trip.status === "scheduled" ? "bg-blue-600" : "bg-gray-700"} text-white`}
        >
          Scheduled
        </button>
        <button
          onClick={() => handleStatusChange("departed")}
          className={`py-1 px-4 rounded ${trip.status === "departed" ? "bg-green-600" : "bg-gray-700"} text-white`}
        >
          Departed
        </button>
        <button
          onClick={() => handleStatusChange("arrived")}
          className={`py-1 px-4 rounded ${trip.status === "arrived" ? "bg-yellow-600" : "bg-gray-700"} text-white`}
        >
          Arrived
        </button>
      </div>
    </div>
  );
};

export default TripStatusUpdate;
