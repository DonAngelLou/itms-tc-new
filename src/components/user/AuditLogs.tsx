// src/components/user/AuditLogs.tsx
"use client";

import React, { useState, useEffect } from "react";
import axios from "@/lib/api";

const AuditLogs: React.FC = () => {
  const [auditLogs, setAuditLogs] = useState([]);
  const [filters, setFilters] = useState({ user: "", action: "", model: "" });

  useEffect(() => {
    fetchAuditLogs();
  }, [filters]);

  const fetchAuditLogs = async () => {
    try {
      const { data } = await axios.get("/audit-logs/", {
        params: filters,
      });
      setAuditLogs(data);
    } catch (error) {
      console.error("Error fetching audit logs:", error);
    }
  };

  const handleExport = async () => {
    try {
      const response = await axios.get("/audit-logs/export/", {
        params: filters,
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "audit_logs.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting audit logs:", error);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-4 bg-white rounded-md shadow">
      <h3 className="text-lg font-semibold mb-4">Audit Logs</h3>
      
      {/* Filters */}
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          name="user"
          placeholder="Filter by user"
          value={filters.user}
          onChange={handleFilterChange}
          className="p-2 border rounded-md"
        />
        <select
          name="action"
          value={filters.action}
          onChange={handleFilterChange}
          className="p-2 border rounded-md"
        >
          <option value="">Filter by action</option>
          <option value="CREATE">Create</option>
          <option value="UPDATE">Update</option>
          <option value="DELETE">Delete</option>
        </select>
        <input
          type="text"
          name="model"
          placeholder="Filter by model"
          value={filters.model}
          onChange={handleFilterChange}
          className="p-2 border rounded-md"
        />
        <button onClick={handleExport} className="p-2 bg-blue-600 text-white rounded-md">
          Export Logs
        </button>
      </div>

      {/* Logs Table */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">User</th>
            <th className="py-2 px-4 border-b">Action</th>
            <th className="py-2 px-4 border-b">Model</th>
            <th className="py-2 px-4 border-b">Object ID</th>
            <th className="py-2 px-4 border-b">Timestamp</th>
            <th className="py-2 px-4 border-b">Details</th>
          </tr>
        </thead>
        <tbody>
          {auditLogs.map((log: any, index: number) => (
            <tr key={index} className="text-center border-b">
              <td className="py-2 px-4">{log.user}</td>
              <td className="py-2 px-4">{log.action}</td>
              <td className="py-2 px-4">{log.model_name}</td>
              <td className="py-2 px-4">{log.object_id}</td>
              <td className="py-2 px-4">{new Date(log.timestamp).toLocaleString()}</td>
              <td className="py-2 px-4">{log.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditLogs;
