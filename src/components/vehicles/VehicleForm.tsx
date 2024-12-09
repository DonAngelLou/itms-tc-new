"use client";

import { useState, useEffect } from "react";
import { createVehicle, updateVehicle, getVehicleById } from "@/lib/api";
import { useRouter, useParams } from "next/navigation";

const VehicleForm = () => {
  const [vehicleData, setVehicleData] = useState({
    model_name: "",
    vehicle_type: "",
    capacity: 0,
    plate_number: "",
    status: "operational",
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const vehicleId = params?.id;

  useEffect(() => {
    if (vehicleId) {
      const fetchVehicle = async () => {
        try {
          const data = await getVehicleById(Number(vehicleId));
          setVehicleData(data);
        } catch (err) {
          console.error("Error fetching vehicle:", err);
          setError("Failed to load vehicle data.");
        }
      };
      fetchVehicle();
    }
  }, [vehicleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (vehicleId) {
        await updateVehicle(Number(vehicleId), vehicleData);
      } else {
        await createVehicle(vehicleData);
      }
      router.push("/vehicles");
    } catch (err) {
      console.error("Error saving vehicle:", err);
      setError("Failed to save vehicle. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setVehicleData({ ...vehicleData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="text-2xl font-bold mb-4">{vehicleId ? "Edit Vehicle" : "Add Vehicle"}</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <label className="block mb-2">Model Name</label>
        <input
          type="text"
          name="model_name"
          value={vehicleData.model_name}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Vehicle Type</label>
        <input
          type="text"
          name="vehicle_type"
          value={vehicleData.vehicle_type}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Capacity</label>
        <input
          type="number"
          name="capacity"
          value={vehicleData.capacity}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Plate Number</label>
        <input
          type="text"
          name="plate_number"
          value={vehicleData.plate_number}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Status</label>
        <select
          name="status"
          value={vehicleData.status}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
        >
          <option value="operational">Operational</option>
          <option value="maintenance">Maintenance</option>
          <option value="parked">Parked</option>
        </select>
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        {vehicleId ? "Update Vehicle" : "Create Vehicle"}
      </button>
    </form>
  );
};

export default VehicleForm;
