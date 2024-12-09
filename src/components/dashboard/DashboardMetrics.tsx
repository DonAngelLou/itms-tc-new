// DashboardMetrics.tsx
import React from "react";

interface MetricsProps {
  totalBookings: number;
  totalRevenue: number;
}

const DashboardMetrics: React.FC<MetricsProps> = ({ totalBookings, totalRevenue }) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="p-6 bg-gray-800 rounded-lg shadow-md text-center">
        <h3 className="text-lg font-semibold text-gray-100">Total Bookings</h3>
        <p className="text-3xl font-bold text-blue-500">{totalBookings}</p>
      </div>
      <div className="p-6 bg-gray-800 rounded-lg shadow-md text-center">
        <h3 className="text-lg font-semibold text-gray-100">Total Revenue</h3>
        <p className="text-3xl font-bold text-green-500">${totalRevenue.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default DashboardMetrics;
