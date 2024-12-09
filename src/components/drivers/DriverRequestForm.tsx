// src/components/drivers/DriverRequestForm.tsx
"use client";

import React, { useState } from "react";
import { useDriverContext } from "@/context/DriverContext";

interface DriverRequestFormProps {
  actionType: "add" | "edit" | "delete";
  driverId?: string;
}

const DriverRequestForm: React.FC<DriverRequestFormProps> = ({ actionType, driverId }) => {
  const { submitDriverRequest } = useDriverContext();
  const [name, setName] = useState("");
  const [license, setLicense] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    const requestData = {
      actionType,
      driverId,
      name,
      license,
      reason,
    };
    submitDriverRequest(requestData);
    setName("");
    setLicense("");
    setReason("");
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-100">
        {actionType === "add" ? "Request to Add Driver" : actionType === "edit" ? "Request to Edit Driver" : "Request to Delete Driver"}
      </h3>
      {actionType !== "delete" && (
        <>
          <input
            type="text"
            placeholder="Driver Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 mb-4 w-full rounded bg-gray-700 text-gray-100"
          />
          <input
            type="text"
            placeholder="License Number"
            value={license}
            onChange={(e) => setLicense(e.target.value)}
            className="p-2 mb-4 w-full rounded bg-gray-700 text-gray-100"
          />
        </>
      )}
      <textarea
        placeholder="Reason for request"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="p-2 mb-4 w-full rounded bg-gray-700 text-gray-100"
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
      >
        Submit Request
      </button>
    </div>
  );
};

export default DriverRequestForm;
