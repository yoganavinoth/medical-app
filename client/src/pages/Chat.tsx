import { motion } from "framer-motion";
import ChatInterface from "@/components/ChatInterface";

export default function Chat() {
  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Medical Chat Assistant</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about your health? Our AI-powered chat assistant can help you with general medical inquiries.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ChatInterface />
        </motion.div>
        
        <div className="max-w-3xl mx-auto mt-12 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">How to Use the Medical Chat Assistant</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Ask specific questions about symptoms or medical conditions</li>
            <li>Inquire about medications and potential side effects</li>
            <li>Get information about medical procedures and treatments</li>
            <li>Ask for guidance on whether you should see a doctor</li>
            <li>Learn about preventive healthcare measures</li>
          </ul>
          <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-accent rounded-r-lg">
            <p className="text-sm font-medium text-gray-700">
              <i className="ri-information-line mr-2 text-accent"></i>
              Remember: This chat assistant provides general information only and is not a substitute for professional medical advice, diagnosis, or treatment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
