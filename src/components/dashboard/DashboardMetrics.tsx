// src/components/DashboardMetrics.tsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';

interface Metrics {
  totalBookings: number;
  totalRevenue: number;
  totalTrips: number;
}

export default function DashboardMetrics() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const response = await axiosInstance.get('/dashboard/statistics/');
        setMetrics(response.data);
      } catch (error) {
        console.error('Failed to fetch metrics:', error);
      }
    }
    fetchMetrics();
  }, []);

  if (!metrics) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="p-4 bg-white shadow rounded-lg">
        <h3 className="text-lg font-semibold">Total Bookings</h3>
        <p className="text-2xl">{metrics.totalBookings}</p>
      </div>
      <div className="p-4 bg-white shadow rounded-lg">
        <h3 className="text-lg font-semibold">Total Revenue</h3>
        <p className="text-2xl">${metrics.totalRevenue}</p>
      </div>
      <div className="p-4 bg-white shadow rounded-lg">
        <h3 className="text-lg font-semibold">Total Trips</h3>
        <p className="text-2xl">{metrics.totalTrips}</p>
      </div>
    </div>
  );
}
