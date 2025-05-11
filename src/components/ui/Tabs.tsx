'use client';

import { useState, ReactNode } from 'react';
import clsx from 'clsx';

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTabId?: string;
  className?: string;
  tabClassName?: string;
  contentClassName?: string;
  variant?: 'underline' | 'pills' | 'boxed';
}

export default function Tabs({ 
  tabs, 
  defaultTabId, 
  className, 
  tabClassName,
  contentClassName,
  variant = 'underline'
}: TabsProps) {
  const [activeTabId, setActiveTabId] = useState(defaultTabId || tabs[0]?.id);
  const activeTab = tabs.find(tab => tab.id === activeTabId);
  
  const getTabClass = (tabId: string) => {
    const isActive = tabId === activeTabId;
    const baseClasses = 'font-medium text-sm sm:text-base flex items-center focus:outline-none transition-colors duration-200';
    
    if (variant === 'underline') {
      return clsx(
        baseClasses,
        'px-1 py-3 border-b-2',
        isActive 
          ? 'text-accent-indigo border-accent-indigo' 
          : 'text-text-secondary border-transparent hover:text-text-primary hover:border-gray-300',
        tabClassName
      );
    }
    
    if (variant === 'pills') {
      return clsx(
        baseClasses,
        'px-4 py-1.5 rounded-full',
        isActive 
          ? 'text-white bg-accent-indigo' 
          : 'text-text-secondary hover:text-text-primary hover:bg-gray-100',
        tabClassName
      );
    }
    
    // Boxed
    return clsx(
      baseClasses,
      'px-4 py-2 rounded-t-lg',
      isActive 
        ? 'text-accent-indigo bg-white border border-border border-b-0' 
        : 'text-text-secondary bg-gray-50 hover:text-text-primary hover:bg-gray-100',
      tabClassName
    );
  };

  return (
    <div className={className}>
      <div 
        className={clsx(
          'flex',
          {
            'border-b border-border': variant === 'underline',
            'space-x-2': variant === 'pills',
            'space-x-1': variant === 'boxed',
          }
        )}
      >
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={getTabClass(tab.id)}
            onClick={() => setActiveTabId(tab.id)}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
      <div className={clsx('mt-4', contentClassName)}>
        {activeTab?.content}
      </div>
    </div>
  );
} 