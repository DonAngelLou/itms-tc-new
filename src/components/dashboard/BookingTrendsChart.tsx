// src/components/BookingTrendsChart.tsx
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axiosInstance from '@/lib/axiosInstance';

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    fill: boolean;
  }[];
}

export default function BookingTrendsChart() {
  const [chartData, setChartData] = useState<ChartData>({ labels: [], datasets: [] });

  useEffect(() => {
    async function fetchBookingTrends() {
      try {
        const response = await axiosInstance.get('/dashboard/stats/');
        const dates = response.data.bookings_over_time.map((item: any) => item.date);
        const bookings = response.data.bookings_over_time.map((item: any) => item.total_bookings);

        setChartData({
          labels: dates,
          datasets: [
            {
              label: 'Bookings Over Time',
              data: bookings,
              borderColor: 'rgba(75, 192, 192, 1)',
              fill: false,
            },
          ],
        });
      } catch (error) {
        console.error('Failed to fetch booking trends:', error);
      }
    }
    fetchBookingTrends();
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded-lg mb-6">
      <h3 className="text-lg font-semibold mb-4">Booking Trends</h3>
      <Line data={chartData} />
    </div>
  );
}
