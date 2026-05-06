"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tighter text-glow">INFINITE</span>
            <span className="text-xs text-gray-400 hidden sm:block">Creative Web Design</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`text-sm hover:text-accent-blue transition-colors ${pathname === link.href ? 'text-accent-blue' : 'text-gray-300'}`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/contact" 
              className="px-5 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-sm font-medium transition-all hover:box-glow"
            >
              Start Project
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="md:hidden glass absolute w-full top-full left-0 border-t border-white/10">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-4 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/contact" 
              className="block mt-4 text-center px-5 py-3 bg-accent-blue text-background font-bold rounded-md"
            >
              Start Project
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
