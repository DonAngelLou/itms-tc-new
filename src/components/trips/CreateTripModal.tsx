'use client'

import React, { useState } from 'react'
import { useTripContext, addTrip } from '@/context/TripContext'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

interface CreateTripModalProps {
  isOpen: boolean
  onClose: () => void
}

const CreateTripModal: React.FC<CreateTripModalProps> = ({ isOpen, onClose }) => {
  const { dispatch } = useTripContext()
  const [tripData, setTripData] = useState({
    companyName: '',
    destination: '',
    date: '',
    time: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addTrip(dispatch, {
      ...tripData,
      status: 'upcoming',
      passengers: [],
      packages: [],
      driver: null,
      vehicle: null,
      fare: 0,
    })
    setTripData({ companyName: '', destination: '', date: '', time: '' })
    toast({
      title: "Trip Created",
      description: "New trip has been successfully created.",
    })
    onClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTripData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Trip</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              name="companyName"
              value={tripData.companyName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="destination">Destination</Label>
            <Input
              id="destination"
              name="destination"
              value={tripData.destination}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={tripData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              name="time"
              type="time"
              value={tripData.time}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit">Create Trip</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateTripModal

