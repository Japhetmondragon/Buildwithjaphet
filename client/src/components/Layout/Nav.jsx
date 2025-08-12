import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from '../UI/Container';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const links = [
    { to: '/', label: 'Home' },
    { to: '/projects', label: 'Projects' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' }
  ];
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 w-full bg-neutral-50 border-b-2 border-brand-black z-50">
      <Container>
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="font-display text-2xl hover:text-brand-amber uppercase">
            Japhet Mondragon
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-display uppercase tracking-wider transition-colors ${
                  isActive(link.to) 
                    ? 'text-brand-blue' 
                    : 'text-brand-black hover:text-brand-blue'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`h-0.5 bg-brand-black transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`h-0.5 bg-brand-black transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`h-0.5 bg-brand-black transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t-2 border-brand-black">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`block py-2 font-display uppercase tracking-wider ${
                  isActive(link.to) 
                    ? 'text-brand-blue' 
                    : 'text-brand-black'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </Container>
    </nav>
  );
};

export default Nav;