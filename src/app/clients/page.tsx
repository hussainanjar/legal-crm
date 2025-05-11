'use client';

import Layout from '@/components/layout/Layout';
import Page from '@/components/layout/Page';
import { Card } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import { 
  Plus, 
  Search, 
  Filter, 
  ChevronDown, 
  Grid, 
  List, 
  Phone, 
  Mail, 
  Building, 
  MoreHorizontal,
  Eye 
} from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

// Mock data for clients
const clients = [
  { 
    id: 'C1001', 
    name: 'Johnson Family', 
    type: 'Individual',
    email: 'johnson@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Anytown, CA',
    activeMatters: 2,
    status: 'Active'
  },
  { 
    id: 'C1002', 
    name: 'Smith Corporation', 
    type: 'Corporate',
    email: 'contact@smithcorp.com',
    phone: '(555) 987-6543',
    address: '456 Business Ave, Commerce City, NY',
    activeMatters: 1,
    status: 'Active'
  },
  { 
    id: 'C1003', 
    name: 'Diana Martinez', 
    type: 'Individual',
    email: 'diana@example.com',
    phone: '(555) 234-5678',
    address: '789 Oak Dr, Sunnydale, FL',
    activeMatters: 1,
    status: 'Active'
  },
  { 
    id: 'C1004', 
    name: 'Williams Family', 
    type: 'Individual',
    email: 'williams@example.com',
    phone: '(555) 345-6789',
    address: '321 Pine Rd, Maplewood, TX',
    activeMatters: 1,
    status: 'Active'
  },
  { 
    id: 'C1005', 
    name: 'Tech Innovations', 
    type: 'Corporate',
    email: 'info@techinnovations.com',
    phone: '(555) 456-7890',
    address: '555 Technology Pkwy, Silicon Valley, CA',
    activeMatters: 1,
    status: 'Active'
  },
  { 
    id: 'C1006', 
    name: 'Michael Brown', 
    type: 'Individual',
    email: 'michael@example.com',
    phone: '(555) 567-8901',
    address: '654 Elm St, Riverside, WA',
    activeMatters: 1,
    status: 'On Hold'
  },
  { 
    id: 'C1007', 
    name: 'First National Bank', 
    type: 'Corporate',
    email: 'legal@fnb.com',
    phone: '(555) 678-9012',
    address: '777 Financial Dr, Moneyville, IL',
    activeMatters: 0,
    status: 'Inactive'
  },
  { 
    id: 'C1008', 
    name: 'Green Family Trust', 
    type: 'Trust',
    email: 'trustees@greenfamily.com',
    phone: '(555) 789-0123',
    address: '888 Trust Blvd, Estateville, CO',
    activeMatters: 1,
    status: 'Active'
  },
];

export default function ClientsPage() {
  const [viewMode, setViewMode] = useState('grid');
  
  return (
    <Layout>
      <Page
        title="Clients"
        subtitle="Manage all your client relationships"
        actions={
          <Button
            variant="primary"
            iconLeft={<Plus className="h-4 w-4" />}
          >
            New Client
          </Button>
        }
      >
        <Card className="overflow-hidden">
          {/* Filters & Search */}
          <div className="p-4 sm:p-6 border-b border-border">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-text-secondary" />
                </div>
                <input
                  type="text"
                  className="input block w-full pl-10 py-2 text-sm"
                  placeholder="Search clients..."
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="secondary" 
                  iconLeft={<Filter className="h-4 w-4" />} 
                  iconRight={<ChevronDown className="h-4 w-4" />}
                >
                  Filter
                </Button>
                <div className="flex rounded-lg border border-border overflow-hidden">
                  <button
                    className={clsx(
                      'p-2 transition-colors',
                      viewMode === 'grid' 
                        ? 'bg-accent-indigo text-white' 
                        : 'bg-white text-text-secondary hover:text-text-primary hover:bg-gray-50'
                    )}
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    className={clsx(
                      'p-2 transition-colors',
                      viewMode === 'list' 
                        ? 'bg-accent-indigo text-white' 
                        : 'bg-white text-text-secondary hover:text-text-primary hover:bg-gray-50'
                    )}
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Filter Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              <FilterTag label="Type: All" />
              <FilterTag label="Status: Active" />
              <FilterTag label="Matters: Any" />
            </div>
          </div>
          
          {/* Grid view */}
          {viewMode === 'grid' ? (
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {clients.map(client => (
                  <ClientCard key={client.id} client={client} />
                ))}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-gray-50">
                  <tr>
                    <TableHeader>Client</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Contact</TableHeader>
                    <TableHeader>Active Matters</TableHeader>
                    <TableHeader>Status</TableHeader>
                    <TableHeader>
                      <span className="sr-only">Actions</span>
                    </TableHeader>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-border">
                  {clients.map(client => (
                    <tr key={client.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <TableCell>
                        <div className="flex items-center">
                          <Avatar name={client.name} size="sm" />
                          <div className="ml-3">
                            <div className="font-medium text-text-primary">{client.name}</div>
                            <div className="text-xs text-text-secondary mt-1">{client.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{client.type}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3.5 w-3.5 text-text-secondary mr-1.5" />
                            <span className="truncate max-w-[180px]">{client.email}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-3.5 w-3.5 text-text-secondary mr-1.5" />
                            <span>{client.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{client.activeMatters}</TableCell>
                      <TableCell>
                        <StatusBadge status={client.status} />
                      </TableCell>
                      <TableCell className="w-12">
                        <button className="p-1 rounded-md hover:bg-gray-100">
                          <MoreHorizontal className="h-4 w-4 text-text-secondary" />
                        </button>
                      </TableCell>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {/* Pagination */}
          <div className="py-3 px-4 sm:px-6 flex items-center justify-between border-t border-border">
            <div className="hidden sm:flex sm:items-center">
              <p className="text-sm text-text-secondary">
                Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of <span className="font-medium">12</span> clients
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="secondary" size="sm" disabled>
                Previous
              </Button>
              <Button variant="secondary" size="sm">
                Next
              </Button>
            </div>
          </div>
        </Card>
      </Page>
    </Layout>
  );
}

// Helper components
function TableHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <th
      scope="col"
      className={clsx(
        'px-6 py-3 text-left text-xs font-medium text-text-secondary tracking-wider whitespace-nowrap',
        className
      )}
    >
      {children}
    </th>
  );
}

function TableCell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <td
      className={clsx(
        'px-6 py-4 text-sm text-text-primary whitespace-nowrap',
        className
      )}
    >
      {children}
    </td>
  );
}

function StatusBadge({ status }: { status: string }) {
  let variant: 'success' | 'primary' | 'warning' | 'error' | 'default' = 'default';
  
  switch (status) {
    case 'Active':
      variant = 'success';
      break;
    case 'On Hold':
      variant = 'warning';
      break;
    case 'Inactive':
      variant = 'default';
      break;
    default:
      variant = 'default';
  }
  
  return <Badge variant={variant} dot>{status}</Badge>;
}

function FilterTag({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-text-secondary">
      {label}
      <button className="ml-1.5 text-text-secondary hover:text-text-primary focus:outline-none">
        <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
          <path d="M12.7 4.7l-1.4-1.4L8 6.6 4.7 3.3 3.3 4.7 6.6 8l-3.3 3.3 1.4 1.4L8 9.4l3.3 3.3 1.4-1.4L9.4 8z"></path>
        </svg>
      </button>
    </div>
  );
}

interface ClientProps {
  client: {
    id: string;
    name: string;
    type: string;
    email: string;
    phone: string;
    address: string;
    activeMatters: number;
    status: string;
  };
}

function ClientCard({ client }: ClientProps) {
  return (
    <Card className="transition-all duration-200 hover:shadow-card-hover">
      <div className="flex justify-between">
        <Avatar name={client.name} size="md" />
        <StatusBadge status={client.status} />
      </div>
      <h3 className="font-medium text-lg mt-4">{client.name}</h3>
      <div className="text-sm text-text-secondary mt-1">{client.type}</div>
      
      <div className="mt-4 space-y-2">
        <div className="flex text-sm">
          <Mail className="h-4 w-4 text-text-secondary mr-2 flex-shrink-0" />
          <span className="text-text-primary truncate">{client.email}</span>
        </div>
        <div className="flex text-sm">
          <Phone className="h-4 w-4 text-text-secondary mr-2 flex-shrink-0" />
          <span className="text-text-primary">{client.phone}</span>
        </div>
        <div className="flex text-sm">
          <Building className="h-4 w-4 text-text-secondary mr-2 flex-shrink-0" />
          <span className="text-text-primary truncate">{client.address}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <div>
          <span className="text-sm text-text-secondary">Active Matters:</span>
          <span className="ml-1 font-medium">{client.activeMatters}</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          iconLeft={<Eye className="h-4 w-4" />}
          href={`/clients/${client.id}`}
        >
          View
        </Button>
      </div>
    </Card>
  );
} 