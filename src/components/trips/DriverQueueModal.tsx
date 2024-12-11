'use client'

import { useState } from 'react'
import { useTripContext, queueDriver } from '@/context/TripContext'
import { useDriverContext } from '@/context/DriverContext'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

interface DriverQueueModalProps {
  isOpen: boolean
  onClose: () => void
}

const DriverQueueModal: React.FC<DriverQueueModalProps> = ({ isOpen, onClose }) => {
  const { dispatch, state } = useTripContext()
  const { drivers } = useDriverContext()
  const [nfcCode, setNfcCode] = useState('')
  const { toast } = useToast()

  const handleQueue = () => {
    const driver = drivers.find(d => d.nfcCode === nfcCode)
    if (driver) {
      if (state.driverQueue.includes(driver.id)) {
        toast({
          title: "Already Queued",
          description: `Driver ${driver.name} is already in the queue.`,
        })
      } else {
        queueDriver(dispatch, driver)
        toast({
          title: "Driver Queued",
          description: `Driver ${driver.name} has been added to the queue.`,
        })
      }
    } else {
      toast({
        title: "Invalid NFC",
        description: "No driver found with this NFC code.",
        variant: "destructive",
      })
    }
    setNfcCode('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Queue Driver</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Enter NFC Code"
            value={nfcCode}
            onChange={(e) => setNfcCode(e.target.value)}
          />
          <Button onClick={handleQueue}>Queue Driver</Button>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Current Queue</h3>
          <ul className="space-y-2">
            {state.driverQueue.map((driverId, index) => {
              const driver = drivers.find(d => d.id === driverId)
              return driver ? (
                <li key={driver.id} className="bg-gray-100 p-2 rounded">
                  {index + 1}. {driver.name} (NFC: {driver.nfcCode})
                </li>
              ) : null
            })}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DriverQueueModal

