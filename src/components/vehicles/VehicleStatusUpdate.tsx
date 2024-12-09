import React from "react";
import { useVehicleContext } from "@/context/VehicleProvider";

interface Props {
  vehicleId: number;
}

const VehicleStatusUpdate: React.FC<Props> = ({ vehicleId }) => {
  const { updateVehicleStatus } = useVehicleContext();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateVehicleStatus(vehicleId, e.target.value);
  };

  return (
    <div className="mt-4">
      <label>Status:</label>
      <select onChange={handleStatusChange} className="ml-2 p-1 bg-gray-700 rounded">
        <option>Operational</option>
        <option>Maintenance</option>
        <option>Parked</option>
      </select>
    </div>
  );
};

export default VehicleStatusUpdate;
