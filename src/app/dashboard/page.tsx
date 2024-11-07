// src/app/dashboard/page.tsx
"use client";

import React from 'react';
import DashboardMetrics from '@/components/dashboard/DashboardMetrics';
import RecentBookings from '@/components/dashboard/RecentBookings';
import BookingTrendsChart from '@/components/dashboard/BookingTrendsChart';
import RevenueByVehicleChart from '@/components/dashboard/RevenueByVehicleChart';
import TripPopularityChart from '@/components/dashboard/TripPopularityChart';

export default function Dashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <DashboardMetrics />
      <RecentBookings />
      <BookingTrendsChart />
      <RevenueByVehicleChart />
      <TripPopularityChart />
    </div>
  );
}
