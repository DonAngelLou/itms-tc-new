// src/types/driverTypes.ts

export interface Driver {
    id: number;
    name: string;
    license_number: string;
    status: string;
    profile_picture?: string;
    last_nfc_tap_time?: string;
}

export interface Violation {
    id: number;
    description: string;
    date: string;
    resolved: boolean;
}
