// src/components/ReportList.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    const [reportData, setReportData] = useState<ReportItem[]>([]); // Specify type as an array of ReportItem

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get<ReportItem[]>('/api/reports', { params: filters });
            setReportData(response.data);
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
