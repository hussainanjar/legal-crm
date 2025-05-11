'use client';

import Layout from '@/components/layout/Layout';
import Page from '@/components/layout/Page';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import { 
  BarChart3, 
  CalendarDays, 
  Clock, 
  DollarSign, 
  FileText, 
  Inbox, 
  Users, 
  ArrowRight, 
  ArrowUpRight, 
  Plus, 
  ChevronRight 
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <Layout>
      <Page 
        title="Dashboard"
        subtitle="Welcome to your legal practice dashboard"
        actions={
          <Button 
            variant="primary" 
            iconLeft={<Plus className="h-4 w-4" />}
          >
            New Matter
          </Button>
        }
      >
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard 
            title="Active Matters" 
            value="24" 
            trend={+15}
            icon={<Inbox className="h-5 w-5 text-accent-indigo" />}
          />
          <StatsCard 
            title="Billable Hours" 
            value="187.5" 
            trend={-3}
            icon={<Clock className="h-5 w-5 text-accent-indigo" />}
          />
          <StatsCard 
            title="Revenue" 
            value="$24,750" 
            trend={+8}
            icon={<DollarSign className="h-5 w-5 text-accent-indigo" />}
          />
          <StatsCard 
            title="Active Clients" 
            value="38" 
            trend={+5}
            icon={<Users className="h-5 w-5 text-accent-indigo" />}
          />
        </div>

        {/* Main Content Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader 
                title="Recent Activity" 
                action={<Button variant="link" iconRight={<ArrowRight className="h-4 w-4" />}>View All</Button>} 
              />
              <CardContent>
                <div className="space-y-4">
                  <ActivityItem 
                    title="New document uploaded" 
                    description="Jane uploaded 'Smith Contract Rev 2'" 
                    time="10 minutes ago"
                    icon={<FileText className="h-5 w-5 text-blue-500" />}
                  />
                  <ActivityItem 
                    title="Matter status changed" 
                    description="Johnson v. ABC Corp changed to 'In Progress'" 
                    time="1 hour ago"
                    icon={<Inbox className="h-5 w-5 text-purple-500" />}
                  />
                  <ActivityItem 
                    title="Time entry added" 
                    description="You logged 2.5 hours for 'Case Research'" 
                    time="3 hours ago"
                    icon={<Clock className="h-5 w-5 text-amber-500" />}
                  />
                  <ActivityItem 
                    title="New client added" 
                    description="Michael Brown was added as a client" 
                    time="Yesterday"
                    icon={<Users className="h-5 w-5 text-green-500" />}
                  />
                  <ActivityItem 
                    title="Invoice generated" 
                    description="Invoice #1082 for Smith Corp was generated" 
                    time="Yesterday"
                    icon={<DollarSign className="h-5 w-5 text-red-500" />}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader 
                title="Performance" 
                subtitle="Billable hours and revenue trends" 
              />
              <CardContent>
                <div className="h-64 w-full flex items-center justify-center bg-gray-50 rounded-lg">
                  <BarChart3 className="h-8 w-8 text-text-secondary" />
                  <span className="ml-2 text-sm text-text-secondary">Chart Visualization</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader title="Upcoming Events" />
              <CardContent>
                <div className="space-y-3">
                  <EventItem 
                    title="Client Meeting" 
                    client="Smith Corp" 
                    time="Today, 2:00 PM"
                  />
                  <EventItem 
                    title="Court Hearing" 
                    client="Johnson v. ABC Corp" 
                    time="Tomorrow, 10:00 AM"
                  />
                  <EventItem 
                    title="Document Review" 
                    client="Williams Estate" 
                    time="Sep 24, 1:00 PM"
                  />
                </div>
                <Button 
                  variant="secondary" 
                  className="mt-4 w-full"
                  iconLeft={<CalendarDays className="h-4 w-4" />}
                  href="/calendar"
                >
                  View Calendar
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader title="Recent Clients" />
              <CardContent>
                <div className="space-y-3">
                  <ClientItem 
                    name="Michael Brown" 
                    type="Individual" 
                  />
                  <ClientItem 
                    name="XYZ Solutions" 
                    type="Corporate" 
                  />
                  <ClientItem 
                    name="Diana Martinez" 
                    type="Individual" 
                  />
                  <ClientItem 
                    name="Tech Innovations" 
                    type="Corporate" 
                  />
                </div>
                <Button 
                  variant="secondary" 
                  className="mt-4 w-full"
                  iconLeft={<Users className="h-4 w-4" />}
                  href="/clients"
                >
                  View All Clients
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader title="Tasks Due" />
              <CardContent>
                <div className="space-y-2">
                  <TaskItem title="Prepare contract for Smith Corp" due="Today" />
                  <TaskItem title="Review Johnson case documents" due="Tomorrow" />
                  <TaskItem title="Submit court filing for Williams" due="Sep 24" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Page>
    </Layout>
  );
}

// Helper components

function StatsCard({ title, value, trend, icon }: { title: string; value: string; trend: number; icon: React.ReactNode }) {
  return (
    <Card>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-text-secondary">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-text-primary">{value}</p>
        </div>
        <div className="bg-gray-50 p-2 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <span className={`flex items-center text-sm font-medium ${trend >= 0 ? 'text-accent-green' : 'text-red-500'}`}>
          {trend >= 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowUpRight className="h-3 w-3 mr-1 rotate-180" />}
          {Math.abs(trend)}%
        </span>
        <span className="text-xs text-text-secondary ml-1.5">vs last month</span>
      </div>
    </Card>
  );
}

function ActivityItem({ title, description, time, icon }: { title: string; description: string; time: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-start space-x-3 py-3">
      <div className="bg-gray-50 p-2 rounded-lg">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary">{title}</p>
        <p className="text-sm text-text-secondary mt-0.5">{description}</p>
      </div>
      <div className="text-xs text-text-secondary whitespace-nowrap">{time}</div>
    </div>
  );
}

function EventItem({ title, client, time }: { title: string; client: string; time: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary">{title}</p>
        <p className="text-xs text-text-secondary mt-0.5">{client}</p>
      </div>
      <div className="text-xs text-text-secondary whitespace-nowrap ml-4">{time}</div>
    </div>
  );
}

function ClientItem({ name, type }: { name: string; type: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center">
        <Avatar name={name} size="sm" />
        <div className="ml-3">
          <p className="text-sm font-medium text-text-primary">{name}</p>
          <p className="text-xs text-text-secondary">{type}</p>
        </div>
      </div>
      <ChevronRight className="h-4 w-4 text-text-secondary" />
    </div>
  );
}

function TaskItem({ title, due }: { title: string; due: string }) {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
      <div className="flex items-center">
        <div className="h-4 w-4 rounded border border-border mr-3"></div>
        <p className="text-sm text-text-primary">{title}</p>
      </div>
      <Badge variant="default" size="sm">{due}</Badge>
    </div>
  );
}
