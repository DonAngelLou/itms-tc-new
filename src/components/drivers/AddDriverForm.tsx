"use client";

import React, { useState } from "react";
import { useDriverContext } from "@/context/DriverContext";
import { TravelStatus } from "@/context/DriverContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface AddDriverFormProps {
  onClose: () => void;
}

const AddDriverForm: React.FC<AddDriverFormProps> = ({ onClose }) => {
  const { addDriverRequest } = useDriverContext();
  const [name, setName] = useState("");
  const [licenseInfo, setLicenseInfo] = useState("");
  const [type, setType] = useState<"Operator" | "Rounder">("Operator");
  const [applicationStatus, setApplicationStatus] = useState<"On Process" | "Get NFC" | "Active" | "Inactive">("On Process");

  const handleSubmit = () => {
    if (!name || !licenseInfo) {
      alert("Please fill in all fields.");
      return;
    }

    const newDriverData = {
      name,
      profilePicture: "/images/default.png",
      licenseInfo,
      applicationStatus,
      travelStatus: TravelStatus.NoTrip,
      type,
      vehicleInfo: type === "Operator" ? "Bus - Plate #XYZ-1234" : undefined,
      nfcCode: "NFC-00000",
      lastNfcTap: null,
      violations: [],
      tripHistory: [],
    };

    addDriverRequest({
      id: Date.now().toString(),
      type: "Add",
      driverData: newDriverData,
      status: "Pending",
    });

    alert("Driver request submitted.");
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Driver</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="license" className="text-right">
              License Info
            </Label>
            <Input
              id="license"
              value={licenseInfo}
              onChange={(e) => setLicenseInfo(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select
              value={type}
              onValueChange={(value) => setType(value as "Operator" | "Rounder")}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select driver type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Operator">Operator</SelectItem>
                <SelectItem value="Rounder">Rounder</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select
              value={applicationStatus}
              onValueChange={(value) => setApplicationStatus(value as "On Process" | "Get NFC" | "Active" | "Inactive")}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="On Process">On Process</SelectItem>
                <SelectItem value="Get NFC">Get NFC</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddDriverForm;

