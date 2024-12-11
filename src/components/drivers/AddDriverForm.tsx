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
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AddDriverFormProps {
  onClose: () => void;
}

interface Driver {
  id: string;
  name: string;
  citizenship: string;
  address: string;
  type: "Operator" | "Rounder";
  profilePicture: string;
  licenseInfo: string;
  applicationStatus: "On Process" | "Approved" | "Rejected";
  travelStatus: TravelStatus;
  nfcCode: string;
  lastNfcTap: Date | null;
  violations: any[];
  tripHistory: any[];
  vehicleInfo?: {
    type: "Van" | "Bus";
    seatingCapacity: string;
    franchiseNumber: string;
    plateNumber: string;
  };
}


const AddDriverForm: React.FC<AddDriverFormProps> = ({ onClose }) => {
  const { addDriverRequest } = useDriverContext();
  const [name, setName] = useState("");
  const [citizenship, setCitizenship] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState<"Operator" | "Rounder">("Operator");
  const [vehicleType, setVehicleType] = useState<"Van" | "Bus">("Van");
  const [seatingCapacity, setSeatingCapacity] = useState("");
  const [franchiseNumber, setFranchiseNumber] = useState("");
  const [plateNumber, setPlateNumber] = useState("");

  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [driverLicense, setDriverLicense] = useState<File | null>(null);
  const [vehicleFront, setVehicleFront] = useState<File | null>(null);
  const [vehicleBack, setVehicleBack] = useState<File | null>(null);
  const [vehicleLeft, setVehicleLeft] = useState<File | null>(null);
  const [vehicleRight, setVehicleRight] = useState<File | null>(null);
  const [orCr, setOrCr] = useState<File | null>(null);
  const [franchiseDocuments, setFranchiseDocuments] = useState<File | null>(null);
  const [landTransportWorthiness, setLandTransportWorthiness] = useState<File | null>(null);

  const [licenseInfo, setLicenseInfo] = useState("");
  const [applicationStatus, setApplicationStatus] = useState<Driver["applicationStatus"]>("On Process");
  const [nfcCode, setNfcCode] = useState("");

  const handleFileChange = (setter: React.Dispatch<React.SetStateAction<File | null>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!name || !citizenship || !address || !type || !licenseInfo) {
      alert("Please fill in all required fields.");
      return;
    }

    const newDriverData: Omit<Driver, "id"> = {
      name,
      citizenship,
      address,
      type,
      profilePicture: profilePicture ? URL.createObjectURL(profilePicture) : "/default-profile.png",
      licenseInfo,
      applicationStatus,
      travelStatus: TravelStatus.NoTrip,
      nfcCode: nfcCode || "NFC-" + Math.random().toString(36).substr(2, 5),
      lastNfcTap: null,
      violations: [],
      tripHistory: [],
      vehicleInfo: type === "Operator" ? {
        type: vehicleType,
        seatingCapacity,
        franchiseNumber,
        plateNumber,
      } : undefined,
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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Driver</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="profilePicture" className="text-right">
                Profile Picture
              </Label>
              <Input
                id="profilePicture"
                type="file"
                onChange={handleFileChange(setProfilePicture)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="citizenship" className="text-right">
                Citizenship
              </Label>
              <Input
                id="citizenship"
                value={citizenship}
                onChange={(e) => setCitizenship(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="col-span-3"
                placeholder="No. Street, Barangay, City/municipality"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="driverLicense" className="text-right">
                Driver's License
              </Label>
              <Input
                id="driverLicense"
                type="file"
                onChange={handleFileChange(setDriverLicense)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="licenseInfo" className="text-right">
                License Info
              </Label>
              <Input
                id="licenseInfo"
                value={licenseInfo}
                onChange={(e) => setLicenseInfo(e.target.value)}
                className="col-span-3"
                required
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
            {type === "Operator" && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="vehicleType" className="text-right">
                    Vehicle Type
                  </Label>
                  <Select
                    value={vehicleType}
                    onValueChange={(value) => setVehicleType(value as "Van" | "Bus")}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Van">Van</SelectItem>
                      <SelectItem value="Bus">Bus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="seatingCapacity" className="text-right">
                    Seating Capacity
                  </Label>
                  <Input
                    id="seatingCapacity"
                    value={seatingCapacity}
                    onChange={(e) => setSeatingCapacity(e.target.value)}
                    className="col-span-3"
                    type="number"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="franchiseNumber" className="text-right">
                    Franchise Number
                  </Label>
                  <Input
                    id="franchiseNumber"
                    value={franchiseNumber}
                    onChange={(e) => setFranchiseNumber(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="plateNumber" className="text-right">
                    Plate Number
                  </Label>
                  <Input
                    id="plateNumber"
                    value={plateNumber}
                    onChange={(e) => setPlateNumber(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="vehicleFront" className="text-right">
                    Vehicle Front
                  </Label>
                  <Input
                    id="vehicleFront"
                    type="file"
                    onChange={handleFileChange(setVehicleFront)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="vehicleBack" className="text-right">
                    Vehicle Back
                  </Label>
                  <Input
                    id="vehicleBack"
                    type="file"
                    onChange={handleFileChange(setVehicleBack)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="vehicleLeft" className="text-right">
                    Vehicle Left
                  </Label>
                  <Input
                    id="vehicleLeft"
                    type="file"
                    onChange={handleFileChange(setVehicleLeft)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="vehicleRight" className="text-right">
                    Vehicle Right
                  </Label>
                  <Input
                    id="vehicleRight"
                    type="file"
                    onChange={handleFileChange(setVehicleRight)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="orCr" className="text-right">
                    O.R. and C.R.
                  </Label>
                  <Input
                    id="orCr"
                    type="file"
                    onChange={handleFileChange(setOrCr)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="franchiseDocuments" className="text-right">
                    Franchise Documents
                  </Label>
                  <Input
                    id="franchiseDocuments"
                    type="file"
                    onChange={handleFileChange(setFranchiseDocuments)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="landTransportWorthiness" className="text-right">
                    Land Transport Worthiness
                  </Label>
                  <Input
                    id="landTransportWorthiness"
                    type="file"
                    onChange={handleFileChange(setLandTransportWorthiness)}
                    className="col-span-3"
                  />
                </div>
              </>
            )}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddDriverForm;

