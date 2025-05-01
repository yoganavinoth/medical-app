import { useState } from "react";
import { cn, generateCalendarDays } from "@/lib/utils";

interface AppointmentCalendarProps {
  onDateSelect: (date: Date) => void;
  selectedDate: Date | null;
}

export default function AppointmentCalendar({ onDateSelect, selectedDate }: AppointmentCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const calendarDays = generateCalendarDays(currentYear, currentMonth);
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false;
    
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <button 
          className="text-primary hover:text-primary/80"
          onClick={goToPreviousMonth}
          aria-label="Previous month"
        >
          <i className="ri-arrow-left-s-line"></i>
        </button>
        <h4 className="font-medium">{monthNames[currentMonth]} {currentYear}</h4>
        <button 
          className="text-primary hover:text-primary/80"
          onClick={goToNextMonth}
          aria-label="Next month"
        >
          <i className="ri-arrow-right-s-line"></i>
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-2 text-center">
        <div className="text-xs text-gray-500">Mo</div>
        <div className="text-xs text-gray-500">Tu</div>
        <div className="text-xs text-gray-500">We</div>
        <div className="text-xs text-gray-500">Th</div>
        <div className="text-xs text-gray-500">Fr</div>
        <div className="text-xs text-gray-500">Sa</div>
        <div className="text-xs text-gray-500">Su</div>
        
        {calendarDays.map((day, index) => (
          <div 
            key={index}
            className={cn(
              "text-center py-1 cursor-pointer",
              !day.currentMonth && "text-gray-400",
              day.currentMonth && !isPastDate(day.date) && "hover:bg-primary/10 rounded-full",
              isDateSelected(day.date) && "bg-primary text-white rounded-full",
              isToday(day.date) && !isDateSelected(day.date) && "border border-primary rounded-full",
              isPastDate(day.date) && day.currentMonth && "text-gray-300 cursor-not-allowed"
            )}
            onClick={() => {
              if (day.currentMonth && !isPastDate(day.date)) {
                onDateSelect(day.date);
              }
            }}
          >
            {day.day}
          </div>
        ))}
      </div>
    </div>
  );
}
