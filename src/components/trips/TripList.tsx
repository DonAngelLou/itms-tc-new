'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format, parseISO } from 'date-fns'
import { useTripContext, Trip } from '@/context/TripContext'
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Bell, Users, Package } from 'lucide-react'

interface TripListProps {
  onSelectTrip: (trip: Trip) => void
}

const TripList: React.FC<TripListProps> = ({ onSelectTrip }) => {
  const { state } = useTripContext()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [filterStatus, setFilterStatus] = useState<'all' | 'upcoming' | 'departed'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTrips = state.trips.filter((trip) => {
    const dateMatch = selectedDate
      ? trip.date === format(selectedDate, 'yyyy-MM-dd')
      : true
    const statusMatch = filterStatus === 'all' ? true : trip.status === filterStatus
    const searchMatch = trip.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    return dateMatch && statusMatch && searchMatch
  })

  const sortedTrips = [...filteredTrips].sort((a, b) => {
    const dateA = parseISO(`${a.date}T${a.time}`)
    const dateB = parseISO(`${b.date}T${b.time}`)
    return dateA.getTime() - dateB.getTime()
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
        />
        <div className="flex space-x-4">
          <Select value={filterStatus} onValueChange={(value: 'all' | 'upcoming' | 'departed') => setFilterStatus(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="departed">Departed</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Search trips"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64"
          />
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {sortedTrips.map((trip) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6" onClick={() => onSelectTrip(trip)}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{trip.destination}</h3>
                      <p className="text-sm text-gray-500">{trip.companyName}</p>
                    </div>
                    {state.notifications.some(n => n.tripId === trip.id) && (
                      <Bell className="text-yellow-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {format(parseISO(`${trip.date}T${trip.time}`), 'PPpp')}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        trip.status === 'upcoming'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {trip.status}
                    </span>
                    <span className="text-lg font-semibold">${trip.fare}</span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                      <Users size={16} className="mr-1" />
                      <p className="text-sm">{trip.passengers.length}</p>
                    </div>
                    <div className="flex items-center">
                      <Package size={16} className="mr-1" />
                      <p className="text-sm">{trip.packages.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default TripList

