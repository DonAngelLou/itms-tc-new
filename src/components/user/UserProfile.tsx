// src/components/UserProfile.tsx
"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";

interface UserProfile {
  id: number;
  username: string;
  email: string;
  role: string;
  contact_number?: string;
  backup_email?: string;
}

const UserProfile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [contactNumber, setContactNumber] = useState("");
  const [backupEmail, setBackupEmail] = useState("");
  const [error, setError] = useState<string | null>(null);  // New state for error messages
  const [loading, setLoading] = useState<boolean>(true);    // Loading state

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/user-profiles/me/");
        setProfile(response.data);
        setContactNumber(response.data.contact_number || "");
        setBackupEmail(response.data.backup_email || "");
        setLoading(false);
      } catch (err) {
        setError("Failed to load profile data. Please try again.");
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdateProfile = async () => {
    if (!profile) return;

    try {
      const updatedProfile = { contact_number: contactNumber, backup_email: backupEmail };
      await axiosInstance.patch(`/user-profiles/${profile.id}/`, updatedProfile);
      setIsEditing(false);
      setProfile((prev) => ({ ...prev!, ...updatedProfile }));
      setError(null);  // Clear any previous error message
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-semibold">User Profile</h2>
      <p><strong>Username:</strong> {profile?.username}</p>
      <p><strong>Email:</strong> {profile?.email}</p>
      <p><strong>Role:</strong> {profile?.role}</p>
      {isEditing ? (
        <>
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Contact Number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
          <input
            type="email"
            className="border p-2 rounded"
            placeholder="Backup Email"
            value={backupEmail}
            onChange={(e) => setBackupEmail(e.target.value)}
          />
          <button onClick={handleUpdateProfile} className="bg-blue-500 text-white p-2 rounded">Save</button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white p-2 rounded">Cancel</button>
        </>
      ) : (
        <>
          <p><strong>Contact Number:</strong> {profile?.contact_number || "N/A"}</p>
          <p><strong>Backup Email:</strong> {profile?.backup_email || "N/A"}</p>
          <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white p-2 rounded">Edit</button>
        </>
      )}
    </div>
  );
};

export default UserProfile;
