'use client'

import { useState } from 'react'
import { TripProvider, useTripContext, Trip } from '@/context/TripContext'
import { DriverProvider } from '@/context/DriverContext'
import { motion, AnimatePresence } from 'framer-motion'
import TripList from '@/components/trips/TripList'
import TripDetails from '@/components/trips/TripDetails'
import CreateTripModal from '@/components/trips/CreateTripModal'
import EditFareModal from '@/components/trips/EditFareModal'
import DriverQueueModal from '@/components/trips/DriverQueueModal'
import { Button } from '@/components/ui/button'
import { PlusCircle, DollarSign, Bell, Users } from 'lucide-react'

function Home() {
  const { state } = useTripContext()
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditFareModalOpen, setIsEditFareModalOpen] = useState(false)
  const [isDriverQueueModalOpen, setIsDriverQueueModalOpen] = useState(false)

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Trip Management</h1>
        <div className="flex space-x-4">
          <Button onClick={() => setIsCreateModalOpen(true)} className="flex items-center">
            <PlusCircle className="mr-2" size={20} />
            Create Trip
          </Button>
          <Button onClick={() => setIsEditFareModalOpen(true)} className="flex items-center">
            <DollarSign className="mr-2" size={20} />
            Edit Fares
          </Button>
          <Button onClick={() => setIsDriverQueueModalOpen(true)} className="flex items-center">
            <Users className="mr-2" size={20} />
            Driver Queue
          </Button>
          <Button variant="outline" className="relative">
            <Bell size={20} />
            {state.notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {state.notifications.length}
              </span>
            )}
          </Button>
        </div>
      </header>

      <main>
        <TripList onSelectTrip={setSelectedTrip} />
      </main>

      <AnimatePresence>
        {selectedTrip && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            <TripDetails trip={selectedTrip} onClose={() => setSelectedTrip(null)} />
          </motion.div>
        )}
      </AnimatePresence>

      <CreateTripModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      <EditFareModal isOpen={isEditFareModalOpen} onClose={() => setIsEditFareModalOpen(false)} />
      <DriverQueueModal isOpen={isDriverQueueModalOpen} onClose={() => setIsDriverQueueModalOpen(false)} />
    </div>
  )
}

export default function Page() {
  return (
    <TripProvider>
      <DriverProvider>
        <Home />
      </DriverProvider>
    </TripProvider>
  )
}

