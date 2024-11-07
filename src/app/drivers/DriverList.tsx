"use client";

import React, { useEffect, useState } from 'react';
import { fetchDrivers } from '@/lib/api';
import DriverCard from '@/components/drivers/DriverCard';
import { Driver } from '@/types/driverTypes';

export default function DriverList() {
    const [drivers, setDrivers] = useState<Driver[]>([]);

    useEffect(() => {
        const loadDrivers = async () => {
            try {
                const data = await fetchDrivers();
                console.log("Fetched drivers:", data); // Log the fetched data
                if (Array.isArray(data)) {
                    setDrivers(data);
                } else {
                    console.error("Expected an array of drivers, but got:", data);
                    setDrivers([]); // Set to an empty array if data is not an array
                }
            } catch (error) {
                console.error("Error loading drivers:", error);
                setDrivers([]); // Handle the error by setting an empty array
            }
        };
        loadDrivers();
    }, []);

    return (
        <div>
            <h2>Driver List</h2>
            <div>
                {drivers.length > 0 ? (
                    drivers.map((driver) => (
                        <DriverCard key={driver.id} driver={driver} />
                    ))
                ) : (
                    <p>No drivers available.</p>
                )}
            </div>
        </div>
    );
}
