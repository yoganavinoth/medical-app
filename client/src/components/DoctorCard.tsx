import { useState } from "react";
import { cn } from "@/lib/utils";

interface DoctorCardProps {
  id: number;
  name: string;
  specialty: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  selected?: boolean;
  onSelect?: (id: number) => void;
}

export default function DoctorCard({ 
  id, 
  name, 
  specialty, 
  imageUrl, 
  rating, 
  reviewCount, 
  selected = false,
  onSelect 
}: DoctorCardProps) {
  const handleClick = () => {
    if (onSelect) {
      onSelect(id);
    }
  };

  return (
    <div 
      className={cn(
        "border rounded-lg p-4 hover:border-primary cursor-pointer transition-all", 
        selected ? "border-primary" : "border-gray-200"
      )}
      onClick={handleClick}
    >
      <div className="flex items-center">
        <img 
          src={imageUrl}
          className={cn(
            "w-16 h-16 rounded-full object-cover", 
            selected ? "border-2 border-primary" : ""
          )}
          alt={name}
        />
        <div className="ml-4">
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-gray-600">{specialty}</p>
          <div className="flex items-center mt-1">
            <div className="flex text-accent">
              {[...Array(Math.floor(rating))].map((_, i) => (
                <i key={i} className="ri-star-fill text-sm"></i>
              ))}
              {rating % 1 !== 0 && <i className="ri-star-half-fill text-sm"></i>}
              {[...Array(5 - Math.ceil(rating))].map((_, i) => (
                <i key={i} className="ri-star-line text-sm"></i>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
}
