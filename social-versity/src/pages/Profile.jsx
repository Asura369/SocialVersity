import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { currentUser } from '../data/mockData';
import {
    UserIcon,
    ShieldCheckIcon,
    EyeIcon,
    BellIcon,
    SwatchIcon,
    ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

export function Profile() {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Profile Header */}
            <Card className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white border-none">
                <CardBody className="flex flex-col sm:flex-row items-center gap-6">
                    <Avatar src={currentUser.avatar} alt={currentUser.name} size="xl" className="ring-4 ring-white/30" />
                    <div className="text-center sm:text-left flex-1">
                        <h1 className="text-2xl font-bold flex items-center justify-center sm:justify-start gap-2">
                            {currentUser.name}
                            {currentUser.verified && (
                                <ShieldCheckIcon className="h-6 w-6 text-blue-200" title="Verified Student" />
                            )}
                        </h1>
                        <p className="text-blue-100">{currentUser.major} • Class of {currentUser.year}</p>
                        <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
                            {currentUser.interests.map(interest => (
                                <Badge key={interest} variant="blue" className="bg-white/20 text-white border-none">
                                    {interest}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <Button variant="secondary" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                        Edit Profile
                    </Button>
                </CardBody>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Settings Navigation */}
                <Card className="h-fit">
                    <nav className="p-2 space-y-1">
                        {[
                            { id: 'profile', label: 'Profile Settings', icon: UserIcon },
                            { id: 'privacy', label: 'Privacy & Safety', icon: ShieldCheckIcon },
                            { id: 'accessibility', label: 'Accessibility', icon: SwatchIcon },
                            { id: 'notifications', label: 'Notifications', icon: BellIcon },
                        ].map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === item.id
                                        ? 'bg-primary-50 text-primary-700'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.label}
                            </button>
                        ))}
                        <div className="pt-2 mt-2 border-t border-gray-100">
                            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                                Sign Out
                            </button>
                        </div>
                    </nav>
                </Card>

                {/* Settings Content */}
                <div className="md:col-span-3 space-y-6">
                    {activeTab === 'profile' && (
                        <Card>
                            <CardHeader>
                                <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
                            </CardHeader>
                            <CardBody className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Input label="Full Name" defaultValue={currentUser.name} />
                                    <Input label="Email" defaultValue={currentUser.email} disabled />
                                    <Input label="Major" defaultValue={currentUser.major} />
                                    <Input label="Graduation Year" defaultValue={currentUser.year} />
                                </div>
                                <div className="pt-4">
                                    <Button>Save Changes</Button>
                                </div>
                            </CardBody>
                        </Card>
                    )}

                    {activeTab === 'privacy' && (
                        <Card>
                            <CardHeader>
                                <h2 className="text-lg font-bold text-gray-900">Privacy & Safety</h2>
                            </CardHeader>
                            <CardBody className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium text-gray-900">Profile Visibility</h3>
                                        <p className="text-sm text-gray-500">Control who can see your profile details.</p>
                                    </div>
                                    <select className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border">
                                        <option>Everyone</option>
                                        <option>Students Only</option>
                                        <option>Friends Only</option>
                                    </select>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium text-gray-900">Read Receipts</h3>
                                        <p className="text-sm text-gray-500">Let others know when you've seen their messages.</p>
                                    </div>
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                        <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                                        <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-gray-100">
                                    <Button variant="danger" size="sm">Block List</Button>
                                </div>
                            </CardBody>
                        </Card>
                    )}

                    {activeTab === 'accessibility' && (
                        <Card>
                            <CardHeader>
                                <h2 className="text-lg font-bold text-gray-900">Accessibility & Appearance</h2>
                            </CardHeader>
                            <CardBody className="space-y-6">
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-3">Text Size</h3>
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs">A</span>
                                        <input type="range" min="0" max="100" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                                        <span className="text-xl">A</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium text-gray-900">Dark Mode</h3>
                                        <p className="text-sm text-gray-500">Switch between light and dark themes.</p>
                                    </div>
                                    <Button variant="secondary" size="sm">System Default</Button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium text-gray-900">Reduce Motion</h3>
                                        <p className="text-sm text-gray-500">Minimize animations throughout the app.</p>
                                    </div>
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                        <input type="checkbox" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                                        <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
