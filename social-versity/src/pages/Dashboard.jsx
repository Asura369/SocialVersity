import React from 'react';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { currentUser, events, groups } from '../data/mockData';
import { CalendarIcon, UserGroupIcon, MapPinIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export function Dashboard() {
    const upcomingEvents = events.slice(0, 2);
    const recommendedGroups = groups.filter(g => !g.isMember).slice(0, 2);

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Welcome back, {currentUser.name.split(' ')[0]}! 👋
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Here's what's happening on campus today.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary">Find Peers</Button>
                    <Button>Explore Events</Button>
                </div>
            </div>

            {/* Stats / Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-primary-500 to-primary-600 text-white border-none">
                    <CardBody className="flex items-center justify-between">
                        <div>
                            <p className="text-primary-100 text-sm font-medium">Upcoming Events</p>
                            <p className="text-3xl font-bold mt-1">3</p>
                        </div>
                        <div className="p-3 bg-white/10 rounded-lg">
                            <CalendarIcon className="h-6 w-6 text-white" />
                        </div>
                    </CardBody>
                </Card>
                <Card className="bg-gradient-to-br from-secondary-500 to-secondary-600 text-white border-none">
                    <CardBody className="flex items-center justify-between">
                        <div>
                            <p className="text-secondary-100 text-sm font-medium">My Groups</p>
                            <p className="text-3xl font-bold mt-1">12</p>
                        </div>
                        <div className="p-3 bg-white/10 rounded-lg">
                            <UserGroupIcon className="h-6 w-6 text-white" />
                        </div>
                    </CardBody>
                </Card>
                <Card className="bg-white border-gray-200">
                    <CardBody className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Unread Messages</p>
                            <p className="text-3xl font-bold mt-1 text-gray-900">5</p>
                        </div>
                        <div className="p-3 bg-gray-100 rounded-lg">
                            <div className="h-6 w-6 text-gray-600">💬</div>
                        </div>
                    </CardBody>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Feed / Events */}
                <div className="lg:col-span-2 space-y-6">
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
                            <Button variant="ghost" size="sm" className="text-primary-600">View All</Button>
                        </div>
                        <div className="space-y-4">
                            {upcomingEvents.map(event => (
                                <Card key={event.id} className="hover:shadow-md transition-shadow cursor-pointer">
                                    <CardBody className="flex gap-4">
                                        <div className="flex-shrink-0 w-16 h-16 bg-primary-50 rounded-lg flex flex-col items-center justify-center text-primary-700 border border-primary-100">
                                            <span className="text-xs font-bold uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                                            <span className="text-xl font-bold">{new Date(event.date).getDate()}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="text-base font-semibold text-gray-900 truncate">{event.title}</h3>
                                                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                                                        <MapPinIcon className="h-4 w-4" />
                                                        {event.location}
                                                    </p>
                                                </div>
                                                <Badge variant="blue">{event.category}</Badge>
                                            </div>
                                            <div className="mt-3 flex items-center justify-between">
                                                <div className="flex -space-x-2 overflow-hidden">
                                                    {[...Array(3)].map((_, i) => (
                                                        <Avatar key={i} size="sm" className="ring-2 ring-white" />
                                                    ))}
                                                    <span className="flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-white bg-gray-100 text-xs font-medium text-gray-500">
                                                        +{event.attendees}
                                                    </span>
                                                </div>
                                                <Button size="sm" variant="secondary">RSVP</Button>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar Widgets */}
                <div className="space-y-6">
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Suggested Groups</h2>
                        </div>
                        <Card>
                            <div className="divide-y divide-gray-100">
                                {recommendedGroups.map(group => (
                                    <div key={group.id} className="p-4 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <Avatar src={group.image} alt={group.name} />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">{group.name}</p>
                                                <p className="text-xs text-gray-500 truncate">{group.members} members • {group.category}</p>
                                            </div>
                                            <Button size="sm" variant="ghost" className="text-primary-600 p-1">
                                                <span className="sr-only">Join</span>
                                                <span className="text-xl">+</span>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                <div className="p-3 text-center">
                                    <Button variant="ghost" size="sm" fullWidth>Discover More</Button>
                                </div>
                            </div>
                        </Card>
                    </section>

                    <section>
                        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden relative">
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                            <CardBody>
                                <h3 className="font-semibold text-lg mb-2">Campus Map</h3>
                                <p className="text-gray-300 text-sm mb-4">Find your way around campus, locate events, and find quiet study spots.</p>
                                <Button variant="secondary" fullWidth className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                                    Open Map
                                </Button>
                            </CardBody>
                        </Card>
                    </section>
                </div>
            </div>
        </div>
    );
}
