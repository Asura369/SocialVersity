import React, { useState } from 'react';
import { Card, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { events } from '../data/mockData';
import { CalendarIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';

export function Events() {
    const [view, setView] = useState('list'); // 'list' or 'calendar'

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Events</h1>
                    <p className="text-gray-600 mt-1">What's happening on campus.</p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant={view === 'list' ? 'primary' : 'secondary'}
                        onClick={() => setView('list')}
                        size="sm"
                    >
                        List View
                    </Button>
                    <Button
                        variant={view === 'calendar' ? 'primary' : 'secondary'}
                        onClick={() => setView('calendar')}
                        size="sm"
                    >
                        Calendar
                    </Button>
                </div>
            </div>

            {view === 'list' ? (
                <div className="space-y-4">
                    {events.map(event => (
                        <Card key={event.id} className="hover:shadow-md transition-shadow cursor-pointer">
                            <CardBody className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-shrink-0 w-full sm:w-48 h-32 bg-primary-50 rounded-lg flex flex-col items-center justify-center text-primary-700 border border-primary-100">
                                    <span className="text-sm font-bold uppercase tracking-wider">{new Date(event.date).toLocaleString('default', { month: 'long' })}</span>
                                    <span className="text-4xl font-bold">{new Date(event.date).getDate()}</span>
                                    <span className="text-sm">{new Date(event.date).toLocaleString('default', { weekday: 'short' })}</span>
                                </div>
                                <div className="flex-1 min-w-0 py-2">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                                            <p className="text-sm text-primary-600 font-medium mt-1">{event.organizer}</p>
                                        </div>
                                        <Badge variant="blue">{event.category}</Badge>
                                    </div>

                                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-500">
                                        <div className="flex items-center gap-2">
                                            <ClockIcon className="h-5 w-5 text-gray-400" />
                                            {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPinIcon className="h-5 w-5 text-gray-400" />
                                            {event.location}
                                        </div>
                                    </div>

                                    <div className="mt-6 flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <div className="flex -space-x-2 overflow-hidden">
                                                {[1, 2, 3].map((_, i) => (
                                                    <Avatar key={i} size="sm" className="ring-2 ring-white" />
                                                ))}
                                            </div>
                                            <span>{event.attendees} attending</span>
                                        </div>
                                        <Button>RSVP Now</Button>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="h-96 flex items-center justify-center bg-gray-50 border-dashed">
                    <div className="text-center text-gray-500">
                        <CalendarIcon className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                        <p>Calendar view coming soon!</p>
                    </div>
                </Card>
            )}
        </div>
    );
}
