"use client";

import React, { useEffect, useState } from "react";
import { useVehicleContext } from "@/context/VehicleProvider";

interface VehicleTableProps {
  onVehicleSelect: (vehicleId: number) => void;
}

const VehicleTable: React.FC<VehicleTableProps> = ({ onVehicleSelect }) => {
  const { fetchVehicles } = useVehicleContext();
  const [vehicles, setVehicles] = useState<any[]>([]);

  useEffect(() => {
    fetchVehicles().then((data) => setVehicles(data));
  }, [fetchVehicles]);

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Type</th>
            <th className="border border-gray-300 px-4 py-2">Model</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td className="border border-gray-300 px-4 py-2">{vehicle.vehicle_type}</td>
              <td className="border border-gray-300 px-4 py-2">{vehicle.model_name}</td>
              <td className="border border-gray-300 px-4 py-2">{vehicle.status}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => onVehicleSelect(vehicle.id)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleTable;
