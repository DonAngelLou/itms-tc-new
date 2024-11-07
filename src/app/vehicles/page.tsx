// src/app/vehicles/page.tsx
"use client";

import React from 'react';
import VehicleList from '@/components/vehicles/VehicleList';

export default function VehiclesPage() {
    return (
        <div>
            <h1>Vehicles</h1>
            <VehicleList />
        </div>
    );
}
