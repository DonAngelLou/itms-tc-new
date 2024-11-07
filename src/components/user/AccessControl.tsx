// src/components/user/AccessControl.tsx
"use client";

import React, { ReactNode } from "react";
import { useUser } from "@/hooks/useUser"; // Custom hook to fetch user data

interface AccessControlProps {
  allowedRoles: string[];
  children: ReactNode;
}

const AccessControl: React.FC<AccessControlProps> = ({ allowedRoles, children }) => {
  const { user } = useUser();

  if (!user || !allowedRoles.includes(user.role)) {
    return null; // Hide the component if the user doesn't have the required role
  }

  return <>{children}</>;
};

export default AccessControl;
