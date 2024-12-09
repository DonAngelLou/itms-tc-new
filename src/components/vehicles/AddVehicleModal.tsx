// AddVehicleModal.tsx
import React, { useState } from "react";
import { useVehicleContext } from "@/context/VehicleProvider";

const AddVehicleModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { requestAddVehicle } = useVehicleContext();
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [capacity, setCapacity] = useState("");

  const handleAdd = async () => {
    await requestAddVehicle({
      model,
      year: parseInt(year),
      color,
      capacity: parseInt(capacity),
      status: "Operational",
      violations: [],
    });
    onClose();
  };

  return (
    <div className="modal">
      <h2>Add Vehicle</h2>
      <input placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} />
      <input placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} />
      <input placeholder="Color" value={color} onChange={(e) => setColor(e.target.value)} />
      <input placeholder="Capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
      <button onClick={handleAdd}>Request Add</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default AddVehicleModal;
