// src/components/TripPopularityChart.tsx
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axiosInstance from '@/lib/axiosInstance';

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
  }[];
}

export default function TripPopularityChart() {
  const [chartData, setChartData] = useState<ChartData>({ labels: [], datasets: [] });

  useEffect(() => {
    async function fetchTripPopularity() {
      try {
        const response = await axiosInstance.get('/dashboard/stats/');
        const destinations = response.data.trip_popularity.map((item: any) => item.destination);
        const counts = response.data.trip_popularity.map((item: any) => item.count);

        setChartData({
          labels: destinations,
          datasets: [
            {
              label: 'Trip Popularity',
              data: counts,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
          ],
        });
      } catch (error) {
        console.error('Failed to fetch trip popularity data:', error);
      }
    }
    fetchTripPopularity();
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Trip Popularity</h3>
      <Pie data={chartData} />
    </div>
  );
}
