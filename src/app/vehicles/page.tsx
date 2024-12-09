"use client";

import React, { useState } from 'react';
import { VehicleProvider } from '@/context/VehicleProvider';
import VehicleTable from '@/components/vehicles/VehicleTable';
import VehicleDetailsModal from '@/components/vehicles/VehicleDetailsModal';

const VehicleManagementPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(null);

  const handleOpenModal = (vehicleId: number) => {
    setSelectedVehicleId(vehicleId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedVehicleId(null);
    setIsModalOpen(false);
  };

  return (
    <VehicleProvider>
      <div className="vehicle-management-page p-4">
        <h1 className="text-xl font-bold mb-4">Vehicle Management</h1>
        <VehicleTable onVehicleSelect={handleOpenModal} />
        {isModalOpen && selectedVehicleId !== null && (
          <VehicleDetailsModal
            isOpen={isModalOpen}
            vehicleId={selectedVehicleId}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </VehicleProvider>
  );
};

export default VehicleManagementPage;
