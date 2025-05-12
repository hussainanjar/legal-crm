'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Page from '@/components/layout/Page';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { 
  Settings, 
  User, 
  UserPlus, 
  Shield, 
  Trash,
  LogOut,
  CheckCircle,
  Database,
  Briefcase
} from 'lucide-react';

// Define BadgeVariant type
type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';

// Mock settings structure with permissions
const settingsSections = [
  {
    id: 'account',
    title: 'Account Settings',
    icon: <User className="h-5 w-5" />,
    items: [
      { 
        id: 'profile', 
        title: 'Profile Information', 
        description: 'Update your personal details and contact information.',
        permission: 'user' 
      },
      { 
        id: 'password', 
        title: 'Password & Security', 
        description: 'Manage your password and security preferences.',
        permission: 'user' 
      },
      { 
        id: 'notifications', 
        title: 'Notification Preferences', 
        description: 'Control which notifications you want to receive.',
        permission: 'user' 
      },
      { 
        id: 'billing', 
        title: 'Billing & Subscription', 
        description: 'Manage your subscription plan and payment methods.',
        permission: 'admin' 
      }
    ]
  },
  {
    id: 'system',
    title: 'System Settings',
    icon: <Settings className="h-5 w-5" />,
    items: [
      { 
        id: 'general', 
        title: 'General Settings', 
        description: 'Configure global application settings.',
        permission: 'admin' 
      },
      { 
        id: 'users', 
        title: 'User Management', 
        description: 'Add, edit or remove user accounts.',
        permission: 'admin' 
      },
      { 
        id: 'permissions', 
        title: 'Permissions & Roles', 
        description: 'Define user roles and access levels.',
        permission: 'admin' 
      },
      { 
        id: 'matters', 
        title: 'Matter Types & Categories', 
        description: 'Configure custom fields and categories for matters.',
        permission: 'admin' 
      }
    ]
  },
  {
    id: 'practice',
    title: 'Practice Management',
    icon: <Briefcase className="h-5 w-5" />,
    items: [
      { 
        id: 'templates', 
        title: 'Document Templates', 
        description: 'Manage templates for common legal documents.',
        permission: 'manager' 
      },
      { 
        id: 'workflows', 
        title: 'Workflow Configuration', 
        description: 'Configure automated workflows for common processes.',
        permission: 'admin' 
      },
      { 
        id: 'rates', 
        title: 'Billing Rates', 
        description: 'Set standard billing rates for each user or matter type.',
        permission: 'admin' 
      },
      { 
        id: 'integration', 
        title: 'Integrations', 
        description: 'Connect to third-party services and applications.',
        permission: 'admin' 
      }
    ]
  },
  {
    id: 'data',
    title: 'Data Management',
    icon: <Database className="h-5 w-5" />,
    items: [
      { 
        id: 'export', 
        title: 'Data Export', 
        description: 'Export your data to various formats.',
        permission: 'admin' 
      },
      { 
        id: 'backup', 
        title: 'Backups', 
        description: 'Configure automated backups and restoration options.',
        permission: 'admin' 
      },
      { 
        id: 'archive', 
        title: 'Archive & Retention', 
        description: 'Set policies for data archiving and retention.',
        permission: 'admin' 
      }
    ]
  },
  {
    id: 'advanced',
    title: 'Advanced',
    icon: <Shield className="h-5 w-5" />,
    items: [
      { 
        id: 'audit', 
        title: 'Audit Logs', 
        description: 'View activity logs for security and compliance.',
        permission: 'admin' 
      },
      { 
        id: 'delete', 
        title: 'Delete Account', 
        description: 'Permanently delete your account and all data.',
        permission: 'admin',
        danger: true
      }
    ]
  }
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('account');
  const [activeItem, setActiveItem] = useState('profile');
  const [userRole] = useState('admin'); // For demo purposes
  
  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    // Set first allowed item as active
    const section = settingsSections.find(s => s.id === sectionId);
    if (section) {
      const firstAllowedItem = section.items.find(item => 
        hasPermission(item.permission)
      );
      if (firstAllowedItem) {
        setActiveItem(firstAllowedItem.id);
      }
    }
  };
  
  const hasPermission = (requiredPermission: string) => {
    switch(userRole) {
      case 'admin':
        return true; // Admin has all permissions
      case 'manager':
        return ['user', 'manager'].includes(requiredPermission);
      default:
        return requiredPermission === 'user';
    }
  };
  
  const renderSettingContent = () => {
    // Find the active setting section and item
    const section = settingsSections.find(s => s.id === activeSection);
    const item = section?.items.find(i => i.id === activeItem);
    
    if (!section || !item) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-text-secondary">Select a setting from the menu</p>
        </div>
      );
    }
    
    // Based on the active item, render the appropriate content
    switch(activeItem) {
      case 'profile':
        return <ProfileSettings />;
      case 'password':
        return <PasswordSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'users':
        return <UserManagementSettings />;
      case 'permissions':
        return <PermissionSettings />;
      case 'delete':
        return <DeleteAccountSettings />;
      default:
        return (
          <div className="p-8 text-center">
            <h3 className="text-lg font-medium text-text-primary mb-2">{item.title}</h3>
            <p className="text-text-secondary">{item.description}</p>
            <div className="mt-8">
              <Badge variant="default">Under Construction</Badge>
              <p className="mt-2 text-sm text-text-secondary">
                This settings section is currently being developed.
              </p>
            </div>
          </div>
        );
    }
  };
  
  return (
    <Layout>
      <Page
        title="Settings"
        subtitle="Configure and manage your account preferences"
        actions={
          <div className="flex gap-2">
            <Button
              variant="primary"
            >
              Save Changes
            </Button>
          </div>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left sidebar - Settings navigation */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-0 overflow-hidden">
              <div className="space-y-1">
                {settingsSections.map((section) => (
                  <div key={section.id}>
                    <button
                      className={`w-full flex items-center px-6 py-4 text-left ${
                        activeSection === section.id ? 'bg-gray-50' : ''
                      }`}
                      onClick={() => handleSectionClick(section.id)}
                    >
                      <span className="flex items-center text-text-secondary mr-3">
                        {section.icon}
                      </span>
                      <span className="font-medium">{section.title}</span>
                    </button>
                    
                    {activeSection === section.id && (
                      <div className="ml-12 mb-2 space-y-1">
                        {section.items.filter(item => hasPermission(item.permission)).map((item) => (
                          <button
                            key={item.id}
                            className={`w-full text-left px-4 py-2 text-sm rounded-md ${
                              activeItem === item.id 
                                ? 'bg-accent-indigo-50 text-accent-indigo font-medium' 
                                : 'text-text-secondary hover:text-text-primary hover:bg-gray-50'
                            } ${item.danger ? 'text-red-600 hover:text-red-700' : ''}`}
                            onClick={() => setActiveItem(item.id)}
                          >
                            {item.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Badge variant="primary">Admin</Badge>
                    <span className="ml-2 text-sm font-medium">Jane Smith</span>
                  </div>
                  <Button variant="ghost" size="sm" iconLeft={<LogOut className="h-4 w-4" />}>
                    Logout
                  </Button>
                </div>
                <div className="text-xs text-text-secondary">
                  <p>Last login: Oct 10, 2023, 9:24 AM</p>
                  <p className="mt-1">IP: 192.168.1.1</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content - Settings content */}
          <div className="lg:col-span-3">
            <Card className="overflow-hidden">
              {renderSettingContent()}
            </Card>
          </div>
        </div>
      </Page>
    </Layout>
  );
}

// Settings content components
function ProfileSettings() {
  return (
    <div className="p-6">
      <h3 className="text-lg font-medium text-text-primary mb-6">Profile Information</h3>
      
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                First Name
              </label>
              <input
                type="text"
                defaultValue="Jane"
                className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-indigo focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Last Name
              </label>
              <input
                type="text"
                defaultValue="Smith"
                className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-indigo focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="jane.smith@example.com"
                className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-indigo focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                defaultValue="(555) 123-4567"
                className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-indigo focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="md:w-1/3 space-y-4">
            <div className="mb-6 text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto flex items-center justify-center text-gray-400 text-4xl overflow-hidden">
                <span>JS</span>
              </div>
              <Button variant="link" className="mt-2">
                Change Photo
              </Button>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Job Title
              </label>
              <input
                type="text"
                defaultValue="Attorney"
                className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-indigo focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Department
              </label>
              <select
                className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-indigo focus:border-transparent"
              >
                <option>Litigation</option>
                <option>Corporate</option>
                <option>Real Estate</option>
                <option>Family Law</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <Button variant="primary">Save Changes</Button>
        </div>
      </div>
    </div>
  );
}

function PasswordSettings() {
  return (
    <div className="p-6">
      <h3 className="text-lg font-medium text-text-primary mb-6">Password & Security</h3>
      
      <div className="space-y-6 max-w-md">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">
            Current Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-indigo focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">
            New Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-indigo focus:border-transparent"
          />
          <div className="mt-2">
            <p className="text-xs text-text-secondary">Password requirements:</p>
            <ul className="text-xs text-text-secondary mt-1 space-y-1">
              <li className="flex items-center">
                <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                At least 8 characters long
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                Contains uppercase and lowercase letters
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                Contains at least one number
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                Contains at least one special character
              </li>
            </ul>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-indigo focus:border-transparent"
          />
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <Button variant="primary">Update Password</Button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h4 className="text-md font-medium text-text-primary mb-4">Two-Factor Authentication</h4>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Add an extra layer of security to your account</p>
              <p className="text-xs text-text-secondary mt-1">
                You&apos;ll be asked for an authentication code in addition to your password when you sign in.
              </p>
            </div>
            <div className="ml-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-indigo"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationSettings() {
  return (
    <div className="p-6">
      <h3 className="text-lg font-medium text-text-primary mb-6">Notification Preferences</h3>
      
      <div className="space-y-8">
        <div>
          <h4 className="text-md font-medium mb-4">Email Notifications</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">New matter assignments</p>
                <p className="text-xs text-text-secondary">Get notified when you are assigned to a new matter</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-indigo"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Document updates</p>
                <p className="text-xs text-text-secondary">Get notified when documents are uploaded or changed</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-indigo"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Task reminders</p>
                <p className="text-xs text-text-secondary">Get reminders for upcoming tasks and deadlines</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-indigo"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Client communications</p>
                <p className="text-xs text-text-secondary">Get notified when clients send messages or upload documents</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-indigo"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Billing and payments</p>
                <p className="text-xs text-text-secondary">Get notifications about invoices and payments</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-indigo"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-200">
          <h4 className="text-md font-medium mb-4">In-App Notifications</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Enable notification sound</p>
                <p className="text-xs text-text-secondary">Play sound when notifications arrive</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-indigo"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Desktop notifications</p>
                <p className="text-xs text-text-secondary">Receive notifications on your desktop</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-indigo"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <Button variant="primary">Save Preferences</Button>
        </div>
      </div>
    </div>
  );
}

function UserManagementSettings() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-text-primary">User Management</h3>
        <Button
          variant="primary"
          iconLeft={<UserPlus className="h-4 w-4" />}
        >
          Add New User
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-text-secondary tracking-wider">Name</th>
              <th className="px-6 py-3 text-xs font-medium text-text-secondary tracking-wider">Email</th>
              <th className="px-6 py-3 text-xs font-medium text-text-secondary tracking-wider">Role</th>
              <th className="px-6 py-3 text-xs font-medium text-text-secondary tracking-wider">Status</th>
              <th className="px-6 py-3 text-xs font-medium text-text-secondary tracking-wider">Last Login</th>
              <th className="px-6 py-3 text-xs font-medium text-text-secondary tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[
              { id: 1, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'Active', lastLogin: 'Today, 9:24 AM' },
              { id: 2, name: 'Michael Chen', email: 'michael@example.com', role: 'Attorney', status: 'Active', lastLogin: 'Today, 8:12 AM' },
              { id: 3, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Paralegal', status: 'Active', lastLogin: 'Yesterday, 5:30 PM' },
              { id: 4, name: 'Robert Davis', email: 'robert@example.com', role: 'Associate', status: 'Inactive', lastLogin: 'Oct 8, 2023, 2:15 PM' },
              { id: 5, name: 'Emma Wilson', email: 'emma@example.com', role: 'Billing', status: 'Active', lastLogin: 'Oct 9, 2023, 11:42 AM' }
            ].map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-100 text-xs flex items-center justify-center">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-text-primary">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text-secondary">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge
                    variant={user.role === 'Admin' ? 'primary' : user.role === 'Attorney' ? 'success' : 'default'}
                  >
                    {user.role}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge
                    variant={user.status === 'Active' ? 'success' : 'warning'}
                    dot
                  >
                    {user.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text-secondary">{user.lastLogin}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button variant="ghost" size="sm">Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PermissionSettings() {
  return (
    <div className="p-6">
      <h3 className="text-lg font-medium text-text-primary mb-6">Permissions & Roles</h3>
      
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-md font-medium">Role Management</h4>
            <p className="text-sm text-text-secondary mt-1">Manage roles and their permissions</p>
          </div>
          <Button variant="secondary" size="sm">Add New Role</Button>
        </div>
        
        <div className="space-y-4">
          {[
            { id: 1, name: 'Admin', count: 1, color: 'primary', description: 'Full access to all features and settings' },
            { id: 2, name: 'Attorney', count: 2, color: 'success', description: 'Can manage matters, clients, documents, and time entries' },
            { id: 3, name: 'Paralegal', count: 1, color: 'secondary', description: 'Can view matters, clients, and upload documents' },
            { id: 4, name: 'Billing', count: 1, color: 'info', description: 'Can manage billing, invoices, and payments' },
            { id: 5, name: 'Client', count: 12, color: 'warning', description: 'Limited access to assigned matters and documents' }
          ].map(role => (
            <div key={role.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center">
                    <Badge variant={role.color as BadgeVariant} className="mr-2">{role.name}</Badge>
                    <span className="text-xs text-text-secondary">{role.count} {role.count === 1 ? 'user' : 'users'}</span>
                  </div>
                  <p className="text-sm text-text-secondary mt-1">{role.description}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm">Permissions</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="pt-6 border-t border-gray-200">
          <h4 className="text-md font-medium mb-4">Matter Level Permissions</h4>
          <p className="text-sm text-text-secondary mb-4">
            Configure default permissions for users when they are assigned to a matter
          </p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary tracking-wider">
                    Permission
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-text-secondary tracking-wider">
                    Admin
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-text-secondary tracking-wider">
                    Attorney
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-text-secondary tracking-wider">
                    Paralegal
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-text-secondary tracking-wider">
                    Billing
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-text-secondary tracking-wider">
                    Client
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { id: 1, name: 'View matter details' },
                  { id: 2, name: 'Edit matter details' },
                  { id: 3, name: 'Upload documents' },
                  { id: 4, name: 'Delete documents' },
                  { id: 5, name: 'View billing information' },
                  { id: 6, name: 'Edit billing information' },
                  { id: 7, name: 'Add time entries' },
                  { id: 8, name: 'Add notes' }
                ].map((permission, idx) => (
                  <tr key={permission.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                      {permission.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                      <input type="checkbox" defaultChecked className="h-4 w-4 text-accent-indigo border-gray-300 rounded" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                      <input 
                        type="checkbox" 
                        defaultChecked={idx < 7} 
                        className="h-4 w-4 text-accent-indigo border-gray-300 rounded" 
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                      <input 
                        type="checkbox" 
                        defaultChecked={idx === 0 || idx === 2 || idx === 4 || idx === 7} 
                        className="h-4 w-4 text-accent-indigo border-gray-300 rounded" 
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                      <input 
                        type="checkbox" 
                        defaultChecked={idx === 0 || idx === 4 || idx === 5 || idx === 6} 
                        className="h-4 w-4 text-accent-indigo border-gray-300 rounded" 
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                      <input 
                        type="checkbox" 
                        defaultChecked={idx === 0 || idx === 2 || idx === 7} 
                        className="h-4 w-4 text-accent-indigo border-gray-300 rounded" 
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <Button variant="primary">Save Changes</Button>
        </div>
      </div>
    </div>
  );
}

function DeleteAccountSettings() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-red-600">Delete Account</h3>
        <Badge variant="error">Danger Zone</Badge>
      </div>
      
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Trash className="h-5 w-5 text-red-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-md font-medium text-red-800">Warning: This action cannot be undone</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>
                Deleting your account will:
              </p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Permanently remove all your data from our systems</li>
                <li>Cancel all subscriptions and billing</li>
                <li>Remove access for all users</li>
                <li>Delete all client records, matters, documents, and communications</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6 max-w-md">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">
            Type &quot;DELETE&quot; to confirm
          </label>
          <input
            type="text"
            placeholder="DELETE"
            className="w-full p-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">
            Enter your password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full p-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
        
        <div className="pt-4">
          <Button variant="primary" iconLeft={<Trash className="h-4 w-4" />}>
            Permanently Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
} 