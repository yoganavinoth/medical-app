interface TestimonialCardProps {
  name: string;
  content: string;
  rating: number;
  image: string;
  since: string;
}

export default function TestimonialCard({ name, content, rating, image, since }: TestimonialCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
      <div className="flex text-accent mb-4">
        {[...Array(Math.floor(rating))].map((_, i) => (
          <i key={i} className="ri-star-fill"></i>
        ))}
        {rating % 1 !== 0 && <i className="ri-star-half-fill"></i>}
      </div>
      <p className="text-gray-600 mb-4">
        "{content}"
      </p>
      <div className="flex items-center">
        <img 
          src={image}
          className="w-10 h-10 rounded-full object-cover"
          alt={name}
        />
        <div className="ml-3">
          <h4 className="font-medium text-sm">{name}</h4>
          <p className="text-xs text-gray-500">Patient since {since}</p>
        </div>
      </div>
    </div>
  );
}
