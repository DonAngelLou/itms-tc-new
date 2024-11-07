// src/app/shared/NFCButton.tsx
"use client";

import React from 'react';
import { updateNFC } from '@/lib/api';

interface NFCButtonProps {
    driverId: number;
}

export default function NFCButton({ driverId }: NFCButtonProps) {
    const handleNFCUpdate = async () => {
        await updateNFC(driverId);
        alert('NFC tap time updated');
    };

    return <button onClick={handleNFCUpdate}>Update NFC Tap</button>;
}
