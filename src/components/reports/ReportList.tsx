// src/components/reports/ReportList.tsx

import React, { useEffect, useState } from 'react';
import { fetchReports } from '@/lib/api'; // Import the mock function

interface ReportListProps {
    filters: any;
}

// Define the structure of each report item
interface ReportItem {
    id: number;
    passenger_name: string;
    destination: string;
    status: string;
    vehicle_type: string;
}

export default function ReportList({ filters }: ReportListProps) {
    const [reportData, setReportData] = useState<ReportItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchReports(filters);  // Use mock data function
                setReportData(data);
            } catch (error) {
                console.error('Error fetching report data:', error);
            }
        };
        fetchData();
    }, [filters]);

    return (
        <div>
            <h2>Report Data</h2>
            <ul>
                {reportData.map((item) => (
                    <li key={item.id}>
                        {item.passenger_name} - {item.destination} - {item.status} - {item.vehicle_type}
                    </li>
                ))}
            </ul>
        </div>
    );
}
