// src/app/user/page.tsx
"use client";

import React from "react";
import { useUserContext } from "@/context/UserContext";
import UserProfile from "@/components/user/UserProfile";
import AdminManageUsers from "@/components/user/AdminManageUsers";
import AuditLogs from "@/components/user/AuditLogs";
import AccessControl from "@/components/user/AccessControl";

export default function UserPage() {
  // Access the UserContext
  const { users, checkPermission } = useUserContext();

  // Mock current user (for testing), replace with actual user session data
  const currentUser = users.find((user) => user.id === "1");

  // If no current user is found, display an error message
  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-center text-red-500 text-lg">User not found</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">User Management</h1>

      {/* User Profile Section */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">User Profile</h2>
        <UserProfile userId={currentUser.id} />
      </section>

      {/* Admin Manage Users Section (Only for users with manage_users permission) */}
      {checkPermission(currentUser.role, "manage_users") && (
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Manage Users</h2>
          <AdminManageUsers />
        </section>
      )}

      {/* Access Control Section (Only for users with manage_access_control permission) */}
      {checkPermission(currentUser.role, "manage_access_control") && (
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Access Control</h2>
          <AccessControl />
        </section>
      )}

      {/* Audit Logs Section (Only for users with view_audit_logs permission) */}
      {checkPermission(currentUser.role, "view_audit_logs") && (
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Audit Logs</h2>
          <AuditLogs />
        </section>
      )}
    </div>
  );
}
