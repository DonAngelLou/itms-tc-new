// src/components/FeedbackAnalysis.tsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';

export default function FeedbackAnalysis() {
  const [analysis, setAnalysis] = useState({ avgRating: 0, totalFeedback: 0 });

  useEffect(() => {
    async function fetchAnalysis() {
      try {
        const response = await axiosInstance.get('/feedback-analysis/');
        setAnalysis(response.data);
      } catch (error) {
        console.error('Error fetching feedback analysis:', error);
      }
    }
    fetchAnalysis();
  }, []);

  return (
    <div>
      <h4>Feedback Analysis</h4>
      <p>Average Rating: {analysis.avgRating}</p>
      <p>Total Feedback Count: {analysis.totalFeedback}</p>
    </div>
  );
}
