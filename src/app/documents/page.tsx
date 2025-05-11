'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Page from '@/components/layout/Page';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Tabs from '@/components/ui/Tabs';
import { 
  FileText, 
  Grid, 
  List, 
  Upload, 
  FolderOpen, 
  Clock, 
  Download, 
  MoreHorizontal, 
  Eye, 
  Star, 
  Filter, 
  Search,
  History
} from 'lucide-react';

// Mock document data
const documents = [
  { 
    id: 'D1001', 
    name: 'Contract_draft_v2.pdf', 
    type: 'PDF',
    category: 'Contracts', 
    date: 'Oct 2, 2023', 
    size: '1.2 MB',
    client: 'Johnson Family',
    matter: 'Johnson v. ABC Corporation',
    version: 2,
    addedBy: 'Jane Smith',
    starred: true
  },
  { 
    id: 'D1002', 
    name: 'Property_deed.pdf', 
    type: 'PDF',
    category: 'Property Records', 
    date: 'Sep 15, 2023', 
    size: '3.5 MB',
    client: 'Johnson Family',
    matter: 'Johnson Property Purchase',
    version: 1,
    addedBy: 'Jane Smith',
    starred: false
  },
  { 
    id: 'D1003', 
    name: 'Client_intake_form.docx',
    type: 'DOCX', 
    category: 'Client Documents', 
    date: 'Jan 15, 2023', 
    size: '450 KB',
    client: 'Johnson Family',
    matter: 'General',
    version: 3,
    addedBy: 'Michael Chen',
    starred: false
  },
  { 
    id: 'D1004', 
    name: 'Case_notes_sep_2023.docx',
    type: 'DOCX', 
    category: 'Case Notes', 
    date: 'Sep 30, 2023', 
    size: '820 KB',
    client: 'Smith Corporation',
    matter: 'Smith v. Jones',
    version: 1,
    addedBy: 'Jane Smith',
    starred: true
  },
  { 
    id: 'D1005', 
    name: 'Financial_records_2023.xlsx',
    type: 'XLSX', 
    category: 'Financial', 
    date: 'Aug 22, 2023', 
    size: '2.1 MB',
    client: 'Smith Corporation',
    matter: 'Annual Review',
    version: 4,
    addedBy: 'Michael Chen',
    starred: false
  },
  { 
    id: 'D1006', 
    name: 'Settlement_agreement.pdf',
    type: 'PDF', 
    category: 'Agreements', 
    date: 'Jul 15, 2023', 
    size: '1.8 MB',
    client: 'Davidson LLC',
    matter: 'Davidson v. State',
    version: 2,
    addedBy: 'Jane Smith',
    starred: false
  },
];

// Mock folders
const folders = [
  { id: 'F1', name: 'Contracts', count: 24 },
  { id: 'F2', name: 'Property Records', count: 15 },
  { id: 'F3', name: 'Client Documents', count: 32 },
  { id: 'F4', name: 'Case Notes', count: 18 },
  { id: 'F5', name: 'Financial Records', count: 10 },
];

export default function DocumentsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState('all');
  
  // Function to handle tab changes
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };
  
  return (
    <Layout>
      <Page
        title="Document Management"
        subtitle="Store, organize and access all your legal documents"
        actions={
          <div className="flex gap-2">
            <Button
              variant="primary"
              iconLeft={<Upload className="h-4 w-4" />}
            >
              Upload Files
            </Button>
            <Button
              variant="secondary"
              iconLeft={<FolderOpen className="h-4 w-4" />}
            >
              New Folder
            </Button>
          </div>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left sidebar - Folders */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader title="Folders" />
              <CardContent className="space-y-1 p-0">
                {folders.map(folder => (
                  <div 
                    key={folder.id} 
                    className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-center">
                      <FolderOpen className="h-5 w-5 text-accent-indigo mr-3" />
                      <span className="text-sm font-medium">{folder.name}</span>
                    </div>
                    <Badge variant="default" size="sm">{folder.count}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upload area */}
            <Card>
              <CardContent className="p-6">
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <h3 className="text-sm font-medium text-text-primary mb-1">Drag and drop files</h3>
                  <p className="text-xs text-text-secondary mb-3">or click to browse</p>
                  <Button variant="ghost" size="sm">Select Files</Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick filters */}
            <Card>
              <CardHeader title="Quick Filters" />
              <CardContent className="space-y-1 p-0">
                <div className="flex items-center px-6 py-3 hover:bg-gray-50 cursor-pointer">
                  <Star className="h-5 w-5 text-yellow-500 mr-3" />
                  <span className="text-sm font-medium">Starred</span>
                </div>
                <div className="flex items-center px-6 py-3 hover:bg-gray-50 cursor-pointer">
                  <Clock className="h-5 w-5 text-text-secondary mr-3" />
                  <span className="text-sm font-medium">Recent</span>
                </div>
                <div className="flex items-center px-6 py-3 hover:bg-gray-50 cursor-pointer">
                  <History className="h-5 w-5 text-text-secondary mr-3" />
                  <span className="text-sm font-medium">Version History</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content - Documents */}
          <div className="lg:col-span-3">
            <Card className="p-0 overflow-hidden">
              {/* Search and filter bar */}
              <div className="p-4 border-b border-gray-200 flex flex-wrap gap-4 items-center justify-between">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-secondary" />
                  <input 
                    type="text" 
                    placeholder="Search documents..." 
                    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-indigo focus:border-transparent"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    iconLeft={<Filter className="h-4 w-4" />} 
                    size="sm"
                  >
                    Filters
                  </Button>
                  <div className="flex items-center border border-gray-200 rounded-md">
                    <button 
                      className={`p-1.5 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid className="h-4 w-4 text-text-secondary" />
                    </button>
                    <button 
                      className={`p-1.5 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                      onClick={() => setViewMode('list')}
                    >
                      <List className="h-4 w-4 text-text-secondary" />
                    </button>
                  </div>
                </div>
              </div>

              <Tabs
                tabs={[
                  {
                    id: 'all',
                    label: 'All Documents',
                    content: (
                      <div className="p-6">
                        {viewMode === 'grid' ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {documents.map(doc => (
                              <div key={doc.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-card-hover transition-shadow">
                                <div className="h-40 bg-gray-50 border-b border-gray-200 p-4 flex items-center justify-center relative">
                                  <div className="flex flex-col items-center">
                                    <FileText className="h-12 w-12 text-gray-400" />
                                    <Badge className="mt-2" variant="default">{doc.type}</Badge>
                                  </div>
                                  {doc.starred && (
                                    <Star className="absolute top-2 right-2 h-5 w-5 text-yellow-500" />
                                  )}
                                  {doc.version > 1 && (
                                    <Badge 
                                      className="absolute bottom-2 right-2" 
                                      variant="primary"
                                    >
                                      v{doc.version}
                                    </Badge>
                                  )}
                                </div>
                                <div className="p-4">
                                  <h4 className="font-medium text-text-primary truncate" title={doc.name}>
                                    {doc.name}
                                  </h4>
                                  <p className="text-xs text-text-secondary mt-1">
                                    {doc.category} • {doc.size}
                                  </p>
                                  <p className="text-xs text-text-secondary mt-1">
                                    {doc.client} • {doc.date}
                                  </p>
                                  <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-200">
                                    <span className="text-xs text-text-secondary">
                                      Added by {doc.addedBy}
                                    </span>
                                    <div className="flex space-x-1">
                                      <Button variant="ghost" className="p-1" aria-label="Preview">
                                        <Eye className="h-4 w-4 text-text-secondary" />
                                      </Button>
                                      <Button variant="ghost" className="p-1" aria-label="Download">
                                        <Download className="h-4 w-4 text-text-secondary" />
                                      </Button>
                                      <Button variant="ghost" className="p-1" aria-label="More">
                                        <MoreHorizontal className="h-4 w-4 text-text-secondary" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {documents.map(doc => (
                              <div key={doc.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                                <div className="flex items-center min-w-0">
                                  <div className="flex-shrink-0 bg-accent-indigo-50 p-2 rounded">
                                    <FileText className="h-5 w-5 text-accent-indigo" />
                                  </div>
                                  <div className="ml-3 min-w-0">
                                    <div className="flex items-center">
                                      <p className="text-sm font-medium truncate mr-2">{doc.name}</p>
                                      {doc.starred && <Star className="h-4 w-4 text-yellow-500 mr-1" />}
                                      {doc.version > 1 && (
                                        <Badge variant="primary" size="sm">v{doc.version}</Badge>
                                      )}
                                    </div>
                                    <div className="flex items-center mt-1 text-xs text-text-secondary">
                                      <Badge size="sm" variant="default">{doc.category}</Badge>
                                      <span className="mx-2">•</span>
                                      <span>{doc.size}</span>
                                      <span className="mx-2">•</span>
                                      <span>{doc.date}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" className="p-1" aria-label="Preview">
                                    <Eye className="h-4 w-4 text-text-secondary" />
                                  </Button>
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
                        )}
                      </div>
                    ),
                  },
                  {
                    id: 'recent',
                    label: 'Recent',
                    content: <div className="p-6">Recent documents content</div>,
                  },
                  {
                    id: 'shared',
                    label: 'Shared',
                    content: <div className="p-6">Shared documents content</div>,
                  },
                  {
                    id: 'templates',
                    label: 'Templates',
                    content: <div className="p-6">Templates content</div>,
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