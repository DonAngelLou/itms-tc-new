// src/components/RevenueByVehicleChart.tsx
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axiosInstance from '@/lib/axiosInstance';

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}

export default function RevenueByVehicleChart() {
  const [chartData, setChartData] = useState<ChartData>({ labels: [], datasets: [] });

  useEffect(() => {
    async function fetchRevenueByVehicleType() {
      try {
        const response = await axiosInstance.get('/dashboard/stats/');
        const vehicleTypes = response.data.revenue_by_vehicle_type.map((item: any) => item.trip__vehicle__vehicle_type);
        const revenues = response.data.revenue_by_vehicle_type.map((item: any) => item.total_revenue);

        setChartData({
          labels: vehicleTypes,
          datasets: [
            {
              label: 'Revenue by Vehicle Type',
              data: revenues,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
            },
          ],
        });
      } catch (error) {
        console.error('Failed to fetch revenue data:', error);
      }
    }
    fetchRevenueByVehicleType();
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded-lg mb-6">
      <h3 className="text-lg font-semibold mb-4">Revenue by Vehicle Type</h3>
      <Bar data={chartData} />
    </div>
  );
}
