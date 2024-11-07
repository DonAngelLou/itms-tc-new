// src/app/vehicles/VehicleStatusUpdate.tsx
"use client";

import React, { useState } from 'react';
import { updateVehicleStatus } from '@/lib/api';

interface VehicleStatusUpdateProps {
    vehicleId: number;
}

export default function VehicleStatusUpdate({ vehicleId }: VehicleStatusUpdateProps) {
    const [status, setStatus] = useState('');

    const handleStatusUpdate = async () => {
        await updateVehicleStatus(vehicleId, status);
        alert('Status updated');
    };

    return (
        <div>
            <select onChange={(e) => setStatus(e.target.value)} value={status}>
                <option value="parked">Parked</option>
                <option value="maintenance">Maintenance</option>
                <option value="operational">Operational</option>
            </select>
            <button onClick={handleStatusUpdate}>Update Status</button>
        </div>
    );
}
