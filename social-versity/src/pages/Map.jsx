import React, { useState } from 'react';
import { Card, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { mapLocations } from '../data/mockData';
import { MapPinIcon, ClockIcon, UserGroupIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { useVersion } from '../context/VersionContext';
import { Modal } from '../components/ui/Modal';

export function Map() {
    const version = useVersion();
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [isHelpOpen, setIsHelpOpen] = useState(false);

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-6">
            {/* Map Container */}
            <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                {/* Map Controls / Help (V2) */}
                {version === 'v2' && (
                    <div className="absolute top-4 right-4 z-10">
                        <button
                            onClick={() => setIsHelpOpen(true)}
                            className="bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-primary-600 transition-colors"
                            title="Map Help"
                        >
                            <QuestionMarkCircleIcon className="h-6 w-6" />
                        </button>
                    </div>
                )}

                <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
                    {/* Simplified SVG Map */}
                    <svg viewBox="0 0 800 600" className="w-full h-full">
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />

                        {/* Campus Buildings */}
                        {/* Student Center */}
                        <path
                            d="M 300 200 L 500 200 L 500 350 L 300 350 Z"
                            fill="#dbeafe"
                            stroke="#3b82f6"
                            strokeWidth="2"
                            className="cursor-pointer hover:fill-blue-200 transition-colors"
                            onClick={() => setSelectedLocation(mapLocations.find(l => l.id === 1))}
                        />

                        {/* Library */}
                        <path
                            d="M 100 100 L 250 100 L 250 250 L 100 250 Z"
                            fill="#dcfce7"
                            stroke="#22c55e"
                            strokeWidth="2"
                            className="cursor-pointer hover:fill-green-200 transition-colors"
                            onClick={() => setSelectedLocation(mapLocations.find(l => l.id === 2))}
                        />

                        {/* Gym */}
                        <path
                            d="M 550 100 L 700 100 L 700 200 L 550 200 Z"
                            fill="#fee2e2"
                            stroke="#ef4444"
                            strokeWidth="2"
                            className="cursor-pointer hover:fill-red-200 transition-colors"
                            onClick={() => setSelectedLocation(mapLocations.find(l => l.id === 3))}
                        />

                        {/* Pins */}
                        {mapLocations.map(loc => (
                            <g
                                key={loc.id}
                                transform={`translate(${loc.coordinates.x}, ${loc.coordinates.y})`}
                                className="cursor-pointer group"
                                onClick={() => setSelectedLocation(loc)}
                            >
                                <circle r="6" fill={loc.color === 'blue' ? '#3b82f6' : loc.color === 'green' ? '#22c55e' : '#ef4444'} className="animate-pulse" />
                                <circle r="12" fill={loc.color === 'blue' ? '#3b82f6' : loc.color === 'green' ? '#22c55e' : '#ef4444'} opacity="0.2" />
                                <text y="-15" x="0" textAnchor="middle" className="text-xs font-bold fill-gray-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-white">
                                    {loc.name}
                                </text>
                            </g>
                        ))}
                    </svg>
                </div>

                {/* V2: Help Modal */}
                <Modal
                    isOpen={isHelpOpen}
                    onClose={() => setIsHelpOpen(false)}
                    title="How to use the Map"
                >
                    <div className="space-y-4">
                        <p className="text-gray-600">Explore the campus map to find events, study spots, and facilities.</p>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-center gap-2">
                                <MapPinIcon className="h-5 w-5 text-primary-500" />
                                <span>Click on pins or buildings to view details.</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <UserGroupIcon className="h-5 w-5 text-secondary-500" />
                                <span>Check real-time crowd levels before you go.</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <ClockIcon className="h-5 w-5 text-gray-500" />
                                <span>View opening hours and upcoming events.</span>
                            </li>
                        </ul>
                        <div className="pt-2 flex justify-end">
                            <Button onClick={() => setIsHelpOpen(false)}>Got it</Button>
                        </div>
                    </div>
                </Modal>
            </div>

            {/* Sidebar / Details Panel */}
            <div className="w-full lg:w-80 flex-shrink-0">
                {selectedLocation ? (
                    <Card className="h-full animate-fadeIn">
                        <CardBody>
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-xl font-bold text-gray-900">{selectedLocation.name}</h2>
                                <button
                                    onClick={() => setSelectedLocation(null)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    ✕
                                </button>
                            </div>
                            <Badge variant="blue" className="mb-4">{selectedLocation.type}</Badge>
                            <p className="text-gray-600 mb-6">{selectedLocation.description}</p>

                            <div className="space-y-3">
                                <h3 className="font-semibold text-sm text-gray-900">Current Status</h3>
                                <div className="flex items-center gap-2 text-sm text-green-600">
                                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                                    Open Now (until 10 PM)
                                </div>

                                <h3 className="font-semibold text-sm text-gray-900 pt-2">Popular Times</h3>
                                <div className="h-24 flex items-end gap-1">
                                    {[40, 60, 80, 100, 70, 50, 30].map((h, i) => (
                                        <div key={i} className="flex-1 bg-primary-100 rounded-t" style={{ height: `${h}%` }} />
                                    ))}
                                </div>
                                <div className="flex justify-between text-xs text-gray-400">
                                    <span>8am</span>
                                    <span>12pm</span>
                                    <span>4pm</span>
                                    <span>8pm</span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                ) : (
                    <Card className="h-full flex items-center justify-center text-center p-6">
                        <div>
                            <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-500">
                                <MapPinIcon className="h-8 w-8" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Interactive Campus Map</h3>
                            <p className="text-gray-500 mt-2">Select a location pin to view details, hours, and crowd levels.</p>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
}
