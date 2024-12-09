// src/components/support/SupportRequestForm.tsx
import React, { useState } from "react";
import { useFeedbackContext } from "@/context/FeedbackContext";

const SupportRequestForm: React.FC = () => {
  const { addSupportRequest } = useFeedbackContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (title && description) {
      addSupportRequest({ id: Date.now().toString(), title, description, status: "open" });
      setTitle("");
      setDescription("");
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-100">Submit Support Request</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="p-2 rounded bg-gray-700 text-gray-100 w-full mb-4"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="p-2 rounded bg-gray-700 text-gray-100 w-full mb-4"
      />
      <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
        Submit
      </button>
    </div>
  );
};

export default SupportRequestForm;
