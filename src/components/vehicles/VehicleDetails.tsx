import React from "react";
import { useVehicleContext } from "@/context/VehicleProvider";
import VehicleStatusUpdate from "@/components/vehicles/VehicleStatusUpdate";
import ViolationList from "@/app/vehicles/ViolationList";
import QRCodeModal from "@/components/vehicles/QRCodeModal";

const VehicleDetails: React.FC = () => {
  const { selectedVehicle } = useVehicleContext();

  if (!selectedVehicle) return <p>Select a vehicle to view details.</p>;

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{selectedVehicle.model}</h2>
      <p>Year: {selectedVehicle.year}</p>
      <p>Color: {selectedVehicle.color}</p>
      <p>Capacity: {selectedVehicle.capacity}</p>
      <VehicleStatusUpdate vehicleId={selectedVehicle.id} />
      <QRCodeModal value={selectedVehicle.model} />
      <ViolationList violations={selectedVehicle.violations} />
    </div>
  );
};

export default VehicleDetails;
