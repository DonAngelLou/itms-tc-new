// src/components/feedback/FeedbackList.tsx
import React from "react";
import { useFeedbackContext } from "@/context/FeedbackContext";

const FeedbackList: React.FC = () => {
  const { feedbacks } = useFeedbackContext();

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-100">Customer Feedback</h3>
      <ul className="space-y-4">
        {feedbacks.map((feedback) => (
          <li key={feedback.id} className="bg-gray-700 p-4 rounded-lg">
            <p><strong>Message:</strong> {feedback.message}</p>
            <p><strong>Rating:</strong> {feedback.rating} / 5</p>
            <p><strong>Date:</strong> {feedback.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackList;
