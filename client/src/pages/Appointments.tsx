import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Doctor } from "@shared/schema";
import { generateTimeSlots } from "@/lib/utils";
import { TimeSlot } from "@/lib/types";
import { toast } from "@/hooks/use-toast";

import DoctorCard from "@/components/DoctorCard";
import AppointmentCalendar from "@/components/AppointmentCalendar";
import TimeSlotSelector from "@/components/TimeSlotSelector";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Appointments() {
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  
  const { data: doctors = [], isLoading } = useQuery<Doctor[]>({
    queryKey: ['/api/doctors'],
  });
  
  const filteredDoctors = doctors.filter(doctor => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      doctor.name.toLowerCase().includes(query) ||
      doctor.specialty.toLowerCase().includes(query)
    );
  });
  
  useEffect(() => {
    if (selectedDate) {
      setTimeSlots(generateTimeSlots());
    }
  }, [selectedDate]);
  
  const bookMutation = useMutation({
    mutationFn: async () => {
      if (!selectedDoctorId || !selectedDate || !selectedTimeSlot) {
        throw new Error("Please select a doctor, date, and time");
      }
      
      const [hour, minute] = selectedTimeSlot.split('-').map(Number);
      const appointmentDate = new Date(selectedDate);
      appointmentDate.setHours(hour, minute, 0, 0);
      
      return apiRequest('POST', '/api/appointments', {
        userId: 1, // Using a default user ID for demo
        doctorId: selectedDoctorId,
        date: appointmentDate.toISOString(),
        status: 'scheduled'
      });
    },
    onSuccess: () => {
      toast({
        title: "Appointment Booked",
        description: "Your appointment has been scheduled successfully!",
        variant: "success",
      });
      
      // Reset selection
      setSelectedTimeSlot(null);
      
      // Invalidate appointments query
      queryClient.invalidateQueries({ queryKey: ['/api/appointments'] });
    },
    onError: (error) => {
      toast({
        title: "Booking Failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    }
  });

  const handleBookAppointment = () => {
    if (!selectedDoctorId) {
      toast({
        title: "Doctor Required",
        description: "Please select a doctor for your appointment.",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedDate) {
      toast({
        title: "Date Required",
        description: "Please select a date for your appointment.",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedTimeSlot) {
      toast({
        title: "Time Required",
        description: "Please select a time slot for your appointment.",
        variant: "destructive",
      });
      return;
    }
    
    bookMutation.mutate();
  };

  return (
    <div className="py-12 md:py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Book an Appointment</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Schedule a consultation with one of our specialists. Choose a doctor, select a date and time that works for you.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Doctor Selection Section */}
            <div className="border-b md:border-b-0 md:border-r border-gray-200 pb-6 md:pb-0 md:pr-8">
              <h3 className="text-xl font-semibold mb-4">Select a Doctor</h3>
              
              {/* Search Input */}
              <div className="relative mb-6">
                <Input 
                  type="text" 
                  placeholder="Search by name or specialty..." 
                  className="w-full pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <i className="ri-search-line absolute left-3 top-3 text-gray-400"></i>
              </div>
              
              {/* Doctor Cards */}
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {isLoading ? (
                  // Skeleton loading
                  [...Array(3)].map((_, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-4 animate-pulse">
                      <div className="flex items-center">
                        <div className="w-16 h-16 rounded-full bg-gray-200"></div>
                        <div className="ml-4 w-full">
                          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2 mb-1"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doctor) => (
                    <DoctorCard 
                      key={doctor.id}
                      id={doctor.id}
                      name={doctor.name}
                      specialty={doctor.specialty}
                      imageUrl={doctor.imageUrl || ''}
                      rating={doctor.rating || 4}
                      reviewCount={doctor.reviewCount || 0}
                      selected={selectedDoctorId === doctor.id}
                      onSelect={setSelectedDoctorId}
                    />
                  ))
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500">No doctors found matching your search</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Date & Time Selection */}
            <div className="md:pl-8">
              <h3 className="text-xl font-semibold mb-4">Select Date & Time</h3>
              
              {/* Calendar */}
              <div className="mb-6">
                <AppointmentCalendar 
                  onDateSelect={setSelectedDate} 
                  selectedDate={selectedDate}
                />
              </div>
              
              {/* Time Slots */}
              <TimeSlotSelector
                timeSlots={timeSlots}
                selectedTimeSlot={selectedTimeSlot}
                onSelectTimeSlot={setSelectedTimeSlot}
                date={selectedDate}
              />
              
              {/* Booking Button */}
              <div className="mt-8">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-medium transition-all"
                  onClick={handleBookAppointment}
                  disabled={bookMutation.isPending}
                >
                  {bookMutation.isPending ? "Processing..." : "Confirm Appointment"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
