"use client";

import React, { useState, useEffect } from "react";
import { useDriverContext } from "@/context/DriverContext";
import { useVehicleContext } from "@/context/VehicleProvider";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Save, X, Trash2, AlertTriangle, ChevronDown, ChevronUp, AlertCircle, MessageSquare, PenToolIcon as Tool, Car } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DriverDetailsModalProps {
  driverId: string;
  onClose: () => void;
}

interface Vehicle {
  id: string;
  lttNumber: string;
  type: "Van" | "Bus";
  status: string;
  travelStatus: string;
  model: string;
  year: number;
  plateNumber: string;
  color: string;
  capacity: number;
  rightImage: string;
  leftImage: string;
  backImage: string;
  frontImage: string;
  violations: number;
  feedback: number;
}

const DriverDetailsModal: React.FC<DriverDetailsModalProps> = ({ driverId, onClose }) => {
  const { drivers, updateDriverStatus } = useDriverContext();
  const { fetchVehicles, updateVehicleStatus, fetchViolations, fetchFeedback } = useVehicleContext();
  const driver = drivers.find((d) => d.id === driverId);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDriver, setEditedDriver] = useState(driver);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [showViolations, setShowViolations] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [expandedVehicle, setExpandedVehicle] = useState<string | null>(null);
  const [showVehicleHistory, setShowVehicleHistory] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [showMaintenanceConfirmation, setShowMaintenanceConfirmation] = useState(false);
  const [maintenanceConfirmText, setMaintenanceConfirmText] = useState("");
  const [vehicleViolations, setVehicleViolations] = useState<any[]>([]);
  const [showVehicleViolations, setShowVehicleViolations] = useState(false);
  const [vehicleFeedback, setVehicleFeedback] = useState<any[]>([]);
  const [showVehicleFeedback, setShowVehicleFeedback] = useState(false);

  useEffect(() => {
    const loadVehicles = async () => {
      const driverVehicles = await fetchVehicles(driverId);
      setVehicles(driverVehicles);
    };
    loadVehicles();
  }, [driverId, fetchVehicles]);

  if (!driver) return null;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateDriverStatus(driverId, editedDriver?.applicationStatus || "Active");
    setIsEditing(false);
    alert("Edit request sent to LTT management for approval");
  };

  const handleDelete = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    if (deleteConfirmText === "Delete Driver") {
      alert("Delete request sent to LTT management for approval");
      setShowDeleteConfirmation(false);
      onClose();
    } else {
      alert("Please type 'Delete Driver' to confirm");
    }
  };

  const toggleVehicleExpand = (vehicleId: string) => {
    setExpandedVehicle(expandedVehicle === vehicleId ? null : vehicleId);
  };

  const handleVehicleSelect = async (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setShowVehicleHistory(true);
    const violations = await fetchViolations(parseInt(vehicle.id));
    setVehicleViolations(violations);
  };

  const handleMaintenanceClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setShowMaintenanceConfirmation(true);
  };

  const confirmMaintenance = async () => {
    if (maintenanceConfirmText === "Maintenance" && selectedVehicle) {
      await updateVehicleStatus(parseInt(selectedVehicle.id), "Maintenance");
      setVehicles(vehicles.map(v => 
        v.id === selectedVehicle.id ? { ...v, status: "Maintenance" } : v
      ));
      setShowMaintenanceConfirmation(false);
      setMaintenanceConfirmText("");
    } else {
      alert("Please type 'Maintenance' to confirm");
    }
  };

  const DriverInfo = () => (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{driver.name}</CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={handleEdit}>
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleDelete}>
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <Image
            src={driver.profilePicture || "/default-profile.png"}
            alt={`${driver.name}'s profile`}
            width={100}
            height={100}
            className="rounded-full"
          />
          <div>
            <p className="font-medium">License: {driver.licenseInfo}</p>
            <Badge variant="outline" className="mt-1">
              {driver.applicationStatus}
            </Badge>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-2">
          <p><strong>NFC Code:</strong> {driver.nfcCode}</p>
          <p><strong>Travel Status:</strong> {driver.travelStatus}</p>
          <p><strong>Citizenship:</strong> {editedDriver?.citizenship || "N/A"}</p>
          <p><strong>Address:</strong> {editedDriver?.address || "N/A"}</p>
          <p><strong>Type:</strong> {driver.type}</p>
        </div>

        <Button 
          variant="outline" 
          onClick={() => setShowViolations(true)}
          className="w-full mt-4"
        >
          Violations ({driver.violations ? driver.violations.length : 0})
        </Button>
      </CardContent>
    </Card>
  );

  const VehicleManagement = () => (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Vehicle Management</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-16rem)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>LTT number</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.map((vehicle) => (
                <React.Fragment key={vehicle.id}>
                  <TableRow
                    className={cn(
                      "cursor-pointer hover:bg-muted/50",
                      selectedVehicle?.id === vehicle.id && "bg-muted"
                    )}
                    onClick={() => toggleVehicleExpand(vehicle.id)}
                  >
                    <TableCell>{vehicle.lttNumber}</TableCell>
                    <TableCell>{vehicle.type}</TableCell>
                    <TableCell>{vehicle.status}</TableCell>
                    <TableCell>
                      {expandedVehicle === vehicle.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </TableCell>
                  </TableRow>
                  {expandedVehicle === vehicle.id && (
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Card className="bg-muted/20">
                          <CardHeader>
                            <CardTitle>Vehicle Information</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 gap-2 mb-4">
                              <p><strong>Travel Status:</strong> {vehicle.travelStatus}</p>
                              <p><strong>Model:</strong> {vehicle.model}</p>
                              <p><strong>Year:</strong> {vehicle.year}</p>
                              <p><strong>Plate Number:</strong> {vehicle.plateNumber}</p>
                              <p><strong>Color:</strong> {vehicle.color}</p>
                              <p><strong>Capacity:</strong> {vehicle.capacity}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mb-4">
                              <Image src={vehicle.rightImage || "/default-image.png"} alt="Right view" width={100} height={100} className="rounded-md" />
                              <Image src={vehicle.leftImage || "/default-image.png"} alt="Left view" width={100} height={100} className="rounded-md" />
                              <Image src={vehicle.backImage || "/default-image.png"} alt="Back view" width={100} height={100} className="rounded-md" />
                              <Image src={vehicle.frontImage || "/default-image.png"} alt="Front view" width={100} height={100} className="rounded-md" />
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleVehicleSelect(vehicle)}
                              >
                                <Car className="mr-2 h-4 w-4" />
                                View History
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setShowVehicleViolations(true)}
                              >
                                <AlertCircle className="mr-2 h-4 w-4" />
                                Violations ({vehicle.violations})
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setShowVehicleFeedback(true)}
                              >
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Feedback ({vehicle.feedback})
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleMaintenanceClick(vehicle)}
                              >
                                <Tool className="mr-2 h-4 w-4" />
                                Maintenance
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );

  const TravelHistory = () => (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Travel History</CardTitle>
          <Tabs defaultValue="driver" className="w-[200px]">
            <TabsList>
              <TabsTrigger value="driver" onClick={() => setShowVehicleHistory(false)}>Driver</TabsTrigger>
              <TabsTrigger value="vehicle" onClick={() => setShowVehicleHistory(true)} disabled={!selectedVehicle}>Vehicle</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-16rem)]">
          <AnimatePresence mode="wait">
            {showVehicleHistory ? (
              <motion.div
                key="vehicle-history"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Replace this with actual vehicle history data */}
                    <TableRow>
                      <TableCell>2024-01-15</TableCell>
                      <TableCell>{driver.name}</TableCell>
                      <TableCell>Regular Trip</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </motion.div>
            ) : (
              <motion.div
                key="driver-history"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {driver.tripHistory && driver.tripHistory.length > 0 ? (
                      driver.tripHistory.map((trip, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{trip}</TableCell>
                          <TableCell>Regular Trip</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={2}>No trip history available.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollArea>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-[90vw] w-[1200px] p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-[80vh]">
            <div className="bg-white rounded-l-lg shadow-md">
              <DriverInfo />
            </div>
            <div className="bg-white shadow-md">
              <VehicleManagement />
            </div>
            <div className="bg-white rounded-r-lg shadow-md">
              <TravelHistory />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteConfirmation} onOpenChange={setShowDeleteConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Driver Deletion</DialogTitle>
            <DialogDescription>
              This action will send a delete request to LTT management. To confirm, please type "Delete Driver" below.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={deleteConfirmText}
            onChange={(e) => setDeleteConfirmText(e.target.value)}
            placeholder="Type 'Delete Driver' to confirm"
          />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowDeleteConfirmation(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Confirm Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showViolations} onOpenChange={setShowViolations}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Driver Violations</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[300px]">
            {driver.violations && driver.violations.length > 0 ? (
              <ul className="space-y-2">
                {driver.violations.map((violation, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    {violation}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No violations recorded.</p>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={showMaintenanceConfirmation} onOpenChange={setShowMaintenanceConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Maintenance Status</DialogTitle>
            <DialogDescription>
              This action will change the vehicle status to Maintenance. To confirm, please type "Maintenance" below.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={maintenanceConfirmText}
            onChange={(e) => setMaintenanceConfirmText(e.target.value)}
            placeholder="Type 'Maintenance' to confirm"
          />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowMaintenanceConfirmation(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmMaintenance}>Confirm Maintenance</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showVehicleViolations} onOpenChange={setShowVehicleViolations}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vehicle Violations</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[300px]">
            {vehicleViolations.length > 0 ? (
              <ul className="space-y-2">
                {vehicleViolations.map((violation, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    {violation.description}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No violations recorded for this vehicle.</p>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={showVehicleFeedback} onOpenChange={setShowVehicleFeedback}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vehicle Feedback</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[300px]">
            {vehicleFeedback.length > 0 ? (
              <ul className="space-y-2">
                {vehicleFeedback.map((feedback, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-blue-500" />
                    {feedback.content}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No feedback recorded for this vehicle.</p>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DriverDetailsModal;

