// src/components/DriverCard.tsx

import React from 'react';
import { Driver } from '@/types/driverTypes';

interface DriverCardProps {
    driver: Driver;
}

export default function DriverCard({ driver }: DriverCardProps) {
    return (
        <div className="p-4 border rounded shadow-sm">
            <img 
                src={driver.profile_picture || '/default-profile.png'} 
                alt={`${driver.name}'s profile`} 
                className="w-16 h-16 rounded-full mb-2"
            />
            <h3 className="text-lg font-semibold">{driver.name}</h3>
            <p>Status: {driver.status}</p>
            <p>License: {driver.license_number}</p>
            <p>Last NFC Tap: {driver.last_nfc_tap_time ? new Date(driver.last_nfc_tap_time).toLocaleString() : 'N/A'}</p>
        </div>
    );
}
