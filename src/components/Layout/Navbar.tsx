import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../../localization';
import LanguageSelector from '../LanguageSelector';

// Import the logo
import logoImage from '../../assets/images/logo.png';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: t('nav.home') as string, path: '/' },
    { name: t('nav.services') as string, path: '/services' },
    { name: t('nav.about') as string, path: '/about' },
    { name: t('nav.contact') as string, path: '/contact' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path 
      ? 'text-accent font-medium' 
      : 'text-gray-700 hover:text-primary';
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logoImage} alt="PSN Rwanda Logo" className="h-12 w-auto" />
            <div>
              <div className="text-primary font-bold text-xl">PSN Rwanda</div>
              <div className="text-xs text-gray-500">Legal & Property Services</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors duration-200 ${isActive(item.path)}`}
              >
                {item.name}
              </Link>
            ))}
            <Link 
              to="/book" 
              className="btn btn-primary"
            >
              {t('nav.bookings') as string}
            </Link>
            <LanguageSelector className="ml-4" />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <LanguageSelector className="mr-4" />
            <button
              onClick={toggleMenu}
              className="p-2 text-primary focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`py-2 transition-colors duration-200 ${isActive(item.path)}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link 
                to="/book" 
                className="btn btn-primary text-center mt-2"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.bookings') as string}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 