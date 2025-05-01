import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="text-2xl font-bold flex items-center mb-4">
              <i className="ri-heart-pulse-line mr-2"></i>
              <span>MediConnect</span>
            </div>
            <p className="text-gray-400 mb-4">
              Advanced healthcare services accessible from anywhere, anytime.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-all">
                <i className="ri-facebook-fill text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-all">
                <i className="ri-twitter-fill text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-all">
                <i className="ri-instagram-line text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-all">
                <i className="ri-linkedin-fill text-lg"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#services">
                  <a className="text-gray-400 hover:text-white transition-all">Services</a>
                </Link>
              </li>
              <li>
                <Link href="/appointments">
                  <a className="text-gray-400 hover:text-white transition-all">Appointments</a>
                </Link>
              </li>
              <li>
                <Link href="/chat">
                  <a className="text-gray-400 hover:text-white transition-all">Chat Assistant</a>
                </Link>
              </li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-all">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-all">Contact</a></li>
            </ul>
          </div>
          
          {/* Our Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-all">Symptom Diagnosis</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-all">Drug Interaction</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-all">Lab Tests</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-all">X-Ray Analysis</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-all">All Services</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <i className="ri-map-pin-line text-primary mt-1 mr-2"></i>
                <span className="text-gray-400">123 Medical Plaza, Suite 456<br/>New York, NY 10001</span>
              </li>
              <li className="flex items-center">
                <i className="ri-phone-line text-primary mr-2"></i>
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <i className="ri-mail-line text-primary mr-2"></i>
                <span className="text-gray-400">info@mediconnect.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} MediConnect. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-white transition-all">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-all">Terms of Service</a>
            <a href="#" className="hover:text-white transition-all">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
