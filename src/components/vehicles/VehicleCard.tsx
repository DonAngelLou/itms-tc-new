import React from "react";
import { Vehicle } from "@/context/VehicleProvider";

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: () => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onSelect }) => {
  return (
    <div onClick={onSelect} className="cursor-pointer bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition">
      <h3 className="text-lg font-bold">{vehicle.model}</h3>
      <p>Year: {vehicle.year}</p>
      <p>Capacity: {vehicle.capacity}</p>
      <p>Status: {vehicle.status}</p>
    </div>
  );
};

export default VehicleCard;
