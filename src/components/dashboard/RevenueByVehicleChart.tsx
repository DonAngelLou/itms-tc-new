// RevenueByVehicleChart.tsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueByVehicleChart: React.FC = () => {
  const data = {
    labels: ["Bus", "Van", "Car"],
    datasets: [
      {
        label: "Revenue",
        data: [30000, 20000, 15000],
        backgroundColor: ["#4F46E5", "#60A5FA", "#34D399"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Revenue by Vehicle Type" },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, grid: { color: "rgba(255, 255, 255, 0.1)" } },
    },
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-100 mb-4">Revenue by Vehicle Type</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default RevenueByVehicleChart;
