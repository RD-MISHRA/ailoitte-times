"use client";

import { useState } from 'react';
import {
  Menu,
  X,
  Search,
  Home,
  Briefcase,
  Laptop,
  Film,
  Goal,
  Atom,
  HeartPulse,
  Landmark,
  TrendingUp,
  Newspaper
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Define categories with their corresponding Lucid React icons
const categoriesWithIcons = [
  { name: 'Home', icon: Home },
  { name: 'Business', icon: Briefcase },
  { name: 'Technology', icon: Laptop },
  { name: 'Entertainment', icon: Film },
  { name: 'Sports', icon: Goal },
  { name: 'Science', icon: Atom },
  { name: 'Health', icon: HeartPulse },
  { name: 'Politics', icon: Landmark },
  { name: 'Finance', icon: TrendingUp },
  { name: 'General', icon: Newspaper },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search/${encodeURIComponent(searchQuery.trim())}`);
      
      setOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white text-gray-800 shadow-lg rounded-b-xl font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4 flex-1">
            {/* Logo and Name Link */}
            <Link href="/" className="flex items-center space-x-4">
              <img
                src="https://i.postimg.cc/9ft6HcXp/Screenshot-2025-07-09-225253.png"
                alt="AiloitteTimes Logo"
                className="h-9 w-9 rounded-full object-cover transform transition-transform duration-200 hover:scale-105"
              />
              <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800 whitespace-nowrap tracking-tight">
                AiloitteTimes
              </span>
            </Link>
            <div className="hidden lg:flex items-center flex-grow ml-8 max-w-md">
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <input
                  type="text"
                  placeholder="Search news..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent w-full text-sm transition-all duration-200 ease-in-out"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-testid="desktop-search-input" // Added data-testid
                />
                <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none">
                  <Search size={18} />
                </button>
              </form>
            </div>
          </div>
          <button
            className="lg:hidden text-gray-600 hover:text-red-600 transition-colors duration-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        <nav className="hidden lg:flex justify-center flex-wrap gap-x-6 gap-y-2 py-3 border-t border-gray-100">
          {categoriesWithIcons.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.name}
                href={category.name === 'Home' ? '/' : `/category/${category.name.toLowerCase().replace(/\s/g, '')}`}
                className="text-sm font-medium text-gray-700 hover:text-red-700 relative group transition-colors duration-200 px-2 py-1 rounded-md flex items-center space-x-1"
              >
                {IconComponent && <IconComponent size={16} />}
                <span>{category.name}</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              </Link>
            );
          })}
        </nav>

        {open && (
          <nav className="lg:hidden bg-gray-50 px-4 py-4 space-y-3 border-t border-gray-200 transition-all duration-300 ease-in-out" data-testid="mobile-menu">
            <form onSubmit={handleSearchSubmit} className="relative w-full mb-4">
              <input
                type="text"
                placeholder="Search news ,topics..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent w-full text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="mobile-search-input" // Added data-testid
              />
              <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none">
                <Search size={18} />
              </button>
            </form>
            {categoriesWithIcons.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={category.name}
                  href={category.name === 'Home' ? '/' : `/category/${category.name.toLowerCase().replace(/\s/g, '')}`}
                  className="block text-sm font-medium text-gray-700 hover:text-red-700 py-2 px-2 rounded-md transition-colors duration-200 flex items-center space-x-2"
                  onClick={() => setOpen(false)}
                >
                  {IconComponent && <IconComponent size={18} />}
                  <span>{category.name}</span>
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
