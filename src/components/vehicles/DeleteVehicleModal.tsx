// components/vehicles/DeleteVehicleModal.tsx
import React from "react";
import { useVehicleContext } from "@/context/VehicleProvider";

interface DeleteVehicleModalProps {
  vehicleId: number;
  onClose: () => void;
}

const DeleteVehicleModal: React.FC<DeleteVehicleModalProps> = ({ vehicleId, onClose }) => {
  const { requestDeleteVehicle } = useVehicleContext();

  const handleDelete = async () => {
    await requestDeleteVehicle(vehicleId);
    onClose();
  };

  return (
    <div className="modal">
      <h2>Confirm Delete Vehicle</h2>
      <p>Are you sure you want to delete this vehicle?</p>
      <button onClick={handleDelete} className="btn-delete">Request Delete</button>
      <button onClick={onClose} className="btn-cancel">Cancel</button>
    </div>
  );
};

export default DeleteVehicleModal;
