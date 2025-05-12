'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Bell, 
  Menu, 
  ChevronDown 
} from 'lucide-react';
import clsx from 'clsx';

interface HeaderProps {
  openMobileSidebar: () => void;
}

export default function Header({ openMobileSidebar }: HeaderProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-border h-16 flex items-center justify-between px-4 sm:px-6 z-30">
      <div className="flex items-center">
        {/* Mobile menu button */}
        <button
          className="inline-flex lg:hidden items-center justify-center p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-gray-100 focus:outline-none"
          onClick={openMobileSidebar}
        >
          <Menu className="h-5 w-5" />
        </button>
        
        {/* Logo */}
        <div className="hidden lg:flex items-center flex-shrink-0 px-4">
          <Link href="/" className="text-xl font-semibold">
            Legal CRM
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="hidden md:flex-1 md:flex md:justify-center md:ml-10 md:mr-4 max-w-2xl">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-text-secondary" />
          </div>
          <input
            type="text"
            className="input block w-full pl-10 py-2 text-sm"
            placeholder="Search clients, matters, documents..."
          />
        </div>
      </div>

      {/* Nav items */}
      <div className="flex items-center space-x-4">
        <button className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-gray-100">
          <Bell className="h-5 w-5" />
        </button>
        
        {/* User dropdown */}
        <div className="relative">
          <button
            className="flex items-center space-x-2 text-sm font-medium text-text-primary focus:outline-none"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <div className="h-8 w-8 rounded-full bg-accent-indigo-100 flex items-center justify-center text-accent-indigo font-medium">
              JD
            </div>
            <span className="hidden md:inline-block">John Doe</span>
            <ChevronDown className="h-4 w-4 text-text-secondary" />
          </button>

          {/* Dropdown menu */}
          <div 
            className={clsx(
              'absolute right-0 mt-2 w-48 py-1 bg-white rounded-lg shadow-modal border border-border transform transition-all',
              isUserMenuOpen 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-95 pointer-events-none'
            )}
          >
            <Link href="/profile" className="block px-4 py-2 text-sm text-text-primary hover:bg-gray-50">
              Your Profile
            </Link>
            <Link href="/settings" className="block px-4 py-2 text-sm text-text-primary hover:bg-gray-50">
              Settings
            </Link>
            <button className="block w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-gray-50">
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 