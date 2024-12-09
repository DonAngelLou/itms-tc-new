"use client";

import React, { useState, useEffect } from "react";
import { useVehicleContext } from "@/context/VehicleProvider";
import QRCode from "qrcode";

// QR Code Component
const VehicleQRCode: React.FC<{ value: string }> = ({ value }) => {
  const [qrCodeSrc, setQrCodeSrc] = useState("");

  useEffect(() => {
    QRCode.toDataURL(value).then(setQrCodeSrc).catch(console.error);
  }, [value]);

  return qrCodeSrc ? (
    <img
      src={qrCodeSrc}
      alt="QR Code"
      className="w-32 h-32 rounded-md shadow-md"
    />
  ) : null;
};

interface VehicleDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicleId: number | null;
}

const VehicleDetailsModal: React.FC<VehicleDetailsModalProps> = ({
  isOpen,
  onClose,
  vehicleId,
}) => {
  const { fetchVehicleDetails, updateVehicleStatus, fetchViolations } =
    useVehicleContext();
  const [vehicleDetails, setVehicleDetails] = useState<any>(null);
  const [violations, setViolations] = useState<any[]>([]);
  const [confirmMaintenance, setConfirmMaintenance] = useState("");
  const [confirmDelete, setConfirmDelete] = useState("");

  useEffect(() => {
    if (isOpen && vehicleId) {
      fetchVehicleDetails(vehicleId).then((data) => {
        setVehicleDetails(data);
      });
      fetchViolations(vehicleId).then((data) => setViolations(data));
    }
  }, [isOpen, vehicleId]);

  const getImageURL = (path: string | null): string | undefined => {
    if (!path) return undefined;
    return path.startsWith("http")
      ? path
      : `http://127.0.0.1:8000${path}`;
  };

  // Handle Maintenance Status Update
  const handleMaintenanceUpdate = async () => {
    if (confirmMaintenance.toLowerCase() !== "maintenance") {
      alert('Please type "maintenance" to confirm the status update.');
      return;
    }
    if (vehicleDetails.status === "operational") {
      alert("You cannot change the status from operational to another status.");
      return;
    }
    try {
      await updateVehicleStatus(vehicleId!, "maintenance");
      alert("Vehicle status updated to maintenance.");
      setConfirmMaintenance("");
      onClose();
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Error updating vehicle status.");
    }
  };

  // Handle Request Delete Vehicle
  const handleRequestDelete = async () => {
    if (confirmDelete.toLowerCase() !== "delete") {
      alert('Please type "delete" to confirm the delete request.');
      return;
    }
    try {
      const response = await fetch(`/api/vehicles/${vehicleId}/request-delete/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        alert("Delete request submitted to LTT admin for approval.");
        onClose();
      } else {
        console.error("Failed to request delete:", await response.json());
        alert("Error requesting vehicle deletion.");
      }
    } catch (error) {
      console.error("Failed to request delete:", error);
      alert("Error requesting vehicle deletion.");
    }
  };

  if (!isOpen || !vehicleDetails) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="modal bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center border-b border-gray-300 dark:border-gray-700 p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Vehicle Details
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
            onClick={onClose}
          >
            ✖
          </button>
        </header>

        {/* Scrollable Content */}
        <div className="p-6 space-y-8 overflow-y-auto flex-1">
          {/* Vehicle Images */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Vehicle Images
            </h3>
            <div className="flex items-center justify-center">
              {vehicleDetails.picture ? (
                <img
                  src={getImageURL(vehicleDetails.picture)}
                  alt="Vehicle"
                  className="w-72 h-48 object-cover rounded-lg shadow-md"
                />
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No images available for this vehicle.
                </p>
              )}
            </div>
          </section>

          {/* General Information */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              General Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-gray-900 dark:text-gray-200">
              <p><span className="font-medium">Type:</span> {vehicleDetails.vehicle_type}</p>
              <p><span className="font-medium">Model:</span> {vehicleDetails.model_name}</p>
              <p><span className="font-medium">Year:</span> {vehicleDetails.year}</p>
              <p><span className="font-medium">Plate Number:</span> {vehicleDetails.plate_number}</p>
              <p><span className="font-medium">Color:</span> {vehicleDetails.color}</p>
              <p><span className="font-medium">Capacity:</span> {vehicleDetails.capacity}</p>
              <p><span className="font-medium">LTT Number:</span> {vehicleDetails.ltt_number || "N/A"}</p>
              <p><span className="font-medium">LTO Number:</span> {vehicleDetails.lto_number || "N/A"}</p>
              <p><span className="font-medium">Franchise Number:</span> {vehicleDetails.franchise_number || "N/A"}</p>
              <p><span className="font-medium">Status:</span> {vehicleDetails.status}</p>
              <p><span className="font-medium">Travel Status:</span> {vehicleDetails.travel_status || "N/A"}</p>
              <p><span className="font-medium">Violation Count:</span> {vehicleDetails.violation_count}</p>
              <p><span className="font-medium">Operator:</span> {vehicleDetails.operator}</p>
            </div>
          </section>

          {/* QR Code */}
          {vehicleDetails.qr_code && (
            <section>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center">
                QR Code
              </h3>
              <div className="flex justify-center">
                <VehicleQRCode value={vehicleDetails.qr_code} />
              </div>
            </section>
          )}

          {/* Violation List */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Recorded Violations
            </h3>
            <ul className="list-disc ml-5 space-y-2 text-gray-900 dark:text-gray-200">
              {violations.length > 0 ? (
                violations.map((violation: any, index: number) => (
                  <li key={index}>{violation.description}</li>
                ))
              ) : (
                <p>No recorded violations.</p>
              )}
            </ul>
          </section>

          {/* Maintenance Update */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Update Maintenance Status
            </h3>
            <div>
              <input
                type="text"
                placeholder='Type "maintenance" to confirm'
                value={confirmMaintenance}
                onChange={(e) => setConfirmMaintenance(e.target.value)}
                className="block w-full mt-2 border rounded-lg p-2"
              />
              <button
                className="bg-red-500 text-white px-6 py-2 mt-4 rounded-lg hover:bg-red-600"
                onClick={handleMaintenanceUpdate}
              >
                Update to Maintenance
              </button>
            </div>
          </section>

          {/* Request Delete Vehicle */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Request Delete Vehicle
            </h3>
            <div>
              <input
                type="text"
                placeholder='Type "delete" to confirm'
                value={confirmDelete}
                onChange={(e) => setConfirmDelete(e.target.value)}
                className="block w-full mt-2 border rounded-lg p-2"
              />
              <button
                className="bg-red-500 text-white px-6 py-2 mt-4 rounded-lg hover:bg-red-600"
                onClick={handleRequestDelete}
              >
                Request Delete
              </button>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="p-6 bg-gray-100 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700">
          <button
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
            onClick={onClose}
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};

export default VehicleDetailsModal;
