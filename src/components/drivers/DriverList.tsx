"use client";

import React, { useState } from "react";
import { useDriverContext } from "@/context/DriverContext";
import DriverDetailsModal from "@/components/drivers/DriverDetailsModal";
import AddDriverForm from "@/components/drivers/AddDriverForm";
import { Plus, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ScrollArea,
  ScrollBar,
} from "@/components/ui/scroll-area";
import { VehicleProvider } from "@/context/VehicleProvider";

const DriverList: React.FC = () => {
  const { drivers } = useDriverContext();
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleViewDetails = (driverId: string) => {
    setSelectedDriverId(driverId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedDriverId(null);
    setIsModalOpen(false);
  };

  const handleAddDriver = () => {
    setIsAddFormOpen(true);
  };

  const handleCloseAddForm = () => {
    setIsAddFormOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-500 hover:bg-green-600";
      case "inactive":
        return "bg-red-500 hover:bg-red-600";
      case "pending":
        return "bg-yellow-500 hover:bg-yellow-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader className="px-0 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-2xl font-bold">Driver Management</CardTitle>
          <Button onClick={handleAddDriver} className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Add New Driver
          </Button>
        </div>
        <div className="flex items-center space-x-2 mt-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search drivers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0 sm:px-6">
        <ScrollArea className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[150px]">Name</TableHead>
                <TableHead className="min-w-[100px]">Status</TableHead>
                <TableHead className="min-w-[100px]">Type</TableHead>
                <TableHead className="min-w-[120px]">Travel Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDrivers.map((driver) => (
                <TableRow
                  key={driver.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleViewDetails(driver.id)}
                >
                  <TableCell className="font-medium">{driver.name}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(driver.applicationStatus)}>
                      {driver.applicationStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{driver.type}</TableCell>
                  <TableCell>{driver.travelStatus}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>

      {isModalOpen && selectedDriverId && (
        <VehicleProvider>
          <DriverDetailsModal driverId={selectedDriverId} onClose={handleCloseModal} />
        </VehicleProvider>
      )}
      {isAddFormOpen && <AddDriverForm onClose={handleCloseAddForm} />}
    </Card>
  );
};

export default DriverList;

