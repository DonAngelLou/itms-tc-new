"use client";
import React, { useState } from "react";
import { useVehicleContext, VehicleStatus, VehicleType } from "@/context/VehicleProvider";
import VehicleDetailsModal from "@/components/vehicles/VehicleDetailsModal";
import { FaEye, FaQrcode, FaTrashAlt, FaWrench } from "react-icons/fa";

const VehicleList: React.FC = () => {
  const { vehicles, generateQRCode, submitRequest } = useVehicleContext();
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterType, setFilterType] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<VehicleStatus | "">("");

  const handleViewDetails = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedVehicleId(null);
    setIsModalOpen(false);
  };

  const handleGenerateQRCode = (vehicleId: string) => {
    generateQRCode(vehicleId);
    alert("QR Code generated successfully.");
  };

  const handleSubmitRequest = (vehicleId: string, type: "Edit" | "Delete") => {
    const reason = prompt(`Enter reason for ${type.toLowerCase()} request:`);
    if (reason) {
      submitRequest({
        id: Date.now().toString(),
        vehicleId,
        type,
        status: "Pending",
        reason,
      });
      alert(`${type} request submitted.`);
    }
  };

  const handleFilterTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
  };

  const handleFilterStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value as VehicleStatus | "");
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    return (
      (filterType ? vehicle.type === filterType : true) &&
      (filterStatus ? vehicle.status === filterStatus : true)
    );
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="mb-4 flex gap-4">
        <select value={filterType} onChange={handleFilterTypeChange} className="input-field w-full">
          <option value="">All Types</option>
          <option value={VehicleType.Bus}>Bus</option>
          <option value={VehicleType.Van}>Van</option>
        </select>
        <select value={filterStatus} onChange={handleFilterStatusChange} className="input-field w-full">
          <option value="">All Statuses</option>
          <option value={VehicleStatus.Parked}>Parked</option>
          <option value={VehicleStatus.Maintenance}>Maintenance</option>
          <option value={VehicleStatus.Operational}>Operational</option>
        </select>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="p-4">Model</th>
            <th className="p-4">Year</th>
            <th className="p-4">Color</th>
            <th className="p-4">Capacity</th>
            <th className="p-4">Type</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredVehicles.map((vehicle) => (
            <tr key={vehicle.id} className="border-b dark:border-gray-600">
              <td className="p-4">{vehicle.model}</td>
              <td className="p-4">{vehicle.year}</td>
              <td className="p-4">{vehicle.color}</td>
              <td className="p-4">{vehicle.capacity}</td>
              <td className="p-4">{vehicle.type}</td>
              <td className="p-4">{vehicle.status}</td>
              <td className="p-4 flex gap-2">
                <button onClick={() => handleViewDetails(vehicle.id)} className="text-blue-600 hover:text-blue-400">
                  <FaEye /> View
                </button>
                <button onClick={() => handleGenerateQRCode(vehicle.id)} className="text-green-600 hover:text-green-400">
                  <FaQrcode /> QR Code
                </button>
                <button onClick={() => handleSubmitRequest(vehicle.id, "Edit")} className="text-yellow-600 hover:text-yellow-400">
                  <FaWrench /> Request Edit
                </button>
                <button onClick={() => handleSubmitRequest(vehicle.id, "Delete")} className="text-red-600 hover:text-red-400">
                  <FaTrashAlt /> Request Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Vehicle Details Modal */}
      {isModalOpen && selectedVehicleId && (
        <VehicleDetailsModal vehicleId={selectedVehicleId} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default VehicleList;
