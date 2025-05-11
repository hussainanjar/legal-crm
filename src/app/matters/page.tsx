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
  Download, 
  Calendar, 
  ChevronDown, 
  MoreHorizontal
} from 'lucide-react';
import clsx from 'clsx';

// Mock data for matters
const matters = [
  { 
    id: 'M1001', 
    title: 'Johnson v. ABC Corporation', 
    client: 'Johnson Family', 
    practice: 'Litigation', 
    status: 'Active', 
    dueDate: 'Oct 15, 2023',
    assignee: 'Jane Smith',
    billableHours: 24.5,
  },
  { 
    id: 'M1002', 
    title: 'Smith Corp Contract Review', 
    client: 'Smith Corporation', 
    practice: 'Corporate', 
    status: 'Pending', 
    dueDate: 'Sep 30, 2023',
    assignee: 'John Doe',
    billableHours: 8.75,
  },
  { 
    id: 'M1003', 
    title: 'Martinez Estate Planning', 
    client: 'Diana Martinez', 
    practice: 'Estate Planning', 
    status: 'Completed', 
    dueDate: 'Aug 22, 2023',
    assignee: 'Alex Johnson',
    billableHours: 12.25,
  },
  { 
    id: 'M1004', 
    title: 'Williams Bankruptcy Filing', 
    client: 'Williams Family', 
    practice: 'Bankruptcy', 
    status: 'Active', 
    dueDate: 'Nov 05, 2023',
    assignee: 'Sarah Lee',
    billableHours: 15.0,
  },
  { 
    id: 'M1005', 
    title: 'Tech Innovations IP Protection', 
    client: 'Tech Innovations', 
    practice: 'Intellectual Property', 
    status: 'Active', 
    dueDate: 'Dec 10, 2023',
    assignee: 'Michael Chen',
    billableHours: 32.5,
  },
  { 
    id: 'M1006', 
    title: 'Brown Divorce Proceedings', 
    client: 'Michael Brown', 
    practice: 'Family Law', 
    status: 'On Hold', 
    dueDate: 'TBD',
    assignee: 'Jennifer Wilson',
    billableHours: 6.0,
  },
];

export default function MattersPage() {
  return (
    <Layout>
      <Page
        title="Matters"
        subtitle="Manage all your legal matters"
        actions={
          <Button
            variant="primary"
            iconLeft={<Plus className="h-4 w-4" />}
          >
            New Matter
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
                  placeholder="Search matters..."
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
                <Button 
                  variant="secondary" 
                  iconLeft={<Download className="h-4 w-4" />}
                >
                  Export
                </Button>
              </div>
            </div>
            
            {/* Filter Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              <FilterTag label="Status: Active" />
              <FilterTag label="Practice Area: All" />
              <FilterTag label="Due Date: This Month" />
              <FilterTag label="Assignee: Any" />
            </div>
          </div>
          
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-gray-50">
                <tr>
                  <TableHeader>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-border text-accent-indigo focus:ring-accent-indigo-100"
                      />
                    </div>
                  </TableHeader>
                  <TableHeader>Matter</TableHeader>
                  <TableHeader>Client</TableHeader>
                  <TableHeader>Practice Area</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Due Date</TableHeader>
                  <TableHeader>Assignee</TableHeader>
                  <TableHeader>Hours</TableHeader>
                  <TableHeader>
                    <span className="sr-only">Actions</span>
                  </TableHeader>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-border">
                {matters.map((matter) => (
                  <tr key={matter.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <TableCell className="w-12">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-border text-accent-indigo focus:ring-accent-indigo-100"
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-text-primary">{matter.title}</div>
                        <div className="text-xs text-text-secondary mt-1">{matter.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>{matter.client}</TableCell>
                    <TableCell>{matter.practice}</TableCell>
                    <TableCell>
                      <StatusBadge status={matter.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 text-text-secondary mr-1.5" />
                        <span>{matter.dueDate}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Avatar name={matter.assignee} size="xs" />
                        <span className="ml-2">{matter.assignee}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{matter.billableHours}</TableCell>
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
          
          {/* Pagination */}
          <div className="py-3 px-4 sm:px-6 flex items-center justify-between border-t border-border">
            <div className="hidden sm:flex sm:items-center">
              <p className="text-sm text-text-secondary">
                Showing <span className="font-medium">1</span> to <span className="font-medium">6</span> of <span className="font-medium">12</span> matters
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
    case 'Pending':
      variant = 'primary';
      break;
    case 'On Hold':
      variant = 'warning';
      break;
    case 'Completed':
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