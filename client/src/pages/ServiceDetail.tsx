import { useEffect } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Service } from "@shared/schema";
import { medicalServices } from "@/lib/medical-services";

export default function ServiceDetail() {
  const { id } = useParams();
  const serviceId = parseInt(id || "0");
  
  const { data: service, isLoading, error } = useQuery<Service>({
    queryKey: [`/api/services/${serviceId}`],
    enabled: !!serviceId && serviceId > 0,
  });

  // Fallback to local data if API fails
  const fallbackService = medicalServices.find(s => s.id === serviceId);
  const serviceData = service || fallbackService;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-8"></div>
            <div className="h-40 bg-gray-200 rounded mb-8"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !serviceData) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-8">The service you are looking for could not be found.</p>
          <Link href="/#services">
            <span className="inline-block bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-all cursor-pointer">
              Back to Services
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/#services">
          <span className="flex items-center text-primary font-medium mb-6 hover:underline cursor-pointer">
            <i className="ri-arrow-left-line mr-2"></i>
            Back to Services
          </span>
        </Link>
        
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <i className={`${
                'iconName' in serviceData 
                  ? serviceData.iconName 
                  : 'icon' in serviceData 
                    ? serviceData.icon 
                    : 'ri-service-line'
              } text-primary text-3xl`}></i>
            </div>
            <h1 className="text-3xl font-bold">{serviceData.name}</h1>
          </div>
          
          <p className="text-gray-600 text-lg mb-8">
            {serviceData.description}
          </p>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">About This Service</h2>
            <p className="text-gray-600">
              {('detailedDescription' in serviceData && serviceData.detailedDescription) || 
               (fallbackService && 'detailedDescription' in fallbackService && fallbackService.detailedDescription) || 
              "This service is designed to provide specialized medical assistance tailored to your specific healthcare needs. Our team of experienced professionals uses advanced technologies and methodologies to deliver accurate and reliable results."}
            </p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">How It Works</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Select this service from our service menu</li>
              <li>Provide the required information or upload necessary documents</li>
              <li>Our system processes your request</li>
              <li>Receive detailed results and recommendations</li>
              <li>Consult with a specialist if needed for further guidance</li>
            </ol>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/appointments">
              <span className="block bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-all text-center cursor-pointer">
                Book Appointment
              </span>
            </Link>
            <Link href="/chat">
              <span className="block bg-white border border-primary text-primary hover:bg-primary/5 px-4 py-2 rounded-lg font-medium transition-all text-center cursor-pointer">
                Ask Questions
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
