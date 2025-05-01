import { useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import ServiceCard from "@/components/ServiceCard";
import FeatureCard from "@/components/FeatureCard";
import TestimonialCard from "@/components/TestimonialCard";
import { Service } from "@shared/schema";
import { features, testimonials } from "@/lib/medical-services";

export default function Home() {
  const [location, setLocation] = useLocation();
  const servicesRef = useRef<HTMLElement>(null);
  
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });
  
  useEffect(() => {
    // Handle hash navigation
    if (location.includes('#')) {
      const id = location.split('#')[1];
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-8 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
                Advanced Healthcare <span className="text-primary">At Your Fingertips</span>
              </h1>
              <p className="text-gray-600 mb-8 text-lg">
                Connect with specialists, book appointments, and access medical services from anywhere, anytime.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#services" 
                  className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-all text-center"
                >
                  Explore Services
                </a>
                <Link href="/appointments">
                  <span className="block bg-white border border-primary text-primary hover:bg-primary/5 px-4 py-2 rounded-lg font-medium transition-all text-center cursor-pointer">
                    Book Appointment
                  </span>
                </Link>
              </div>
            </motion.div>
            <motion.div 
              className="md:w-1/2 flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500&q=80" 
                alt="Doctor with digital tablet" 
                className="rounded-lg shadow-lg object-cover h-[400px] w-full md:w-auto" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={servicesRef} className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Our Medical Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Access a wide range of professional healthcare services through our platform. Select a service to get started.
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-[200px] animate-pulse">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mb-4"></div>
                  <div className="h-5 bg-gray-200 rounded mb-4 w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2 w-full"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2 w-5/6"></div>
                  <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services?.map((service) => (
                <ServiceCard 
                  key={service.id}
                  id={service.id}
                  name={service.name}
                  description={service.description}
                  icon={service.iconName}
                />
              ))}
            </div>
          )}
          
          <div className="text-center mt-8">
            <Link href="/services">
              <span className="text-primary font-medium hover:underline flex items-center mx-auto justify-center cursor-pointer">
                <span>View all services</span>
                <i className="ri-arrow-right-s-line ml-1"></i>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Why Choose MediConnect</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We combine medical expertise with cutting-edge technology to provide you with the best healthcare experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <FeatureCard 
                key={feature.id}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. See what patients have to say about their experience with MediConnect.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard 
                key={testimonial.id}
                name={testimonial.name}
                content={testimonial.content}
                rating={testimonial.rating}
                image={testimonial.image}
                since={testimonial.since}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Take Control of Your Health?</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Join thousands of patients who are already benefiting from our comprehensive healthcare platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#services" 
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-all text-center"
              >
                Explore Services
              </a>
              <Link href="/appointments">
                <span className="block bg-white border border-primary text-primary hover:bg-primary/5 px-4 py-2 rounded-lg font-medium transition-all text-center cursor-pointer">
                  Book Appointment
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
