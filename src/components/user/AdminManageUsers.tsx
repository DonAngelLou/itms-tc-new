// src/components/AdminManageUsers.tsx
"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";
import AccessControl from "@/components/user/AccessControl";

interface UserProfile {
  id: number;
  username: string;
  role: string;
}

const AdminManageUsers: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axiosInstance.get("/user-profiles/");
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: number, newRole: string) => {
    await axiosInstance.patch(`/user-profiles/${userId}/`, { role: newRole });
    setUsers((prev) => prev.map(user => user.id === userId ? { ...user, role: newRole } : user));
  };

  return (
    <AccessControl allowedRoles={["Admin"]}>
      <div className="p-8 space-y-8">
        <h2 className="text-2xl font-semibold">Manage Users</h2>
        <table className="w-full border">
          <thead>
            <tr>
              <th className="p-2 border">Username</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="p-2 border">{user.username}</td>
                <td className="p-2 border">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    <option value="ReadOnly">ReadOnly</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                  </select>
                </td>
                <td className="p-2 border">
                  <button onClick={() => handleRoleChange(user.id, "ReadOnly")} className="bg-red-500 text-white p-2 rounded">Set ReadOnly</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AccessControl>
  );
};

export default AdminManageUsers;
