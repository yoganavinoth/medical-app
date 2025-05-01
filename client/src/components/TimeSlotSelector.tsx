import { TimeSlot } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TimeSlotSelectorProps {
  timeSlots: TimeSlot[];
  selectedTimeSlot: string | null;
  onSelectTimeSlot: (timeSlot: string) => void;
  date: Date | null;
}

export default function TimeSlotSelector({ 
  timeSlots, 
  selectedTimeSlot, 
  onSelectTimeSlot,
  date 
}: TimeSlotSelectorProps) {
  if (!date) {
    return (
      <div className="text-center py-4 text-gray-500">
        Please select a date to view available time slots
      </div>
    );
  }

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(date);

  return (
    <div>
      <h4 className="font-medium mb-3">Available Time Slots - {formattedDate}</h4>
      <div className="grid grid-cols-3 gap-2">
        {timeSlots.map((slot) => (
          <div 
            key={slot.id}
            className={cn(
              "text-center border rounded py-2 cursor-pointer transition-all",
              slot.available 
                ? selectedTimeSlot === slot.id 
                  ? "border-primary bg-primary/5" 
                  : "border-gray-200 hover:border-primary" 
                : "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
            )}
            onClick={() => {
              if (slot.available) {
                onSelectTimeSlot(slot.id);
              }
            }}
          >
            {slot.time}
          </div>
        ))}
      </div>
    </div>
  );
}
