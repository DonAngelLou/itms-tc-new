// src/components/user/AdminManageUsers.tsx
"use client";

import React from "react";
import { useUserContext } from "@/context/UserContext";

const AdminManageUsers: React.FC = () => {
  const { users, updateUserRole } = useUserContext();

  if (!Array.isArray(users)) {
    return <p className="text-center text-red-500">No users found.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user.id} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div>
              <strong>Name:</strong> {user.name}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Role:</strong> {user.role}
            </div>
            <button
              onClick={() => updateUserRole(user.id, "Staff")}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
            >
              Set Role to Staff
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminManageUsers;
