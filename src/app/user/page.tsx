// src/app/user/page.tsx
"use client";

import React from "react";
import UserProfile from "@/components/user/UserProfile";
import AdminManageUsers from "@/components/user/AdminManageUsers";
import AccessControl from "@/components/user/AccessControl";
import AuditLogs from "@/components/user/AuditLogs";

const UserPage: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-semibold">User Management</h2>
      
      {/* User Profile Section */}
      <div>
        <h3 className="text-lg font-semibold">My Profile</h3>
        <UserProfile />
      </div>
      
      {/* Admin-Only Section: Manage Users */}
      <AccessControl allowedRoles={["Admin"]}>
        <div className="mt-8">
          <h3 className="text-lg font-semibold">Manage Users</h3>
          <AdminManageUsers />
        </div>
      </AccessControl>

      {/* Admin-Only Section: Audit Logs */}
      <AccessControl allowedRoles={["Admin"]}>
        <div className="mt-8">
          <h3 className="text-lg font-semibold">Audit Logs</h3>
          <AuditLogs />
        </div>
      </AccessControl>
    </div>
  );
};

export default UserPage;
