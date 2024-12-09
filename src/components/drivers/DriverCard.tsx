// src/components/drivers/DriverCard.tsx
import React from "react";
import { useDriverContext } from "@/context/DriverContext";
import { Driver } from "@/context/DriverContext";
import ProfilePictureUpload from "./ProfilePictureUpload";
import ViolationTracking from "@/components/drivers/ViolationTracking";

interface DriverCardProps {
  driver: Driver;
}

const DriverCard: React.FC<DriverCardProps> = ({ driver }) => {
  const { uploadProfilePicture } = useDriverContext();

  // Function to handle profile picture upload
  const handleProfilePictureUpload = (picture: string) => {
    uploadProfilePicture(driver.id, picture);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-100">{driver.name}</h3>
      <p>License: {driver.license}</p>
      <p>Status: {driver.status}</p>
      <p>Last NFC Tap: {new Date(driver.lastNFCTap).toLocaleString()}</p>
      {/* Pass the required props to ProfilePictureUpload */}
      <ProfilePictureUpload driverId={driver.id} onUpload={handleProfilePictureUpload} />
      <ViolationTracking driverId={driver.id} violations={driver.violations || []} />
    </div>
  );
};

export default DriverCard;
