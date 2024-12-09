// src/app/reports/page.tsx
"use client";

import React from "react";
import FeedbackList from "@/components/reports/FeedbackList";
import FeedbackAnalysis from "@/components/reports/FeedbackAnalysis";
import SupportRequestForm from "@/components/reports/SupportRequestForm";
import ReportFilter from "@/components/reports/ReportFilter";
import { FeedbackProvider } from "@/context/FeedbackContext";

export default function ReportsPage() {
  return (
    <FeedbackProvider>
      <div className="p-6 bg-gray-900 rounded-lg shadow-md space-y-8">
        <h2 className="text-2xl font-semibold text-gray-100">Reports & Feedback</h2>
        <ReportFilter />
        <FeedbackList />
        <FeedbackAnalysis />
        <SupportRequestForm />
      </div>
    </FeedbackProvider>
  );
}
