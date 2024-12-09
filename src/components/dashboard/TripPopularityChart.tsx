// TripPopularityChart.tsx
import React from "react";
import { Bar } from "react-chartjs-2";

const TripPopularityChart: React.FC = () => {
  const data = {
    labels: ["City A", "City B", "City C"],
    datasets: [
      {
        label: "Trips",
        data: [50, 75, 100],
        backgroundColor: ["hsl(60, 65%, 50%)", "hsl(180, 65%, 50%)", "hsl(300, 65%, 50%)"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "hsl(0, 0%, 30%)" } },
    },
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-100 mb-4">Trip Popularity</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default TripPopularityChart;
