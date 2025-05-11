'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Page from '@/components/layout/Page';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Users, 
  MapPin, 
  Plus, 
  List, 
  Grid3X3
} from 'lucide-react';

// Mock calendar events
const events = [
  {
    id: 'E1001',
    title: 'Client Meeting - Johnson Family',
    date: '2023-10-10',
    startTime: '09:00 AM',
    endTime: '10:30 AM',
    type: 'meeting',
    location: 'Conference Room A',
    attendees: ['Jane Smith', 'Robert Johnson'],
    description: 'Review property purchase documents'
  },
  {
    id: 'E1002',
    title: 'Court Hearing - Smith v. Jones',
    date: '2023-10-10',
    startTime: '01:00 PM',
    endTime: '03:00 PM',
    type: 'court',
    location: 'County Courthouse, Room 305',
    attendees: ['Jane Smith', 'Client Representative'],
    description: 'Initial hearing'
  },
  {
    id: 'E1003',
    title: 'Document Deadline - Davidson Case',
    date: '2023-10-11',
    startTime: '11:59 PM',
    endTime: '11:59 PM',
    type: 'deadline',
    description: 'File motion for extension'
  },
  {
    id: 'E1004',
    title: 'Team Strategy Meeting',
    date: '2023-10-12',
    startTime: '02:00 PM',
    endTime: '03:30 PM',
    type: 'internal',
    location: 'Conference Room B',
    attendees: ['Jane Smith', 'Michael Chen', 'Sarah Johnson', 'Legal Team'],
    description: 'Quarterly strategy alignment'
  },
  {
    id: 'E1005',
    title: 'Client Call - Smith Corporation',
    date: '2023-10-13',
    startTime: '10:00 AM',
    endTime: '10:30 AM',
    type: 'call',
    attendees: ['Michael Chen', 'Smith Corp CEO'],
    description: 'Discuss case progress'
  },
  {
    id: 'E1006',
    title: 'Deposition - Johnson v. ABC Corp',
    date: '2023-10-14',
    startTime: '09:00 AM',
    endTime: '12:00 PM',
    type: 'deposition',
    location: 'Law Office, Room 2B',
    attendees: ['Jane Smith', 'Court Reporter', 'Witness', 'Opposing Counsel'],
    description: 'Witness deposition'
  }
];

// Mock calendar days
const days = Array.from({ length: 31 }, (_, i) => ({
  day: i + 1,
  date: `2023-10-${String(i + 1).padStart(2, '0')}`,
  hasEvents: [10, 11, 12, 13, 14].includes(i + 1)
}));

// Event type to color mapping
const eventTypeColors = {
  meeting: 'bg-blue-100 text-blue-800',
  court: 'bg-red-100 text-red-800',
  deadline: 'bg-orange-100 text-orange-800',
  internal: 'bg-purple-100 text-purple-800',
  call: 'bg-green-100 text-green-800',
  deposition: 'bg-indigo-100 text-indigo-800'
};

export default function CalendarPage() {
  const [view, setView] = useState<'month' | 'week' | 'day'>('week');
  const [currentMonth] = useState('October 2023');
  const [selectedDate, setSelectedDate] = useState('2023-10-10');
  
  // Filter events for the selected date
  const filteredEvents = events.filter(event => event.date === selectedDate);
  
  return (
    <Layout>
      <Page
        title="Calendar"
        subtitle="Manage your appointments, court dates, and deadlines"
        actions={
          <div className="flex gap-2">
            <Button
              variant="primary"
              iconLeft={<Plus className="h-4 w-4" />}
            >
              New Event
            </Button>
          </div>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left sidebar - Mini calendar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader 
                title="Calendar" 
                actions={
                  <div className="flex gap-2">
                    <Button variant="ghost" className="p-1">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" className="p-1">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                }
              />
              <CardContent>
                <h3 className="text-center font-medium mb-4">{currentMonth}</h3>
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                    <div key={index} className="text-xs text-text-secondary font-medium">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {/* Padding for days that don't belong to current month */}
                  {[...Array(6)].map((_, index) => (
                    <div key={`empty-${index}`} className="h-8"></div>
                  ))}
                  
                  {days.map((day) => (
                    <div 
                      key={day.day} 
                      className={`
                        h-8 flex items-center justify-center rounded-full text-sm cursor-pointer
                        ${day.date === selectedDate ? 'bg-accent-indigo text-white' : 'hover:bg-gray-100'}
                        ${day.hasEvents && day.date !== selectedDate ? 'font-medium' : ''}
                      `}
                      onClick={() => setSelectedDate(day.date)}
                    >
                      {day.day}
                      {day.hasEvents && day.date !== selectedDate && (
                        <div className="absolute w-1 h-1 bg-accent-indigo rounded-full -bottom-1"></div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader title="Event Categories" />
              <CardContent className="space-y-2">
                {Object.entries(eventTypeColors).map(([type, colorClass]) => (
                  <div key={type} className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${colorClass.split(' ')[0]} mr-2`}></div>
                    <span className="text-sm capitalize">{type}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader title="Upcoming Deadlines" />
              <CardContent className="space-y-3">
                <div className="p-3 border border-orange-200 bg-orange-50 rounded-lg">
                  <div className="flex items-center">
                    <Badge variant="warning" className="mr-2">Deadline</Badge>
                    <p className="text-sm font-medium">Document Deadline - Davidson Case</p>
                  </div>
                  <p className="text-xs text-text-secondary mt-1">October 11, 2023 • 11:59 PM</p>
                </div>
                <div className="p-3 border border-orange-200 bg-orange-50 rounded-lg">
                  <div className="flex items-center">
                    <Badge variant="warning" className="mr-2">Deadline</Badge>
                    <p className="text-sm font-medium">Motion Filing - ABC Corp Case</p>
                  </div>
                  <p className="text-xs text-text-secondary mt-1">October 20, 2023 • 11:59 PM</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content - Calendar view */}
          <div className="lg:col-span-3">
            <Card className="p-0 overflow-hidden">
              {/* Calendar navigation */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" className="p-1">
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <h2 className="text-lg font-medium">
                    {selectedDate === '2023-10-10' ? 'Tuesday, October 10, 2023' : 'Selected Date'}
                  </h2>
                  <Button variant="ghost" className="p-1">
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex items-center border border-gray-200 rounded-md">
                  <button 
                    className={`p-1.5 text-xs ${view === 'month' ? 'bg-gray-100' : ''}`}
                    onClick={() => setView('month')}
                  >
                    Month
                  </button>
                  <button 
                    className={`p-1.5 text-xs ${view === 'week' ? 'bg-gray-100' : ''}`}
                    onClick={() => setView('week')}
                  >
                    Week
                  </button>
                  <button 
                    className={`p-1.5 text-xs ${view === 'day' ? 'bg-gray-100' : ''}`}
                    onClick={() => setView('day')}
                  >
                    Day
                  </button>
                </div>
              </div>

              {/* Weekly view */}
              {view === 'week' && (
                <div className="p-4">
                  <div className="grid grid-cols-7 gap-2 mb-2">
                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
                      <div key={index} className="text-center">
                        <p className="text-sm font-medium">{day}</p>
                        <p className="text-xs text-text-secondary">{index + 8} Oct</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-2 h-[500px] border border-gray-200 rounded-lg">
                    {[...Array(7)].map((_, index) => (
                      <div 
                        key={index} 
                        className={`border-r border-gray-200 last:border-r-0 relative p-1 ${index === 2 ? 'bg-gray-50' : ''}`}
                      >
                        {index === 2 && (
                          <>
                            <div 
                              className="absolute top-[60px] left-0 right-0 mx-1 p-1 rounded text-xs bg-blue-100 text-blue-800 border-l-2 border-blue-500"
                              style={{ height: '40px' }}
                            >
                              9:00 - 10:30 AM<br />
                              Client Meeting
                            </div>
                            <div 
                              className="absolute top-[160px] left-0 right-0 mx-1 p-1 rounded text-xs bg-red-100 text-red-800 border-l-2 border-red-500"
                              style={{ height: '60px' }}
                            >
                              1:00 - 3:00 PM<br />
                              Court Hearing
                            </div>
                          </>
                        )}
                        {index === 3 && (
                          <div 
                            className="absolute top-[120px] left-0 right-0 mx-1 p-1 rounded text-xs bg-orange-100 text-orange-800 border-l-2 border-orange-500"
                            style={{ height: '30px' }}
                          >
                            11:59 PM<br />
                            Document Deadline
                          </div>
                        )}
                        {index === 4 && (
                          <div 
                            className="absolute top-[180px] left-0 right-0 mx-1 p-1 rounded text-xs bg-purple-100 text-purple-800 border-l-2 border-purple-500"
                            style={{ height: '45px' }}
                          >
                            2:00 - 3:30 PM<br />
                            Team Meeting
                          </div>
                        )}
                        {index === 5 && (
                          <div 
                            className="absolute top-[100px] left-0 right-0 mx-1 p-1 rounded text-xs bg-green-100 text-green-800 border-l-2 border-green-500"
                            style={{ height: '30px' }}
                          >
                            10:00 AM<br />
                            Client Call
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Daily view - only show when day view is selected or when events are shown for selected date */}
              {(view === 'day' || (view === 'week' && selectedDate === '2023-10-10')) && (
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-4">Schedule for {selectedDate === '2023-10-10' ? 'October 10, 2023' : 'Selected Date'}</h3>
                  <div className="space-y-4">
                    {filteredEvents.map(event => (
                      <div key={event.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-card-hover transition-shadow">
                        <div className="flex justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge 
                                className={eventTypeColors[event.type as keyof typeof eventTypeColors].split(' ')[1]} 
                                variant="default"
                              >
                                {event.type}
                              </Badge>
                              <h4 className="font-medium">{event.title}</h4>
                            </div>
                            <div className="flex items-center mt-2 text-sm text-text-secondary">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>
                                {event.startTime} - {event.endTime}
                              </span>
                            </div>
                            {event.location && (
                              <div className="flex items-center mt-1 text-sm text-text-secondary">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{event.location}</span>
                              </div>
                            )}
                            {event.attendees && (
                              <div className="flex items-center mt-1 text-sm text-text-secondary">
                                <Users className="h-4 w-4 mr-1" />
                                <span>{event.attendees.join(', ')}</span>
                              </div>
                            )}
                            {event.description && (
                              <p className="mt-2 text-sm">{event.description}</p>
                            )}
                          </div>
                          <div className="flex-shrink-0">
                            <Button variant="outline" size="sm">Details</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Month view - simplified for demo */}
              {view === 'month' && (
                <div className="p-4">
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                      <div key={index} className="text-center py-2 text-sm font-medium">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1 border border-gray-200 rounded-lg">
                    {/* Padding for days that don't belong to current month */}
                    {[...Array(6)].map((_, index) => (
                      <div key={`empty-${index}`} className="h-24 p-1 bg-gray-50 border-b border-r border-gray-200"></div>
                    ))}
                    
                    {days.map((day) => (
                      <div 
                        key={day.day} 
                        className={`
                          h-24 p-1 text-sm border-b border-r border-gray-200 overflow-hidden
                          ${day.date === selectedDate ? 'bg-accent-indigo-50' : ''}
                          hover:bg-gray-50 cursor-pointer
                        `}
                        onClick={() => setSelectedDate(day.date)}
                      >
                        <div className="flex justify-between">
                          <span className={day.date === selectedDate ? 'font-bold' : ''}>{day.day}</span>
                        </div>
                        {day.hasEvents && (
                          <div className="mt-1 space-y-1">
                            {events
                              .filter(event => event.date === day.date)
                              .map(event => (
                                <div 
                                  key={event.id} 
                                  className={`
                                    text-xs truncate px-1 py-0.5 rounded
                                    ${eventTypeColors[event.type as keyof typeof eventTypeColors]}
                                  `}
                                >
                                  {event.startTime} {event.title}
                                </div>
                              ))
                            }
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </Page>
    </Layout>
  );
} 