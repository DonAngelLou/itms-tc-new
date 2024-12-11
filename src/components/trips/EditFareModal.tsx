'use client'

import React, { useState, useEffect } from 'react'
import { useTripContext, Trip, updateFare } from '@/context/TripContext'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

interface EditFareModalProps {
  isOpen: boolean
  onClose: () => void
}

const EditFareModal: React.FC<EditFareModalProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useTripContext()
  const [fares, setFares] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    const initialFares = state.trips.reduce((acc, trip) => {
      acc[trip.id] = trip.fare
      return acc
    }, {} as { [key: string]: number })
    setFares(initialFares)
  }, [state.trips])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    Object.entries(fares).forEach(([tripId, fare]) => {
      updateFare(dispatch, tripId, fare)
    })
    toast({
      title: "Fares Updated",
      description: "Trip fares have been successfully updated.",
    })
    onClose()
  }

  const handleChange = (tripId: string, value: string) => {
    setFares((prev) => ({ ...prev, [tripId]: parseFloat(value) || 0 }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Trip Fares</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {state.trips.map((trip) => (
            <div key={trip.id}>
              <Label htmlFor={`fare-${trip.id}`}>{trip.destination} ({trip.date})</Label>
              <Input
                id={`fare-${trip.id}`}
                name={`fare-${trip.id}`}
                type="number"
                value={fares[trip.id] || 0}
                onChange={(e) => handleChange(trip.id, e.target.value)}
                required
              />
            </div>
          ))}
          <Button type="submit">Update Fares</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditFareModal

