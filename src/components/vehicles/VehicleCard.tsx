// src/components/VehicleCard.tsx

import React from 'react';
import Link from 'next/link';
import { Vehicle } from '@/types/vehicleTypes';

interface VehicleCardProps {
    vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
    return (
        <Link href={`/vehicles/${vehicle.id}`}>
            <a>
                <div>
                    <h3>{vehicle.model}</h3>
                    <p>Type: {vehicle.type}</p>
                    <p>Status: {vehicle.status}</p>
                </div>
            </a>
        </Link>
    );
}
