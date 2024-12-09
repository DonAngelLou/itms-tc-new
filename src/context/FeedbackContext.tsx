// src/context/FeedbackContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Feedback {
  id: string;
  vehicleId: string;
  tripId: string;
  message: string;
  rating: number;
  date: string;
}

interface SupportRequest {
  id: string;
  title: string;
  description: string;
  status: "open" | "in-progress" | "resolved";
}

interface FeedbackContextType {
  feedbacks: Feedback[];
  supportRequests: SupportRequest[];
  addFeedback: (feedback: Feedback) => void;
  addSupportRequest: (request: SupportRequest) => void;
}

const mockFeedbacks: Feedback[] = [
  { id: "1", vehicleId: "101", tripId: "501", message: "Great service!", rating: 5, date: "2024-11-01" },
  { id: "2", vehicleId: "102", tripId: "502", message: "Delayed trip.", rating: 2, date: "2024-11-02" },
];

const mockSupportRequests: SupportRequest[] = [
  { id: "1", title: "Refund Request", description: "I want a refund for the cancelled trip.", status: "open" },
  { id: "2", title: "Lost Item", description: "I left my bag on the bus.", status: "in-progress" },
];

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export const FeedbackProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(mockFeedbacks);
  const [supportRequests, setSupportRequests] = useState<SupportRequest[]>(mockSupportRequests);

  const addFeedback = (feedback: Feedback) => setFeedbacks((prev) => [...prev, feedback]);
  const addSupportRequest = (request: SupportRequest) => setSupportRequests((prev) => [...prev, request]);

  return (
    <FeedbackContext.Provider value={{ feedbacks, supportRequests, addFeedback, addSupportRequest }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedbackContext = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error("useFeedbackContext must be used within a FeedbackProvider");
  }
  return context;
};
