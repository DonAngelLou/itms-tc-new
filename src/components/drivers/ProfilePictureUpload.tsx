// src/components/drivers/ProfilePictureUpload.tsx
"use client";

import React, { useState } from "react";

interface Props {
  driverId: string;
  onUpload: (picture: string) => void;
}

const ProfilePictureUpload: React.FC<Props> = ({ driverId, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          onUpload(reader.result);
          alert("Profile picture uploaded successfully!");
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="flex flex-col items-start">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-2 text-gray-100"
      />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
      >
        Upload
      </button>
    </div>
  );
};

export default ProfilePictureUpload;
