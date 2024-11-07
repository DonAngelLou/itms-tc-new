// src/components/ReportFilter.tsx

import React, { useState } from 'react';

interface ReportFilterProps {
    onFilterChange: (filters: any) => void;
}

export default function ReportFilter({ onFilterChange }: ReportFilterProps) {
    const [filters, setFilters] = useState({
        destination: '',
        vehicle_type: '',
        driver: '',
        start_date: '',
        end_date: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const applyFilters = () => {
        onFilterChange(filters);
    };

    return (
        <div className="filter-container">
            <input type="text" name="destination" placeholder="Destination" onChange={handleChange} />
            <input type="text" name="vehicle_type" placeholder="Vehicle Type" onChange={handleChange} />
            <input type="text" name="driver" placeholder="Driver" onChange={handleChange} />
            <input type="date" name="start_date" onChange={handleChange} />
            <input type="date" name="end_date" onChange={handleChange} />
            <button onClick={applyFilters}>Apply Filters</button>
        </div>
    );
}
