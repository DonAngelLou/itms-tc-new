// src/components/reports/ReportFilter.tsx
import React from "react";

const ReportFilter: React.FC = () => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-100">Filter Reports</h3>
      <select className="p-2 rounded bg-gray-700 text-gray-100 w-full">
        <option value="all">All</option>
        <option value="vehicle">By Vehicle</option>
        <option value="trip">By Trip</option>
      </select>
    </div>
  );
};

export default ReportFilter;
