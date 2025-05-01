export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: number;
  name: string;
  content: string;
  rating: number;
  image: string;
  since: string;
}
