'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { format, parseISO } from 'date-fns'
import { useTripContext, Trip, addPassenger, updatePassengerOnboard, addPackage, updateDriver, updateVehicle, cancelTrip } from '@/context/TripContext'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { toast } from "@/hooks/use-toast"
import { Users, Package, Truck, AlertTriangle } from 'lucide-react'

interface TripDetailsProps {
  trip: Trip
  onClose: () => void
}

const TripDetails: React.FC<TripDetailsProps> = ({ trip, onClose }) => {
  const { dispatch } = useTripContext()
  const [newPassenger, setNewPassenger] = useState({ name: '', contactInfo: '', seatNumber: '' })
  const [newPackage, setNewPackage] = useState({ type: '', weight: 0, dimensions: '', recipient: '' })
  const [nfcCode, setNfcCode] = useState('')
  const [vehicleType, setVehicleType] = useState<'Bus' | 'Van'>(trip.vehicle?.type || 'Bus')
  const [plateNumber, setPlateNumber] = useState(trip.vehicle?.plateNumber || '')
  const [cancelConfirmation, setCancelConfirmation] = useState('')

  const handleAddPassenger = () => {
    addPassenger(dispatch, trip.id, newPassenger)
    setNewPassenger({ name: '', contactInfo: '', seatNumber: '' })
    toast({
      title: "Passenger Added",
      description: "New passenger has been added to the trip.",
    })
  }

  const handleOnboardPassenger = (passengerId: string) => {
    updatePassengerOnboard(dispatch, trip.id, passengerId, true)
    toast({
      title: "Passenger Onboarded",
      description: "Passenger has been marked as onboard.",
    })
  }

  const handleAddPackage = () => {
    addPackage(dispatch, trip.id, newPackage)
    setNewPackage({ type: '', weight: 0, dimensions: '', recipient: '' })
    toast({
      title: "Package Added",
      description: "New package has been added to the trip.",
    })
  }

  const handleUpdateDriver = () => {
    updateDriver(dispatch, trip.id, { id: Date.now().toString(), name: 'NFC Driver', nfcCode })
    setNfcCode('')
    toast({
      title: "Driver Updated",
      description: "Driver has been updated for the trip.",
    })
  }

  const handleUpdateVehicle = () => {
    updateVehicle(dispatch, trip.id, { id: Date.now().toString(), type: vehicleType, plateNumber })
    toast({
      title: "Vehicle Updated",
      description: "Vehicle information has been updated.",
    })
  }

  const handleCancelRequest = () => {
    if (cancelConfirmation === 'Cancel Trip') {
      cancelTrip(dispatch, trip.id)
      toast({
        title: "Trip Cancellation Requested",
        description: "A cancellation request has been sent to the admin.",
        variant: "destructive",
      })
      onClose()
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{trip.destination} Trip Details</DialogTitle>
          <DialogDescription>
            {format(parseISO(`${trip.date}T${trip.time}`), 'PPpp')} - {trip.companyName}
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="passengers">Passengers</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="driver">Driver & Vehicle</TabsTrigger>
          </TabsList>
          <TabsContent value="info">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold">Status: {trip.status}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Fare: ${trip.fare}</span>
              </div>
              <div>
                <Label>Destination</Label>
                <Input value={trip.destination} readOnly />
              </div>
              <div>
                <Label>Date</Label>
                <Input value={trip.date} readOnly />
              </div>
              <div>
                <Label>Time</Label>
                <Input value={trip.time} readOnly />
              </div>
            </motion.div>
          </TabsContent>
          <TabsContent value="passengers">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div>
                <h3 className="text-lg font-semibold">Current Passengers</h3>
                <ul className="space-y-2 mt-2">
                  {trip.passengers.map((passenger) => (
                    <li key={passenger.id} className="flex justify-between items-center p-2 bg-gray-100 rounded">
                      <span>
                        {passenger.name} - Seat: {passenger.seatNumber} - Booking Code: {passenger.bookingCode}
                      </span>
                      {!passenger.onboard && (
                        <Button onClick={() => handleOnboardPassenger(passenger.id)} size="sm">
                          Onboard
                        </Button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Add Passenger</h3>
                <div className="space-y-2 mt-2">
                  <Input
                    placeholder="Name"
                    value={newPassenger.name}
                    onChange={(e) => setNewPassenger({ ...newPassenger, name: e.target.value })}
                  />
                  <Input
                    placeholder="Contact Info"
                    value={newPassenger.contactInfo}
                    onChange={(e) => setNewPassenger({ ...newPassenger, contactInfo: e.target.value })}
                  />
                  <Input
                    placeholder="Seat Number"
                    value={newPassenger.seatNumber}
                    onChange={(e) => setNewPassenger({ ...newPassenger, seatNumber: e.target.value })}
                  />
                  <Button onClick={handleAddPassenger}>Add Passenger</Button>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          <TabsContent value="packages">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div>
                <h3 className="text-lg font-semibold">Current Packages</h3>
                <ul className="space-y-2 mt-2">
                  {trip.packages.map((pkg) => (
                    <li key={pkg.id} className="p-2 bg-gray-100 rounded">
                      {pkg.type} - Weight: {pkg.weight}kg, Dimensions: {pkg.dimensions}, Recipient: {pkg.recipient}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Add Package</h3>
                <div className="space-y-2 mt-2">
                  <Input
                    placeholder="Type"
                    value={newPackage.type}
                    onChange={(e) => setNewPackage({ ...newPackage, type: e.target.value })}
                  />
                  <Input
                    type="number"
                    placeholder="Weight (kg)"
                    value={newPackage.weight}
                    onChange={(e) => setNewPackage({ ...newPackage, weight: parseFloat(e.target.value) })}
                  />
                  <Input
                    placeholder="Dimensions"
                    value={newPackage.dimensions}
                    onChange={(e) => setNewPackage({ ...newPackage, dimensions: e.target.value })}
                  />
                  <Input
                    placeholder="Recipient"
                    value={newPackage.recipient}
                    onChange={(e) => setNewPackage({ ...newPackage, recipient: e.target.value })}
                  />
                  <Button onClick={handleAddPackage}>Add Package</Button>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          <TabsContent value="driver">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div>
                <h3 className="text-lg font-semibold">Current Driver</h3>
                <p>{trip.driver ? trip.driver.name : 'No driver assigned'}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Update Driver (NFC)</h3>
                <div className="space-y-2 mt-2">
                  <Input
                    placeholder="NFC Code"
                    value={nfcCode}
                    onChange={(e) => setNfcCode(e.target.value)}
                  />
                  <Button onClick={handleUpdateDriver}>Update Driver</Button>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Update Vehicle</h3>
                <div className="space-y-2 mt-2">
                  <Select value={vehicleType} onValueChange={(value: 'Bus' | 'Van') => setVehicleType(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bus">Bus</SelectItem>
                      <SelectItem value="Van">Van</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Plate Number"
                    value={plateNumber}
                    onChange={(e) => setPlateNumber(e.target.value)}
                  />
                  <Button onClick={handleUpdateVehicle}>Update Vehicle</Button>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Cancel Trip</h3>
          <div className="space-y-2 mt-2">
            <Input
              placeholder="Type 'Cancel Trip' to confirm"
              value={cancelConfirmation}
              onChange={(e) => setCancelConfirmation(e.target.value)}
            />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button disabled={cancelConfirmation !== 'Cancel Trip'}>
                  Request Cancellation
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will send a cancellation request to the admin. It cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleCancelRequest}>Confirm Cancellation</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TripDetails

