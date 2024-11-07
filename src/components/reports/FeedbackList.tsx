// src/components/FeedbackList.tsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { FeedbackData } from '@/types/apiTypes';

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([]); // Define feedbacks as an array of FeedbackData
  const [filters, setFilters] = useState<{ vehicleId: string; tripId: string }>({ vehicleId: '', tripId: '' });

  useEffect(() => {
    async function fetchFeedback() {
      try {
        const response = await axiosInstance.get<FeedbackData[]>('/feedback/filter_by_vehicle_trip/', { params: filters });
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    }
    fetchFeedback();
  }, [filters]);

  return (
    <div>
      <h4>Customer Feedback</h4>
      <input
        type="text"
        placeholder="Vehicle ID"
        value={filters.vehicleId}
        onChange={(e) => setFilters({ ...filters, vehicleId: e.target.value })}
      />
      <input
        type="text"
        placeholder="Trip ID"
        value={filters.tripId}
        onChange={(e) => setFilters({ ...filters, tripId: e.target.value })}
      />
      <ul>
        {feedbacks.map((feedback) => (
          <li key={feedback.id}>
            <p>{feedback.feedback}</p>
            <span>Rating: {feedback.rating}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
