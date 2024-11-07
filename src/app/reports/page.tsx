// src/app/reports/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { getAnalyticsData, getAdvancedAnalyticsData } from "@/lib/api";
import { Line, Bar } from "react-chartjs-2";
import ReportFilter from "@/components/reports/ReportFilter";
import ReportList from "@/components/reports/ReportList";
import FeedbackList from "@/components/reports/FeedbackList";
import SupportRequestForm from "@/components/reports/SupportRequestForm";
import FeedbackAnalysis from "@/components/reports/FeedbackAnalysis";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const ReportsPage: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<any | null>(null);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const data = await getAnalyticsData();
        setAnalyticsData(data);
      } catch (error) {
        console.error("Failed to fetch analytics data:", error);
      }
    }
    fetchAnalytics();
  }, []);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  if (!analyticsData) return <p>Loading analytics...</p>;

  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-semibold mb-4">Reports & Analytics</h2>

      {/* Booking and Revenue Trends */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Booking Trends</h3>
        <Line
          data={{
            labels: analyticsData.months,
            datasets: [
              {
                label: "Bookings",
                data: analyticsData.bookings,
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
              title: { display: true, text: "Monthly Bookings" },
            },
          }}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Revenue Trends</h3>
        <Bar
          data={{
            labels: analyticsData.months,
            datasets: [
              {
                label: "Revenue",
                data: analyticsData.revenue,
                backgroundColor: "#34D399",
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              title: { display: true, text: "Monthly Revenue" },
            },
          }}
        />
      </div>

      {/* Filters and Report Data */}
      <ReportFilter onFilterChange={handleFilterChange} />
      <ReportList filters={filters} />

      {/* Feedback and Support Management */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Feedback and Support Management</h3>
        <FeedbackList />
        <SupportRequestForm />
        <FeedbackAnalysis />
      </div>
    </div>
  );
};

export default ReportsPage;
