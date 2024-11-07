// src/app/drivers/page.tsx
"use client";

import React from 'react';
import DriverList from './DriverList';

export default function DriversPage() {
    return (
        <div>
            <h1>Drivers</h1>
            <DriverList />
        </div>
    );
}
