import React from 'react';

interface PageProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function Page({ children, title, subtitle, actions }: PageProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">{title}</h1>
          {subtitle && (
            <p className="mt-1 text-sm sm:text-base text-text-secondary">{subtitle}</p>
          )}
        </div>
        {actions && <div className="mt-4 sm:mt-0">{actions}</div>}
      </div>
      {children}
    </div>
  );
} 