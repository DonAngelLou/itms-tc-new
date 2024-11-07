// src/app/vehicles/VehicleList.tsx

import React, { useEffect, useState } from 'react';
import { fetchVehicles } from '@/lib/api';
import VehicleCard from '@/components/vehicles/VehicleCard';
import { Vehicle } from '@/types/vehicleTypes';

export default function VehicleList() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);  // Explicitly set vehicles type to Vehicle array
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const loadVehicles = async () => {
            const data = await fetchVehicles();
            setVehicles(data);
        };
        loadVehicles();
    }, []);

    const filteredVehicles = vehicles.filter((vehicle) =>
        vehicle.type.includes(filter)
    );

    return (
        <div>
            <input 
                type="text" 
                placeholder="Filter by type" 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)} 
            />
            <div>
                {filteredVehicles.map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
            </div>
        </div>
    );
}
