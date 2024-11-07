// src/app/vehicles/QRCodeModal.tsx
"use client";

import React from 'react';
import QRCode from 'react-qr-code';
import { Vehicle } from '@/types/vehicleTypes';

interface QRCodeModalProps {
    vehicle: Vehicle;
}

export default function QRCodeModal({ vehicle }: QRCodeModalProps) {
    return (
        <div>
            <h4>QR Code for {vehicle.model}</h4>
            <QRCode value={vehicle.id.toString()} />
        </div>
    );
}
