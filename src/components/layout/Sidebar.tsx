'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  FileText, 
  Calendar, 
  Clock, 
  ExternalLink, 
  Settings,
  X
} from 'lucide-react';
import clsx from 'clsx';

interface SidebarProps {
  isMobileOpen: boolean;
  closeMobileSidebar: () => void;
}

export default function Sidebar({ isMobileOpen, closeMobileSidebar }: SidebarProps) {
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Matters', href: '/matters', icon: Briefcase },
    { name: 'Clients', href: '/clients', icon: Users },
    { name: 'Documents', href: '/documents', icon: FileText },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
    { name: 'Time & Billing', href: '/time-tracking', icon: Clock },
    { name: 'Client Portal', href: '/portal', icon: ExternalLink },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-border pt-24 pb-6">
        <nav className="flex-1 px-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'sidebar-link',
                  isActive && 'sidebar-link-active'
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile sidebar */}
      <div
        className={clsx(
          'lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-200',
          isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={closeMobileSidebar}
      />
      <aside
        className={clsx(
          'lg:hidden fixed top-0 left-0 bottom-0 w-72 bg-white border-r border-border z-50 transition-transform duration-300 transform',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          <h2 className="text-lg font-semibold">Legal CRM</h2>
          <button onClick={closeMobileSidebar} className="p-1 rounded-lg text-text-secondary hover:text-text-primary hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'sidebar-link',
                  isActive && 'sidebar-link-active'
                )}
                onClick={closeMobileSidebar}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
} 