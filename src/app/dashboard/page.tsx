// src/app/dashboard/page.tsx
"use client";

import React from "react";
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import BookingTrendsChart from "@/components/dashboard/BookingTrendsChart";
import RevenueByVehicleChart from "@/components/dashboard/RevenueByVehicleChart";
import TripPopularityChart from "@/components/dashboard/TripPopularityChart";
import RecentBookings from "@/components/dashboard/RecentBookings";

const DashboardPage: React.FC = () => {
  // Sample data for metrics and recent bookings
  const metrics = { totalBookings: 500, totalRevenue: 15000 };
  const recentBookings = [
    { id: "1", bookingCode: "B123", passengerName: "John Doe", status: "Confirmed" },
    { id: "2", bookingCode: "B124", passengerName: "Jane Smith", status: "Pending" },
    // Add more bookings here
  ];

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-100 mb-6">Dashboard</h1>
      <DashboardMetrics totalBookings={metrics.totalBookings} totalRevenue={metrics.totalRevenue} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BookingTrendsChart />
        <RevenueByVehicleChart />
      </div>

      <TripPopularityChart />

      <RecentBookings bookings={recentBookings} />
    </div>
  );
};

export default DashboardPage;
