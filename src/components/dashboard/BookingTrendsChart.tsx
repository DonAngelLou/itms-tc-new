// BookingTrendsChart.tsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const BookingTrendsChart: React.FC = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Bookings",
        data: [10, 15, 20, 25, 30, 35],
        borderColor: "hsl(220, 100%, 65%)",
        backgroundColor: "rgba(220, 100%, 65%, 0.1)",
        pointBackgroundColor: "hsl(220, 100%, 65%)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        type: "category" as const, // Ensure TypeScript recognizes 'category' as a valid scale type
        grid: { display: false },
      },
      y: {
        grid: { color: "hsl(0, 0%, 30%)" },
      },
    },
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-100 mb-4">Booking Trends</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default BookingTrendsChart;
