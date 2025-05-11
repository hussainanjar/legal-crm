'use client';

import { useState } from 'react';
import { 
  FileText, 
  Clock, 
  Calendar as CalendarIcon, 
  CreditCard, 
  MessageSquare, 
  User, 
  Briefcase, 
  ChevronRight, 
  Download, 
  CheckCircle, 
  ArrowUpRight,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';

// This page doesn't use the main Layout as it's a client-facing portal with its own simplified layout

export default function PortalPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  const clientName = "Johnson Family";
  const clientId = "C1001";
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-accent-indigo">Prompt CRM</h1>
              </div>
              <div className="hidden md:block ml-10">
                <div className="ml-4 flex items-center space-x-4">
                  <button 
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'overview' 
                        ? 'text-accent-indigo bg-accent-indigo-50' 
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                    onClick={() => setActiveTab('overview')}
                  >
                    Overview
                  </button>
                  <button 
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'documents' 
                        ? 'text-accent-indigo bg-accent-indigo-50' 
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                    onClick={() => setActiveTab('documents')}
                  >
                    Documents
                  </button>
                  <button 
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'billing' 
                        ? 'text-accent-indigo bg-accent-indigo-50' 
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                    onClick={() => setActiveTab('billing')}
                  >
                    Billing
                  </button>
                  <button 
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'calendar' 
                        ? 'text-accent-indigo bg-accent-indigo-50' 
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                    onClick={() => setActiveTab('calendar')}
                  >
                    Calendar
                  </button>
                  <button 
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'messages' 
                        ? 'text-accent-indigo bg-accent-indigo-50' 
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                    onClick={() => setActiveTab('messages')}
                  >
                    Messages
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center">
              <div className="flex items-center space-x-2 mr-4">
                <div className="h-8 w-8 rounded-full bg-accent-indigo flex items-center justify-center text-white">
                  <User className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">{clientName}</span>
              </div>
              <button className="flex items-center text-sm text-text-secondary hover:text-text-primary">
                <LogOut className="h-4 w-4 mr-1" /> Sign Out
              </button>
            </div>
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-gray-100 focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button 
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                  activeTab === 'overview' 
                    ? 'text-accent-indigo bg-accent-indigo-50' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                onClick={() => {
                  setActiveTab('overview');
                  setMobileMenuOpen(false);
                }}
              >
                Overview
              </button>
              <button 
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                  activeTab === 'documents' 
                    ? 'text-accent-indigo bg-accent-indigo-50' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                onClick={() => {
                  setActiveTab('documents');
                  setMobileMenuOpen(false);
                }}
              >
                Documents
              </button>
              <button 
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                  activeTab === 'billing' 
                    ? 'text-accent-indigo bg-accent-indigo-50' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                onClick={() => {
                  setActiveTab('billing');
                  setMobileMenuOpen(false);
                }}
              >
                Billing
              </button>
              <button 
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                  activeTab === 'calendar' 
                    ? 'text-accent-indigo bg-accent-indigo-50' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                onClick={() => {
                  setActiveTab('calendar');
                  setMobileMenuOpen(false);
                }}
              >
                Calendar
              </button>
              <button 
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                  activeTab === 'messages' 
                    ? 'text-accent-indigo bg-accent-indigo-50' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                onClick={() => {
                  setActiveTab('messages');
                  setMobileMenuOpen(false);
                }}
              >
                Messages
              </button>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-accent-indigo flex items-center justify-center text-white">
                    <User className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-text-primary">{clientName}</div>
                  <div className="text-sm font-medium text-text-secondary">Client ID: {clientId}</div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <button className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-text-primary hover:bg-gray-100 w-full text-left">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <div className="md:flex md:justify-between md:items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-1">Welcome, {clientName}</h2>
                <p className="text-text-secondary">Here's an overview of your matters and recent activity</p>
              </div>
              <Button variant="primary" className="mt-3 md:mt-0">
                Request Consultation
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Stats cards */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-accent-indigo-50 mr-4">
                      <Briefcase className="h-6 w-6 text-accent-indigo" />
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Active Matters</p>
                      <h3 className="text-2xl font-bold text-text-primary">2</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-50 mr-4">
                      <FileText className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Documents</p>
                      <h3 className="text-2xl font-bold text-text-primary">12</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-50 mr-4">
                      <CalendarIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Upcoming Events</p>
                      <h3 className="text-2xl font-bold text-text-primary">3</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Matters section */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader title="Your Matters" />
                  <div className="divide-y divide-gray-200">
                    {[
                      {
                        id: 'M1001',
                        title: 'Johnson v. ABC Corporation',
                        type: 'Litigation',
                        status: 'Active',
                        progress: 40,
                        attorney: 'Jane Smith',
                        lastUpdate: '2 days ago'
                      },
                      {
                        id: 'M1002',
                        title: 'Johnson Property Purchase',
                        type: 'Real Estate',
                        status: 'Active',
                        progress: 75,
                        attorney: 'Michael Chen',
                        lastUpdate: 'Yesterday'
                      },
                      {
                        id: 'M1003',
                        title: 'Estate Planning',
                        type: 'Estate',
                        status: 'Completed',
                        progress: 100,
                        attorney: 'Jane Smith',
                        lastUpdate: '1 month ago'
                      }
                    ].map(matter => (
                      <div key={matter.id} className="px-6 py-4 hover:bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-md font-medium text-text-primary">{matter.title}</h3>
                            <div className="flex items-center mt-1">
                              <Badge variant="default" className="mr-2">{matter.type}</Badge>
                              <Badge 
                                variant={matter.status === 'Active' ? 'success' : 'primary'}
                                dot
                              >
                                {matter.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-text-secondary mt-2">
                              <span className="font-medium">Attorney:</span> {matter.attorney} • <span className="font-medium">Last update:</span> {matter.lastUpdate}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm" iconRight={<ChevronRight className="h-4 w-4" />}>
                            Details
                          </Button>
                        </div>
                        
                        <div className="mt-3">
                          <div className="flex items-center">
                            <div className="text-xs text-text-secondary w-8">{matter.progress}%</div>
                            <div className="flex-1 mx-2">
                              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${
                                    matter.progress === 100 ? 'bg-green-500' : 'bg-accent-indigo'
                                  }`}
                                  style={{ width: `${matter.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="text-xs text-text-secondary">Progress</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
              
              {/* Recent Activity / Upcoming Events */}
              <div>
                <Card className="mb-6">
                  <CardHeader title="Upcoming Events" />
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-200">
                      <div className="px-6 py-4">
                        <div className="flex items-start">
                          <div className="p-2 rounded-full bg-blue-50 mr-3">
                            <CalendarIcon className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Client Meeting</p>
                            <p className="text-xs text-text-secondary mt-0.5">Oct 15, 2023 • 10:00 AM</p>
                          </div>
                        </div>
                      </div>
                      <div className="px-6 py-4">
                        <div className="flex items-start">
                          <div className="p-2 rounded-full bg-orange-50 mr-3">
                            <Clock className="h-4 w-4 text-orange-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Document Deadline</p>
                            <p className="text-xs text-text-secondary mt-0.5">Oct 20, 2023 • 11:59 PM</p>
                          </div>
                        </div>
                      </div>
                      <div className="px-6 py-4">
                        <div className="flex items-start">
                          <div className="p-2 rounded-full bg-purple-50 mr-3">
                            <MessageSquare className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Conference Call</p>
                            <p className="text-xs text-text-secondary mt-0.5">Oct 22, 2023 • 2:30 PM</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                      <button className="text-sm text-accent-indigo hover:text-accent-indigo-dark font-medium flex items-center">
                        View all events <ArrowUpRight className="h-3 w-3 ml-1" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader title="Quick Actions" />
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-200">
                      <button className="w-full px-6 py-4 flex items-center text-left hover:bg-gray-50">
                        <div className="p-2 rounded-full bg-gray-100 mr-3">
                          <FileText className="h-4 w-4 text-text-secondary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Upload Documents</p>
                          <p className="text-xs text-text-secondary mt-0.5">Share files with your legal team</p>
                        </div>
                      </button>
                      <button className="w-full px-6 py-4 flex items-center text-left hover:bg-gray-50">
                        <div className="p-2 rounded-full bg-gray-100 mr-3">
                          <MessageSquare className="h-4 w-4 text-text-secondary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Send Message</p>
                          <p className="text-xs text-text-secondary mt-0.5">Contact your attorney</p>
                        </div>
                      </button>
                      <button className="w-full px-6 py-4 flex items-center text-left hover:bg-gray-50">
                        <div className="p-2 rounded-full bg-gray-100 mr-3">
                          <CreditCard className="h-4 w-4 text-text-secondary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Make Payment</p>
                          <p className="text-xs text-text-secondary mt-0.5">Pay invoices securely</p>
                        </div>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
        
        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div>
            <div className="md:flex md:justify-between md:items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-1">Documents</h2>
                <p className="text-text-secondary">Access and download files related to your matters</p>
              </div>
              <Button variant="primary" className="mt-3 md:mt-0">
                Upload New Document
              </Button>
            </div>
            
            <Card className="mb-6">
              <div className="px-6 py-4 border-b border-gray-200 flex flex-wrap gap-4 items-center justify-between">
                <div className="relative flex-1 min-w-[200px]">
                  <input 
                    type="text" 
                    placeholder="Search documents..." 
                    className="w-full pl-4 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-indigo focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="p-0">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary tracking-wider">
                        Document
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary tracking-wider">
                        Matter
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary tracking-wider">
                        Date Added
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary tracking-wider">
                        Added By
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { 
                        id: 'D1001', 
                        name: 'Contract_draft_v2.pdf', 
                        type: 'PDF',
                        matter: 'Johnson v. ABC Corporation', 
                        date: 'Oct 2, 2023', 
                        addedBy: 'Jane Smith' 
                      },
                      { 
                        id: 'D1002', 
                        name: 'Property_deed.pdf', 
                        type: 'PDF',
                        matter: 'Johnson Property Purchase', 
                        date: 'Sep 15, 2023', 
                        addedBy: 'Jane Smith' 
                      },
                      { 
                        id: 'D1003', 
                        name: 'Client_intake_form.docx',
                        type: 'DOCX', 
                        matter: 'Johnson Property Purchase', 
                        date: 'Sep 10, 2023', 
                        addedBy: 'Michael Chen' 
                      },
                      { 
                        id: 'D1004', 
                        name: 'Settlement_proposal.pdf',
                        type: 'PDF', 
                        matter: 'Johnson v. ABC Corporation', 
                        date: 'Aug 28, 2023', 
                        addedBy: 'Jane Smith' 
                      },
                      { 
                        id: 'D1005', 
                        name: 'Estate_documents.pdf',
                        type: 'PDF', 
                        matter: 'Estate Planning', 
                        date: 'Jul 15, 2023', 
                        addedBy: 'Jane Smith' 
                      }
                    ].map(doc => (
                      <tr key={doc.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 bg-gray-100 rounded-md flex items-center justify-center">
                              <FileText className="h-4 w-4 text-text-secondary" />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-text-primary">{doc.name}</div>
                              <div className="text-xs text-text-secondary">{doc.type}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-text-secondary">{doc.matter}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-text-secondary">{doc.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-text-secondary">{doc.addedBy}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="ghost" size="sm" iconLeft={<Download className="h-4 w-4" />}>
                            Download
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
        
        {/* Billing Tab */}
        {activeTab === 'billing' && (
          <div>
            <div className="md:flex md:justify-between md:items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-1">Billing & Payments</h2>
                <p className="text-text-secondary">Review and pay your invoices</p>
              </div>
              <Button variant="primary" className="mt-3 md:mt-0" iconLeft={<CreditCard className="h-4 w-4" />}>
                Make a Payment
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Billing summary cards */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-red-50 mr-4">
                      <CreditCard className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Outstanding Balance</p>
                      <h3 className="text-2xl font-bold text-text-primary">$2,350.00</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-50 mr-4">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Last Payment</p>
                      <h3 className="text-2xl font-bold text-text-primary">$950.00</h3>
                      <p className="text-xs text-text-secondary mt-1">Sep 15, 2023</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-yellow-50 mr-4">
                      <Clock className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Next Invoice</p>
                      <h3 className="text-2xl font-bold text-text-primary">Oct 31, 2023</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader title="Recent Invoices" />
              <div className="p-0">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary tracking-wider">
                        Invoice #
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary tracking-wider">
                        Matter
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { 
                        id: 'INV-1001', 
                        date: 'Oct 1, 2023', 
                        matter: 'Johnson v. ABC Corporation', 
                        amount: 2350.00, 
                        status: 'Unpaid',
                        dueDate: 'Oct 15, 2023' 
                      },
                      { 
                        id: 'INV-1000', 
                        date: 'Sep 1, 2023', 
                        matter: 'Johnson v. ABC Corporation', 
                        amount: 950.00, 
                        status: 'Paid',
                        dueDate: 'Sep 15, 2023' 
                      },
                      { 
                        id: 'INV-999', 
                        date: 'Aug 1, 2023', 
                        matter: 'Johnson Property Purchase', 
                        amount: 1500.00, 
                        status: 'Paid',
                        dueDate: 'Aug 15, 2023' 
                      },
                      { 
                        id: 'INV-998', 
                        date: 'Jul 1, 2023', 
                        matter: 'Estate Planning', 
                        amount: 2000.00, 
                        status: 'Paid',
                        dueDate: 'Jul 15, 2023' 
                      }
                    ].map(invoice => (
                      <tr key={invoice.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-text-primary">{invoice.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-text-secondary">{invoice.date}</div>
                          <div className="text-xs text-text-secondary">Due: {invoice.dueDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-text-secondary">{invoice.matter}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium">${invoice.amount.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge 
                            variant={invoice.status === 'Paid' ? 'success' : 'warning'} 
                            dot
                          >
                            {invoice.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="sm" iconLeft={<Download className="h-4 w-4" />}>
                              Download
                            </Button>
                            {invoice.status === 'Unpaid' && (
                              <Button variant="primary" size="sm">
                                Pay Now
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
        
        {/* For brevity, Calendar and Messages tabs are not fully implemented */}
        {activeTab === 'calendar' && (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-text-primary mb-4">Calendar</h2>
            <p className="text-text-secondary mb-4">View your upcoming events and meetings</p>
            <Badge variant="default">Coming Soon</Badge>
          </div>
        )}
        
        {activeTab === 'messages' && (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-text-primary mb-4">Messages</h2>
            <p className="text-text-secondary mb-4">Securely communicate with your legal team</p>
            <Badge variant="default">Coming Soon</Badge>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-text-secondary text-sm">
              &copy; 2023 Prompt CRM. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-text-secondary hover:text-text-primary text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-text-secondary hover:text-text-primary text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-text-secondary hover:text-text-primary text-sm">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 