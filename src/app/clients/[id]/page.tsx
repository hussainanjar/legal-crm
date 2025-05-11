'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Page from '@/components/layout/Page';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import Tabs from '@/components/ui/Tabs';
import { 
  Phone, 
  Mail, 
  Building, 
  Edit, 
  Archive, 
  Send, 
  FileText, 
  Clock, 
  Calendar, 
  MessageSquare,
  Download,
  Link as LinkIcon,
  MoreHorizontal,
  Plus
} from 'lucide-react';

// Mock client data
const client = {
  id: 'C1001',
  name: 'Johnson Family',
  type: 'Individual',
  email: 'johnson@example.com',
  phone: '(555) 123-4567',
  address: '123 Main St, Anytown, CA 94123',
  website: 'www.example.com',
  contactPerson: 'Robert Johnson',
  status: 'Active',
  createdAt: 'Jan 15, 2023',
  assignedAttorney: 'Jane Smith',
};

// Mock matters for this client
const matters = [
  { 
    id: 'M1001', 
    title: 'Johnson v. ABC Corporation', 
    practice: 'Litigation', 
    status: 'Active', 
    dueDate: 'Oct 15, 2023',
    assignee: 'Jane Smith',
    billableHours: 24.5,
  },
  { 
    id: 'M1007', 
    title: 'Johnson Property Purchase', 
    practice: 'Real Estate', 
    status: 'Active', 
    dueDate: 'Nov 30, 2023',
    assignee: 'Michael Chen',
    billableHours: 12.0,
  },
];

// Mock timeline activities
const activities = [
  { 
    id: 'A1001', 
    type: 'document', 
    action: 'Document uploaded', 
    description: 'Contract_draft_v2.pdf uploaded', 
    date: 'Oct 2, 2023', 
    time: '2:45 PM',
    user: 'Jane Smith'
  },
  { 
    id: 'A1002', 
    type: 'note', 
    action: 'Note added', 
    description: 'Client called to discuss property boundaries', 
    date: 'Sep 28, 2023', 
    time: '11:30 AM',
    user: 'Jane Smith'
  },
  { 
    id: 'A1003', 
    type: 'email', 
    action: 'Email sent', 
    description: 'Update on ABC Corporation case', 
    date: 'Sep 25, 2023', 
    time: '4:15 PM',
    user: 'System'
  },
  { 
    id: 'A1004', 
    type: 'meeting', 
    action: 'Meeting scheduled', 
    description: 'Property review meeting', 
    date: 'Sep 20, 2023', 
    time: '10:00 AM',
    user: 'Michael Chen'
  },
  { 
    id: 'A1005', 
    type: 'document', 
    action: 'Document uploaded', 
    description: 'Property_deed.pdf uploaded', 
    date: 'Sep 15, 2023', 
    time: '1:30 PM',
    user: 'Jane Smith'
  },
];

// Mock documents
const documents = [
  { 
    id: 'D1001', 
    name: 'Contract_draft_v2.pdf', 
    category: 'Contracts', 
    date: 'Oct 2, 2023', 
    size: '1.2 MB',
    addedBy: 'Jane Smith'
  },
  { 
    id: 'D1002', 
    name: 'Property_deed.pdf', 
    category: 'Property Records', 
    date: 'Sep 15, 2023', 
    size: '3.5 MB',
    addedBy: 'Jane Smith'
  },
  { 
    id: 'D1003', 
    name: 'Client_intake_form.docx', 
    category: 'Client Documents', 
    date: 'Jan 15, 2023', 
    size: '450 KB',
    addedBy: 'Michael Chen'
  },
];

// Mock communications
const communications = [
  { 
    id: 'CM1001', 
    type: 'email', 
    subject: 'ABC Corporation case update', 
    date: 'Sep 25, 2023', 
    time: '4:15 PM',
    from: 'jane.smith@lawfirm.com',
    to: 'johnson@example.com'
  },
  { 
    id: 'CM1002', 
    type: 'phone', 
    subject: 'Property purchase discussion', 
    date: 'Sep 28, 2023', 
    time: '11:20 AM',
    from: 'Robert Johnson',
    to: 'Michael Chen'
  },
  { 
    id: 'CM1003', 
    type: 'meeting', 
    subject: 'Initial consultation', 
    date: 'Jan 15, 2023', 
    time: '10:00 AM',
    participants: 'Robert Johnson, Jane Smith',
    location: 'Office'
  },
];

export default function ClientProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <Layout>
      <Page
        title={client.name}
        subtitle={`Client ID: ${client.id} • ${client.type}`}
        actions={
          <div className="flex gap-2">
            <Button
              variant="secondary"
              iconLeft={<Edit className="h-4 w-4" />}
            >
              Edit
            </Button>
            <Button
              variant="primary"
              iconLeft={<Send className="h-4 w-4" />}
            >
              Send Email
            </Button>
            <Button
              variant="outline"
              iconLeft={<Archive className="h-4 w-4" />}
            >
              Archive
            </Button>
          </div>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Client details */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader title="Contact Information" />
              <CardContent className="space-y-4">
                <div className="flex justify-center mb-4">
                  <Avatar name={client.name} size="xl" />
                </div>

                <ContactItem icon={<Mail />} label="Email" value={client.email} />
                <ContactItem icon={<Phone />} label="Phone" value={client.phone} />
                <ContactItem icon={<Building />} label="Address" value={client.address} />
                <ContactItem icon={<LinkIcon />} label="Website" value={client.website} />
                
                <div className="pt-2 border-t border-border mt-4">
                  <h4 className="text-sm font-medium text-text-secondary mb-2">Additional Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-text-secondary">Primary Contact</p>
                      <p className="text-sm font-medium">{client.contactPerson}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary">Client Since</p>
                      <p className="text-sm font-medium">{client.createdAt}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary">Status</p>
                      <Badge variant="success" dot>{client.status}</Badge>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary">Assigned To</p>
                      <p className="text-sm font-medium">{client.assignedAttorney}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader 
                title="Quick Actions" 
              />
              <CardContent className="space-y-2">
                <Button variant="outline" iconLeft={<Plus className="h-4 w-4" />} fullWidth>
                  New Matter
                </Button>
                <Button variant="outline" iconLeft={<Clock className="h-4 w-4" />} fullWidth>
                  Log Time
                </Button>
                <Button variant="outline" iconLeft={<FileText className="h-4 w-4" />} fullWidth>
                  Upload Document
                </Button>
                <Button variant="outline" iconLeft={<Calendar className="h-4 w-4" />} fullWidth>
                  Schedule Meeting
                </Button>
                <Button variant="outline" iconLeft={<MessageSquare className="h-4 w-4" />} fullWidth>
                  Add Note
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Tabbed content */}
          <div className="lg:col-span-2">
            <Card className="p-0 overflow-hidden">
              <Tabs
                tabs={[
                  {
                    id: 'overview',
                    label: 'Overview',
                    content: (
                      <div className="p-6 space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-text-primary">Active Matters</h3>
                          <div className="space-y-2">
                            {matters.map(matter => (
                              <div key={matter.id} className="p-4 border border-border rounded-lg hover:shadow-card-hover transition-shadow">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-medium text-text-primary">{matter.title}</h4>
                                    <p className="text-sm text-text-secondary mt-1">{matter.practice} • Due {matter.dueDate}</p>
                                  </div>
                                  <Badge variant="success" dot>{matter.status}</Badge>
                                </div>
                                <div className="flex justify-between items-center mt-3 pt-3 border-t border-border">
                                  <div className="flex items-center">
                                    <Avatar name={matter.assignee} size="xs" />
                                    <span className="text-xs text-text-secondary ml-2">{matter.assignee}</span>
                                  </div>
                                  <span className="text-sm font-medium">{matter.billableHours} hrs</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-end">
                            <Button variant="link" href="/matters">View All Matters</Button>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-text-primary">Recent Activity</h3>
                          <div className="space-y-3">
                            {activities.slice(0, 3).map(activity => (
                              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                                <div className="bg-accent-indigo-50 p-2 rounded-lg">
                                  <FileText className="h-5 w-5 text-accent-indigo" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-text-primary">{activity.action}</p>
                                  <p className="text-sm text-text-secondary mt-0.5">{activity.description}</p>
                                  <div className="flex items-center mt-1">
                                    <span className="text-xs text-text-secondary">{activity.date} at {activity.time}</span>
                                    <span className="mx-2 text-text-secondary">•</span>
                                    <span className="text-xs text-text-secondary">{activity.user}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-end">
                            <Button variant="link" onClick={() => setActiveTab('activity')}>View All Activity</Button>
                          </div>
                        </div>
                      </div>
                    ),
                  },
                  {
                    id: 'matters',
                    label: 'Matters',
                    content: (
                      <div className="p-6 space-y-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium text-text-primary">All Matters</h3>
                          <Button variant="primary" iconLeft={<Plus className="h-4 w-4" />}>
                            Add Matter
                          </Button>
                        </div>
                        <div className="space-y-4">
                          {matters.map(matter => (
                            <div key={matter.id} className="p-4 border border-border rounded-lg hover:shadow-card-hover transition-shadow">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium text-text-primary">{matter.title}</h4>
                                  <p className="text-sm text-text-secondary mt-1">{matter.practice} • Due {matter.dueDate}</p>
                                </div>
                                <Badge variant="success" dot>{matter.status}</Badge>
                              </div>
                              <div className="flex justify-between items-center mt-3 pt-3 border-t border-border">
                                <div className="flex items-center">
                                  <Avatar name={matter.assignee} size="xs" />
                                  <span className="text-xs text-text-secondary ml-2">{matter.assignee}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">{matter.billableHours} hrs</span>
                                  <Button variant="ghost" size="sm" href={`/matters/${matter.id}`}>
                                    View
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ),
                  },
                  {
                    id: 'documents',
                    label: 'Documents',
                    content: (
                      <div className="p-6 space-y-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium text-text-primary">Documents</h3>
                          <Button variant="primary" iconLeft={<Plus className="h-4 w-4" />}>
                            Upload Document
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {documents.map(doc => (
                            <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                              <div className="flex items-center">
                                <div className="bg-accent-indigo-50 p-2 rounded">
                                  <FileText className="h-5 w-5 text-accent-indigo" />
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm font-medium">{doc.name}</p>
                                  <div className="flex items-center mt-1">
                                    <Badge size="sm" variant="default">{doc.category}</Badge>
                                    <span className="mx-2 text-xs text-text-secondary">•</span>
                                    <span className="text-xs text-text-secondary">{doc.size}</span>
                                    <span className="mx-2 text-xs text-text-secondary">•</span>
                                    <span className="text-xs text-text-secondary">{doc.date}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" className="p-1" aria-label="Download">
                                  <Download className="h-4 w-4 text-text-secondary" />
                                </Button>
                                <Button variant="ghost" className="p-1" aria-label="More">
                                  <MoreHorizontal className="h-4 w-4 text-text-secondary" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ),
                  },
                  {
                    id: 'communication',
                    label: 'Communication',
                    content: (
                      <div className="p-6 space-y-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium text-text-primary">Communication History</h3>
                          <div className="flex gap-2">
                            <Button variant="outline" iconLeft={<Phone className="h-4 w-4" />}>
                              Log Call
                            </Button>
                            <Button variant="primary" iconLeft={<Send className="h-4 w-4" />}>
                              Send Email
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-4">
                          {communications.map(comm => (
                            <div key={comm.id} className="p-4 border border-border rounded-lg">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <Badge size="sm" variant={comm.type === 'email' ? 'primary' : comm.type === 'phone' ? 'warning' : 'info'}>
                                      {comm.type === 'email' ? 'Email' : comm.type === 'phone' ? 'Call' : 'Meeting'}
                                    </Badge>
                                    <h4 className="font-medium text-text-primary">{comm.subject}</h4>
                                  </div>
                                  <div className="mt-2">
                                    {comm.type === 'meeting' ? (
                                      <p className="text-sm text-text-secondary">Participants: {comm.participants}</p>
                                    ) : (
                                      <p className="text-sm text-text-secondary">
                                        {comm.from} → {comm.to}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-xs text-text-secondary">{comm.date}</p>
                                  <p className="text-xs text-text-secondary">{comm.time}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ),
                  },
                  {
                    id: 'activity',
                    label: 'Activity',
                    content: (
                      <div className="p-6 space-y-4">
                        <h3 className="text-lg font-medium text-text-primary mb-6">Activity Timeline</h3>
                        <div className="space-y-6">
                          {activities.map((activity, index) => (
                            <div key={activity.id} className="relative pl-6">
                              {index < activities.length - 1 && (
                                <div className="absolute top-0 left-2.5 -ml-px h-full w-0.5 bg-gray-200"></div>
                              )}
                              <div className="relative flex items-start">
                                <div className="absolute left-0 -ml-3 mt-0.5 h-5 w-5 rounded-full bg-white border-2 border-accent-indigo"></div>
                                <div className="min-w-0 flex-1">
                                  <div className="text-sm font-medium text-text-primary">{activity.action}</div>
                                  <p className="text-sm text-text-secondary">{activity.description}</p>
                                  <div className="mt-1 flex items-center text-xs text-text-secondary">
                                    <span>{activity.date}</span>
                                    <span className="mx-2">•</span>
                                    <span>{activity.time}</span>
                                    <span className="mx-2">•</span>
                                    <span>{activity.user}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ),
                  },
                ]}
                variant="underline"
                className="px-6 pt-6"
                defaultTabId={activeTab}
              />
            </Card>
          </div>
        </div>
      </Page>
    </Layout>
  );
}

function ContactItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start">
      <div className="h-5 w-5 text-text-secondary mr-3 flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-text-secondary">{label}</p>
        <p className="text-sm font-medium text-text-primary">{value}</p>
      </div>
    </div>
  );
} 