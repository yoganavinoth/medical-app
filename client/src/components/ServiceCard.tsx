import { Link } from "wouter";
import { motion } from "framer-motion";

interface ServiceCardProps {
  id: number;
  name: string;
  description: string;
  icon: string;
}

export default function ServiceCard({ id, name, description, icon }: ServiceCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/services/${id}`}>
        <div className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden group cursor-pointer h-full">
          <div className="p-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all">
              <i className={`${icon} text-primary text-xl`}></i>
            </div>
            <h3 className="font-medium text-lg mb-2">{name}</h3>
            <p className="text-gray-600 text-sm">
              {description}
            </p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-primary font-medium">More info</span>
              <i className="ri-arrow-right-line text-primary"></i>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
