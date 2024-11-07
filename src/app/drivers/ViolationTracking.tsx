// src/app/drivers/ViolationTracking.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { fetchViolations } from '@/lib/api';
import { Violation } from '@/types/driverTypes';

interface ViolationTrackingProps {
    driverId: number;
}

export default function ViolationTracking({ driverId }: ViolationTrackingProps) {
    const [violations, setViolations] = useState<Violation[]>([]);

    useEffect(() => {
        const loadViolations = async () => {
            const data = await fetchViolations(driverId, 'driver');
            setViolations(data);
        };
        loadViolations();
    }, [driverId]);

    return (
        <div>
            <h4>Violations</h4>
            <ul>
                {violations.map((violation) => (
                    <li key={violation.id}>{violation.description}</li>
                ))}
            </ul>
        </div>
    );
}
