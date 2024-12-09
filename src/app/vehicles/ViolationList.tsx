"use client";

import React from "react";

interface ViolationListProps {
  violations: string[];
}

const ViolationList: React.FC<ViolationListProps> = ({ violations }) => {
  if (violations.length === 0) return <p>No violations recorded.</p>;

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Violations</h3>
      <ul>
        {violations.map((violation, index) => (
          <li key={index} className="bg-red-800 p-2 rounded mt-2">{violation}</li>
        ))}
      </ul>
    </div>
  );
};

export default ViolationList;
