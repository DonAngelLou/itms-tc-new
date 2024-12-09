// src/components/feedback/FeedbackAnalysis.tsx
import React from "react";
import { useFeedbackContext } from "@/context/FeedbackContext";

const FeedbackAnalysis: React.FC = () => {
  const { feedbacks } = useFeedbackContext();
  const positiveFeedback = feedbacks.filter((fb) => fb.rating >= 4).length;
  const negativeFeedback = feedbacks.filter((fb) => fb.rating <= 2).length;

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-100">Feedback Analysis</h3>
      <p>Positive Feedback: {positiveFeedback}</p>
      <p>Negative Feedback: {negativeFeedback}</p>
    </div>
  );
};

export default FeedbackAnalysis;
