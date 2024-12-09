// src/components/users/AuditLogs.tsx
"use client";

import React from "react";
import { useUserContext } from "@/context/UserContext";

export default function AuditLogs() {
  const { auditLogs } = useUserContext();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Audit Logs</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="p-2">Action</th>
            <th className="p-2">Performed By</th>
            <th className="p-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {auditLogs.map((log) => (
            <tr key={log.id}>
              <td className="p-2">{log.action}</td>
              <td className="p-2">{log.performedBy}</td>
              <td className="p-2">{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
