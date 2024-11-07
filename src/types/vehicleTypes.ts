// src/types/vehicleTypes.ts

export interface Vehicle {
    id: number;
    model: string;
    type: string;
    year: number;
    status: string;
}

export interface Violation {
    id: number;
    description: string;
    status: string;
}