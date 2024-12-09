"use client";

import React, { useState } from "react";
import { useUserContext } from "@/context/UserContext";

const roles: Array<"Admin" | "Manager" | "Staff" | "Read-Only"> = [
  "Admin",
  "Manager",
  "Staff",
  "Read-Only",
];

const AccessControl: React.FC = () => {
  const { users, updateUserRole, checkPermission } = useUserContext();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [newRole, setNewRole] = useState<"Admin" | "Manager" | "Staff" | "Read-Only" | "">("");

  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId);
    const selectedUser = users.find((user) => user.id === userId);
    setNewRole(selectedUser?.role || "");
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewRole(e.target.value as "Admin" | "Manager" | "Staff" | "Read-Only" | "");
  };

  const handleUpdateRole = () => {
    if (selectedUserId && newRole && roles.includes(newRole)) {
      updateUserRole(selectedUserId, newRole);
      setSelectedUserId(null);
      setNewRole("");
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Access Control Management
      </h2>

      {/* User List */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-200">Select a User</h3>
        <ul className="space-y-2">
          {users.map((user) => (
            <li
              key={user.id}
              className={`p-2 rounded cursor-pointer ${
                selectedUserId === user.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
              onClick={() => handleUserSelect(user.id)}
            >
              {user.name} - {user.role}
            </li>
          ))}
        </ul>
      </div>

      {/* Role Assignment */}
      {selectedUserId && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-200">Update Role</h3>
          <select
            value={newRole}
            onChange={handleRoleChange}
            className="w-full p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <button
            onClick={handleUpdateRole}
            className="mt-4 w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
          >
            Update Role
          </button>
        </div>
      )}

      {/* Permissions Overview */}
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-200">Permissions Overview</h3>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="p-2 border text-left">Role</th>
              <th className="p-2 border text-left">Can Manage Users</th>
              <th className="p-2 border text-left">Can View Reports</th>
              <th className="p-2 border text-left">Can Edit Trips</th>
              <th className="p-2 border text-left">Can View Audit Logs</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role} className="border-b">
                <td className="p-2 border">{role}</td>
                <td className="p-2 border">{checkPermission(role, "manage_users") ? "✅" : "❌"}</td>
                <td className="p-2 border">{checkPermission(role, "view_reports") ? "✅" : "❌"}</td>
                <td className="p-2 border">{checkPermission(role, "edit_trips") ? "✅" : "❌"}</td>
                <td className="p-2 border">{checkPermission(role, "view_audit_logs") ? "✅" : "❌"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccessControl;
