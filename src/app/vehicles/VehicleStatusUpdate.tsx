"use client";

import React, { useState } from "react";

const VehicleStatusUpdate: React.FC = () => {
  const [status, setStatus] = useState("Operational");

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <label className="block text-gray-100 font-semibold mb-2">Update Status</label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="p-2 bg-gray-700 text-gray-100 rounded w-full"
      >
        <option value="Operational">Operational</option>
        <option value="Maintenance">Maintenance</option>
        <option value="Parked">Parked</option>
      </select>
    </div>
  );
};

export default VehicleStatusUpdate;
