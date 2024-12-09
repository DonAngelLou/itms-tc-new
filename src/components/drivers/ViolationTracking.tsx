import React from "react";

interface Props {
  driverId: string;
  violations?: Array<{ date: string; description: string }>; // Make violations optional
}

const ViolationTracking: React.FC<Props> = ({ driverId, violations = [] }) => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-100 mb-4">Violations</h3>
      {violations.length === 0 ? (
        <p className="text-gray-400">No violations recorded.</p>
      ) : (
        <ul>
          {violations.map((violation, index) => (
            <li key={index} className="text-gray-300">
              <span>{violation.date}: </span>
              <span>{violation.description}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViolationTracking;
