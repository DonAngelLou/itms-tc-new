// src/components/users/UserProfile.tsx
"use client";

import React, { useState } from "react";
import { useUserContext } from "@/context/UserContext";

interface UserProfileProps {
  userId: string;
}

export default function UserProfile({ userId }: UserProfileProps) {
  const { users, updateUserProfile } = useUserContext();
  const user = users.find((u) => u.id === userId);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  if (!user) {
    return <p>User not found</p>;
  }

  const handleUpdateProfile = () => {
    updateUserProfile(userId, { name, email });
    alert("Profile updated successfully");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">User Profile</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <button
        onClick={handleUpdateProfile}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
      >
        Update Profile
      </button>
    </div>
  );
}
