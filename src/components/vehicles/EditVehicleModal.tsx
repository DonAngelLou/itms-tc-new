// components/vehicles/EditVehicleModal.tsx
import React, { useState } from "react";
import { useVehicleContext, Vehicle } from "@/context/VehicleProvider";

interface EditVehicleModalProps {
  vehicle: Vehicle;
  onClose: () => void;
}

const EditVehicleModal: React.FC<EditVehicleModalProps> = ({ vehicle, onClose }) => {
  const { requestEditVehicle } = useVehicleContext();
  const [model, setModel] = useState(vehicle.model);
  const [year, setYear] = useState(vehicle.year.toString());
  const [color, setColor] = useState(vehicle.color);
  const [capacity, setCapacity] = useState(vehicle.capacity.toString());

  const handleEdit = async () => {
    await requestEditVehicle(vehicle.id, {
      model,
      year: parseInt(year),
      color,
      capacity: parseInt(capacity),
    });
    onClose();
  };

  return (
    <div className="modal">
      <h2>Edit Vehicle</h2>
      <input placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} />
      <input placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} />
      <input placeholder="Color" value={color} onChange={(e) => setColor(e.target.value)} />
      <input placeholder="Capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
      <button onClick={handleEdit} className="btn-save">Request Edit</button>
      <button onClick={onClose} className="btn-cancel">Cancel</button>
    </div>
  );
};

export default EditVehicleModal;
