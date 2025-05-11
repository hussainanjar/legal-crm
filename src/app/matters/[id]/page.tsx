import Layout from '@/components/layout/Layout';
import Page from '@/components/layout/Page';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Tabs from '@/components/ui/Tabs';
import { 
  Calendar, 
  Clock, 
  FileText, 
  Inbox, 
  Users, 
  DollarSign, 
  MessageSquare, 
  Edit, 
  Download, 
  Plus, 
  MoreHorizontal, 
  Link as LinkIcon
} from 'lucide-react';

// Mock data for single matter
const matter = {
  id: 'M1001',
  title: 'Johnson v. ABC Corporation',
  client: 'Johnson Family',
  description: 'Personal injury lawsuit related to workplace accident at ABC Corporation manufacturing facility.',
  practice: 'Litigation',
  status: 'Active',
  dueDate: 'Oct 15, 2023',
  startDate: 'Apr 22, 2023',
  assignee: 'Jane Smith',
  billableHours: 24.5,
  billingRate: '$250/hour',
  totalBilled: '$6,125.00',
  courtLocation: 'County Circuit Court',
  caseNumber: 'CIV-2023-45678',
  filingDate: 'May 2, 2023',
};

// Mock data for documents
const documents = [
  { id: 'D001', name: 'Initial Complaint.pdf', type: 'PDF', size: '1.2 MB', date: 'May 2, 2023', category: 'Filings' },
  { id: 'D002', name: 'Medical Report.docx', type: 'Word', size: '3.4 MB', date: 'May 10, 2023', category: 'Evidence' },
  { id: 'D003', name: 'Defendant Response.pdf', type: 'PDF', size: '0.9 MB', date: 'Jun 5, 2023', category: 'Filings' },
  { id: 'D004', name: 'Client Interview Notes.docx', type: 'Word', size: '0.5 MB', date: 'Apr 25, 2023', category: 'Notes' },
];

// Mock time entries
const timeEntries = [
  { id: 'T001', description: 'Client interview and case assessment', date: 'Apr 22, 2023', hours: 2.5, billed: '$625.00', attorney: 'Jane Smith' },
  { id: 'T002', description: 'Document preparation and filing', date: 'May 1, 2023', hours: 4.0, billed: '$1,000.00', attorney: 'Jane Smith' },
  { id: 'T003', description: 'Research on precedent cases', date: 'May 15, 2023', hours: 6.0, billed: '$1,500.00', attorney: 'John Doe' },
  { id: 'T004', description: 'Meeting with opposing counsel', date: 'Jun 10, 2023', hours: 1.5, billed: '$375.00', attorney: 'Jane Smith' },
];

// Mock activity feed
const activities = [
  { id: 'A001', action: 'Document added', detail: 'Medical Report.docx', date: 'May 10, 2023', user: 'John Doe' },
  { id: 'A002', action: 'Status changed', detail: 'From "Pending" to "Active"', date: 'May 5, 2023', user: 'Jane Smith' },
  { id: 'A003', action: 'Time entry added', detail: '6 hours - Research', date: 'May 15, 2023', user: 'John Doe' },
  { id: 'A004', action: 'Notes updated', detail: 'Added client meeting notes', date: 'Jun 12, 2023', user: 'Jane Smith' },
];

export default function MatterDetailPage() {
  return (
    <Layout>
      <Page
        title={matter.title}
        subtitle={`Matter ID: ${matter.id} • ${matter.client}`}
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
              iconLeft={<MessageSquare className="h-4 w-4" />}
            >
              Message Client
            </Button>
            <Button
              variant="outline"
              iconLeft={<MoreHorizontal className="h-4 w-4" />}
              className="px-2"
            >
              <span className="sr-only">More actions</span>
            </Button>
          </div>
        }
      >
        {/* Main content with split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Matter summary */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader title="Matter Details" />
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Status</span>
                  <Badge variant="success" dot>{matter.status}</Badge>
                </div>
                <DetailItem icon={<Calendar />} label="Due Date" value={matter.dueDate} />
                <DetailItem icon={<Calendar />} label="Start Date" value={matter.startDate} />
                <DetailItem icon={<Users />} label="Client" value={matter.client} />
                <DetailItem icon={<Inbox />} label="Practice Area" value={matter.practice} />
                <DetailItem icon={<FileText />} label="Case Number" value={matter.caseNumber} />
                <DetailItem icon={<LinkIcon />} label="Court" value={matter.courtLocation} />
                <DetailItem icon={<Calendar />} label="Filing Date" value={matter.filingDate} />
                <DetailItem icon={<Users />} label="Assigned To" value={matter.assignee} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader title="Billing Summary" />
              <CardContent className="space-y-4">
                <DetailItem icon={<Clock />} label="Billable Hours" value={matter.billableHours.toString()} />
                <DetailItem icon={<DollarSign />} label="Billing Rate" value={matter.billingRate} />
                <DetailItem icon={<DollarSign />} label="Total Billed" value={matter.totalBilled} />
                <div className="pt-2">
                  <Button variant="secondary" className="w-full" href="/billing">
                    View Billing Details
                  </Button>
                </div>
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
                    icon: <Inbox className="h-4 w-4" />,
                    content: (
                      <div className="p-6">
                        <div className="mb-6">
                          <h3 className="text-lg font-medium text-text-primary mb-2">Description</h3>
                          <p className="text-text-secondary">{matter.description}</p>
                        </div>

                        <div className="mb-6">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-text-primary">Recent Activity</h3>
                            <Button variant="link" href="#activity">View All</Button>
                          </div>
                          <div className="space-y-4">
                            {activities.slice(0, 3).map(activity => (
                              <div key={activity.id} className="flex items-start space-x-3 border-b border-border pb-3 last:border-0">
                                <div className="bg-gray-50 p-2 rounded-lg">
                                  <FileText className="h-5 w-5 text-accent-indigo" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{activity.action}</p>
                                  <p className="text-sm text-text-secondary">{activity.detail}</p>
                                  <div className="flex items-center mt-1">
                                    <span className="text-xs text-text-secondary">{activity.date}</span>
                                    <span className="mx-2 text-text-secondary">•</span>
                                    <span className="text-xs text-text-secondary">{activity.user}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-text-primary">Key Documents</h3>
                            <Button variant="link" href="#documents">View All</Button>
                          </div>
                          <div className="space-y-2">
                            {documents.slice(0, 3).map(doc => (
                              <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                                <div className="flex items-center">
                                  <div className="bg-accent-indigo-50 p-2 rounded">
                                    <FileText className="h-5 w-5 text-accent-indigo" />
                                  </div>
                                  <div className="ml-3">
                                    <p className="text-sm font-medium">{doc.name}</p>
                                    <p className="text-xs text-text-secondary">{doc.size} • {doc.date}</p>
                                  </div>
                                </div>
                                <Button variant="ghost" className="p-1" aria-label="Download">
                                  <Download className="h-4 w-4 text-text-secondary" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ),
                  },
                  {
                    id: 'documents',
                    label: 'Documents',
                    icon: <FileText className="h-4 w-4" />,
                    content: (
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-lg font-medium text-text-primary">Documents</h3>
                          <Button 
                            variant="primary" 
                            iconLeft={<Plus className="h-4 w-4" />}
                          >
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
                    id: 'billing',
                    label: 'Billing',
                    icon: <DollarSign className="h-4 w-4" />,
                    content: (
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-lg font-medium text-text-primary">Time Entries</h3>
                          <Button 
                            variant="primary" 
                            iconLeft={<Plus className="h-4 w-4" />}
                          >
                            Add Time Entry
                          </Button>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-border">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary tracking-wider">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary tracking-wider">Attorney</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary tracking-wider">Hours</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary tracking-wider">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-border">
                              {timeEntries.map(entry => (
                                <tr key={entry.id} className="hover:bg-gray-50">
                                  <td className="px-6 py-4 text-sm text-text-primary">{entry.description}</td>
                                  <td className="px-6 py-4 text-sm text-text-primary">{entry.date}</td>
                                  <td className="px-6 py-4 text-sm text-text-primary">{entry.attorney}</td>
                                  <td className="px-6 py-4 text-sm text-text-primary">{entry.hours}</td>
                                  <td className="px-6 py-4 text-sm text-text-primary">{entry.billed}</td>
                                  <td className="px-6 py-4 text-sm text-text-primary text-right">
                                    <Button variant="ghost" className="p-1" aria-label="More">
                                      <MoreHorizontal className="h-4 w-4 text-text-secondary" />
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="mt-6 flex justify-end">
                          <Card className="p-4 shadow-sm">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-text-secondary">Total Hours</p>
                                <p className="text-lg font-semibold">{matter.billableHours}</p>
                              </div>
                              <div>
                                <p className="text-sm text-text-secondary">Total Billed</p>
                                <p className="text-lg font-semibold">{matter.totalBilled}</p>
                              </div>
                            </div>
                          </Card>
                        </div>
                      </div>
                    ),
                  },
                  {
                    id: 'activity',
                    label: 'Activity',
                    icon: <Clock className="h-4 w-4" />,
                    content: (
                      <div className="p-6">
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
                                  <p className="text-sm text-text-secondary">{activity.detail}</p>
                                  <div className="mt-1 flex items-center text-xs text-text-secondary">
                                    <span>{activity.date}</span>
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
                  }
                ]}
                variant="underline"
                className="px-6 pt-6"
              />
            </Card>
          </div>
        </div>
      </Page>
    </Layout>
  );
}

// Helper components
function DetailItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center text-text-secondary">
        <span className="h-5 w-5 mr-2">{icon}</span>
        <span className="text-sm">{label}</span>
      </div>
      <span className="text-sm font-medium text-text-primary">{value}</span>
    </div>
  );
} 