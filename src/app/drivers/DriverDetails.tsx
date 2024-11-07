// src/app/drivers/DriverDetails.tsx
"use client";

import React from 'react';
import { Driver } from '@/types/driverTypes';
import ProfilePictureUpload from '@/components/drivers/ProfilePictureUpload';
import ViolationTracking from '@/app/drivers/ViolationTracking';

interface DriverDetailsProps {
    driver: Driver;
}

export default function DriverDetails({ driver }: DriverDetailsProps) {
    return (
        <div>
            <h3>{driver.name} - Details</h3>
            <img src={driver.profile_picture} alt={`${driver.name}'s Profile`} />
            <ProfilePictureUpload driverId={driver.id} />
            <div>
                <p>License Number: {driver.license_number}</p>
                <p>Status: {driver.status}</p>
                <p>Last NFC Tap Time: {driver.last_nfc_tap_time}</p>
                <ViolationTracking driverId={driver.id} />
            </div>
        </div>
    );
}
