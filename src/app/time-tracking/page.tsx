'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Page from '@/components/layout/Page';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { 
  Clock, 
  Play, 
  Pause, 
  Calendar as CalendarIcon, 
  Check, 
  X, 
  Edit, 
  Download,
  DollarSign,
  Filter,
  Users,
  ChevronDown,
  Briefcase
} from 'lucide-react';

// Mock time entries
const timeEntries = [
  {
    id: 'T1001',
    client: 'Johnson Family',
    matter: 'Johnson v. ABC Corporation',
    date: '2023-10-10',
    startTime: '09:00 AM',
    endTime: '10:30 AM',
    duration: '1:30',
    description: 'Client meeting to review case documents',
    billable: true,
    rate: 250,
    amount: 375.00,
    status: 'pending',
    attorney: 'Jane Smith'
  },
  {
    id: 'T1002',
    client: 'Smith Corporation',
    matter: 'Annual Review',
    date: '2023-10-10',
    startTime: '11:00 AM',
    endTime: '12:00 PM',
    duration: '1:00',
    description: 'Financial document review',
    billable: true,
    rate: 250,
    amount: 250.00,
    status: 'approved',
    attorney: 'Jane Smith'
  },
  {
    id: 'T1003',
    client: 'Johnson Family',
    matter: 'Johnson Property Purchase',
    date: '2023-10-09',
    startTime: '02:00 PM',
    endTime: '04:30 PM',
    duration: '2:30',
    description: 'Property document preparation',
    billable: true,
    rate: 250,
    amount: 625.00,
    status: 'billed',
    attorney: 'Michael Chen'
  },
  {
    id: 'T1004',
    client: 'Internal',
    matter: 'Team Meeting',
    date: '2023-10-09',
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    duration: '1:00',
    description: 'Weekly team strategy meeting',
    billable: false,
    rate: 0,
    amount: 0,
    status: 'approved',
    attorney: 'Jane Smith'
  },
  {
    id: 'T1005',
    client: 'Davidson LLC',
    matter: 'Davidson v. State',
    date: '2023-10-08',
    startTime: '01:00 PM',
    endTime: '03:00 PM',
    duration: '2:00',
    description: 'Court hearing preparation',
    billable: true,
    rate: 275,
    amount: 550.00,
    status: 'pending',
    attorney: 'Jane Smith'
  }
];

// Status badge variants mapping
const statusVariants: Record<string, BadgeVariant> = {
  pending: 'warning',
  approved: 'success',
  billed: 'primary',
  rejected: 'error'
};

export default function TimeTrackingPage() {
  const [activeTimer, setActiveTimer] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const [selectedEntries, setSelectedEntries] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [client, setClient] = useState('');
  const [matter, setMatter] = useState('');
  
  // For the timer functionality
  useEffect(() => {
    if (activeTimer && !timerInterval) {
      const interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
      setTimerInterval(interval);
    } else if (!activeTimer && timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [activeTimer, timerInterval]);
  
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };
  
  const toggleTimer = () => {
    setActiveTimer(!activeTimer);
  };
  
  const resetTimer = () => {
    setActiveTimer(false);
    setElapsedTime(0);
    setDescription('');
    setClient('');
    setMatter('');
  };
  
  const saveTime = () => {
    // In a real app, this would save the time entry
    alert('Time entry saved!');
    resetTimer();
  };
  
  const toggleEntrySelection = (id: string) => {
    setSelectedEntries(prev => 
      prev.includes(id) ? prev.filter(entryId => entryId !== id) : [...prev, id]
    );
  };
  
  const approveSelected = () => {
    // In a real app, this would update the status of selected entries
    alert(`Approved ${selectedEntries.length} entries`);
    setSelectedEntries([]);
  };
  
  return (
    <Layout>
      <Page
        title="Time Tracking"
        subtitle="Track and manage billable hours"
        actions={
          <div className="flex gap-2">
            <Button
              variant="secondary"
              iconLeft={<Clock className="h-4 w-4" />}
            >
              Add Time Entry
            </Button>
            <Button
              variant="primary"
              iconLeft={<DollarSign className="h-4 w-4" />}
            >
              Generate Invoice
            </Button>
          </div>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Active timer */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader title="Active Timer" />
              <CardContent className="space-y-4">
                <div className="text-center py-6">
                  <div className="text-5xl font-mono mb-4">
                    {formatTime(elapsedTime)}
                  </div>
                  <div className="flex justify-center gap-3">
                    <Button 
                      variant={activeTimer ? "outline" : "primary"} 
                      onClick={toggleTimer}
                      iconLeft={activeTimer ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    >
                      {activeTimer ? 'Pause' : 'Start'}
                    </Button>
                    <Button 
                      variant="secondary" 
                      onClick={resetTimer}
                      iconLeft={<X className="h-4 w-4" />}
                    >
                      Reset
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Client</label>
                    <select 
                      className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-indigo focus:border-transparent"
                      value={client}
                      onChange={(e) => setClient(e.target.value)}
                    >
                      <option value="">Select Client</option>
                      <option value="Johnson Family">Johnson Family</option>
                      <option value="Smith Corporation">Smith Corporation</option>
                      <option value="Davidson LLC">Davidson LLC</option>
                      <option value="Internal">Internal</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Matter</label>
                    <select 
                      className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-indigo focus:border-transparent"
                      value={matter}
                      onChange={(e) => setMatter(e.target.value)}
                      disabled={!client}
                    >
                      <option value="">Select Matter</option>
                      {client === 'Johnson Family' && (
                        <>
                          <option value="Johnson v. ABC Corporation">Johnson v. ABC Corporation</option>
                          <option value="Johnson Property Purchase">Johnson Property Purchase</option>
                        </>
                      )}
                      {client === 'Smith Corporation' && (
                        <>
                          <option value="Annual Review">Annual Review</option>
                          <option value="Smith v. Jones">Smith v. Jones</option>
                        </>
                      )}
                      {client === 'Davidson LLC' && (
                        <>
                          <option value="Davidson v. State">Davidson v. State</option>
                        </>
                      )}
                      {client === 'Internal' && (
                        <>
                          <option value="Team Meeting">Team Meeting</option>
                          <option value="Administrative">Administrative</option>
                        </>
                      )}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Description</label>
                    <textarea 
                      className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-indigo focus:border-transparent resize-none"
                      rows={3}
                      placeholder="Describe what you're working on..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    variant="primary" 
                    onClick={saveTime}
                    disabled={!client || !matter || !description || elapsedTime === 0}
                  >
                    Save Time Entry
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader title="Today's Summary" />
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-text-secondary">Total Hours</span>
                  <span className="font-medium">5:30</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-text-secondary">Billable Hours</span>
                  <span className="font-medium">4:30</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-text-secondary">Billable Amount</span>
                  <span className="font-medium">$1,125.00</span>
                </div>
                
                <div className="pt-2 mt-2 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-text-secondary mb-2">Quick Stats</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                      <p className="text-xs text-text-secondary">This Week</p>
                      <p className="text-lg font-medium text-blue-700">24.5 hrs</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 text-center">
                      <p className="text-xs text-text-secondary">This Month</p>
                      <p className="text-lg font-medium text-green-700">87.0 hrs</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Time entries */}
          <div className="lg:col-span-2">
            <Card className="p-0 overflow-hidden">
              <CardHeader 
                title="Recent Time Entries" 
                action={
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconLeft={<Filter className="h-4 w-4" />}>
                      Filter
                    </Button>
                    <Button variant="ghost" size="sm" iconLeft={<CalendarIcon className="h-4 w-4" />}>
                      Oct 7-13, 2023
                    </Button>
                    {selectedEntries.length > 0 && (
                      <Button 
                        variant="primary" 
                        size="sm" 
                        iconLeft={<Check className="h-4 w-4" />}
                        onClick={approveSelected}
                      >
                        Approve ({selectedEntries.length})
                      </Button>
                    )}
                  </div>
                }
              />

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-left">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium text-text-secondary tracking-wider">
                        <input 
                          type="checkbox" 
                          className="h-4 w-4 text-accent-indigo border-gray-300 rounded"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedEntries(timeEntries.map(entry => entry.id));
                            } else {
                              setSelectedEntries([]);
                            }
                          }}
                          checked={selectedEntries.length === timeEntries.length}
                        />
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-text-secondary tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-text-secondary tracking-wider">
                        Client / Matter
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-text-secondary tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-text-secondary tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-text-secondary tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-text-secondary tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-text-secondary tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {timeEntries.map((entry) => (
                      <tr 
                        key={entry.id} 
                        className={`hover:bg-gray-50 ${selectedEntries.includes(entry.id) ? 'bg-blue-50' : ''}`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input 
                            type="checkbox" 
                            className="h-4 w-4 text-accent-indigo border-gray-300 rounded"
                            checked={selectedEntries.includes(entry.id)}
                            onChange={() => toggleEntrySelection(entry.id)}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-text-primary">{entry.date}</div>
                          <div className="text-xs text-text-secondary">{entry.startTime} - {entry.endTime}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-text-primary">{entry.client}</div>
                          <div className="text-xs text-text-secondary">{entry.matter}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-text-primary max-w-xs truncate">{entry.description}</div>
                          <div className="text-xs text-text-secondary">{entry.attorney}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-text-primary">{entry.duration}</div>
                          <div className="text-xs text-text-secondary">
                            {entry.billable ? 'Billable' : 'Non-billable'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-text-primary">
                            {entry.billable ? `$${entry.amount.toFixed(2)}` : '-'}
                          </div>
                          {entry.billable && (
                            <div className="text-xs text-text-secondary">${entry.rate}/hr</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge 
                            variant={statusVariants[entry.status as keyof typeof statusVariants]} 
                            dot
                          >
                            {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" iconLeft={<Edit className="h-4 w-4" />} />
                            {entry.status === 'billed' && (
                              <Button variant="ghost" size="sm" iconLeft={<Download className="h-4 w-4" />} />
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={4} className="px-6 py-3 text-right text-sm font-medium text-text-secondary">
                        Total:
                      </td>
                      <td className="px-6 py-3 text-sm font-medium">
                        8:00
                      </td>
                      <td className="px-6 py-3 text-sm font-medium">
                        $1,800.00
                      </td>
                      <td colSpan={2}></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-right">
                <Button variant="link">View All Time Entries</Button>
              </div>
            </Card>
          </div>
        </div>
      </Page>
    </Layout>
  );
} 