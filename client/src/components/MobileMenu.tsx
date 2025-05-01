import { Link } from "wouter";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

export default function MobileMenu({ isOpen, onClose, currentPath }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-40 flex flex-col pt-20 pb-6 px-4 md:hidden">
      <div className="flex flex-col space-y-4 text-center text-lg">
        <Link href="/">
          <span 
            className={`py-3 border-b border-gray-100 font-medium block cursor-pointer ${currentPath === '/' ? 'text-primary' : 'text-gray-700 hover:text-primary transition-all'}`}
            onClick={onClose}
          >
            Home
          </span>
        </Link>
        <Link href="/#services">
          <span 
            className={`py-3 border-b border-gray-100 font-medium block cursor-pointer ${currentPath.includes('services') ? 'text-primary' : 'text-gray-700 hover:text-primary transition-all'}`}
            onClick={onClose}
          >
            Services
          </span>
        </Link>
        <Link href="/appointments">
          <span 
            className={`py-3 border-b border-gray-100 font-medium block cursor-pointer ${currentPath.includes('appointments') ? 'text-primary' : 'text-gray-700 hover:text-primary transition-all'}`}
            onClick={onClose}
          >
            Appointments
          </span>
        </Link>
        <Link href="/chat">
          <span 
            className={`py-3 border-b border-gray-100 font-medium block cursor-pointer ${currentPath.includes('chat') ? 'text-primary' : 'text-gray-700 hover:text-primary transition-all'}`}
            onClick={onClose}
          >
            Chat
          </span>
        </Link>
        <div className="bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-lg font-medium transition-all mt-4 cursor-pointer">
          Sign In
        </div>
      </div>
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-700"
        aria-label="Close menu"
      >
        <i className="ri-close-line text-2xl"></i>
      </button>
    </div>
  );
}
