// src/app/vehicles/VehicleDetails.tsx

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchVehicleDetails, fetchVehicleViolations } from '@/lib/api';
import QRCodeModal from '@/app/vehicles/QRCodeModal';
import ViolationList from '@/app/vehicles/ViolationList';
import VehicleStatusUpdate from '@/app/vehicles/VehicleStatusUpdate';
import { Vehicle } from '@/types/vehicleTypes';

export default function VehicleDetails() {
    const router = useRouter();
    const { vehicleId } = router.query;
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [violations, setViolations] = useState([]);

    useEffect(() => {
        const loadVehicle = async () => {
            if (vehicleId) {
                const data = await fetchVehicleDetails(Number(vehicleId));
                setVehicle(data);
                const violationData = await fetchVehicleViolations(Number(vehicleId));
                setViolations(violationData);
            }
        };
        loadVehicle();
    }, [vehicleId]);

    if (!vehicle) return <p>Loading...</p>;

    return (
        <div>
            <h2>{vehicle.model}</h2>
            <p>Type: {vehicle.type}</p>
            <p>Year: {vehicle.year}</p>
            <p>Status: {vehicle.status}</p>
            <QRCodeModal vehicle={vehicle} />
            <VehicleStatusUpdate vehicleId={vehicle.id} />
            <ViolationList violations={violations} />
        </div>
    );
}
