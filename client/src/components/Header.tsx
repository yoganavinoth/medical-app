import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className={`bg-white shadow-sm fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'shadow-md' : ''}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/">
                <span className="text-2xl font-bold text-primary flex items-center cursor-pointer">
                  <i className="ri-heart-pulse-line mr-2"></i>
                  <span>MediConnect</span>
                </span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/">
                <span className={`transition-all font-medium cursor-pointer ${location === '/' ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>
                  Home
                </span>
              </Link>
              <Link href="/#services">
                <span className={`transition-all font-medium cursor-pointer ${location.includes('services') ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>
                  Services
                </span>
              </Link>
              <Link href="/appointments">
                <span className={`transition-all font-medium cursor-pointer ${location.includes('appointments') ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>
                  Appointments
                </span>
              </Link>
              <Link href="/chat">
                <span className={`transition-all font-medium cursor-pointer ${location.includes('chat') ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>
                  Chat
                </span>
              </Link>
            </nav>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={toggleMenu}
                className="text-gray-700 hover:text-primary focus:outline-none"
                aria-label="Toggle mobile menu"
              >
                <i className="ri-menu-line text-2xl"></i>
              </button>
            </div>
            
            {/* CTA Button */}
            <div className="hidden md:block">
              <a href="#" className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-all">
                Sign In
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} currentPath={location} />
      
      {/* Bottom Navigation (Mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-1px_5px_rgba(0,0,0,0.1)] z-40">
        <div className="flex justify-around">
          <Link href="/">
            <span className={`flex flex-col items-center py-3 px-2 cursor-pointer ${location === '/' ? 'text-primary' : 'text-gray-500'}`}>
              <i className="ri-home-line text-xl"></i>
              <span className="text-xs mt-1">Home</span>
            </span>
          </Link>
          <Link href="/#services">
            <span className={`flex flex-col items-center py-3 px-2 cursor-pointer ${location.includes('services') ? 'text-primary' : 'text-gray-500'}`}>
              <i className="ri-service-line text-xl"></i>
              <span className="text-xs mt-1">Services</span>
            </span>
          </Link>
          <Link href="/appointments">
            <span className={`flex flex-col items-center py-3 px-2 cursor-pointer ${location.includes('appointments') ? 'text-primary' : 'text-gray-500'}`}>
              <i className="ri-calendar-line text-xl"></i>
              <span className="text-xs mt-1">Appointments</span>
            </span>
          </Link>
          <Link href="/chat">
            <span className={`flex flex-col items-center py-3 px-2 cursor-pointer ${location.includes('chat') ? 'text-primary' : 'text-gray-500'}`}>
              <i className="ri-message-3-line text-xl"></i>
              <span className="text-xs mt-1">Chat</span>
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
