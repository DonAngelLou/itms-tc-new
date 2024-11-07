// src/app/vehicles/ViolationList.tsx
"use client";

import React from 'react';
import { Violation } from '@/types/vehicleTypes';

interface ViolationListProps {
    violations: Violation[];
}

export default function ViolationList({ violations }: ViolationListProps) {
    return (
        <div>
            <h3>Violations</h3>
            {violations.length > 0 ? (
                violations.map(violation => (
                    <div key={violation.id}>
                        <p>Violation: {violation.description}</p>
                        <p>Status: {violation.status}</p>
                    </div>
                ))
            ) : (
                <p>No violations recorded</p>
            )}
        </div>
    );
}
