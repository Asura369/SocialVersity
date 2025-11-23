import React, { useState } from 'react';
import { Card, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { MapPinIcon, BuildingLibraryIcon, AcademicCapIcon } from '@heroicons/react/24/solid';

const locations = [
    { id: 1, name: 'Student Center', type: 'Social', x: 50, y: 40, description: 'Main hub for student activities, dining, and lounges.' },
    { id: 2, name: 'Engineering Hall', type: 'Academic', x: 70, y: 60, description: 'Labs, classrooms, and the robotics workshop.' },
    { id: 3, name: 'Main Library', type: 'Study', x: 30, y: 50, description: '24/7 study areas and quiet zones.' },
    { id: 4, name: 'Gymnasium', type: 'Sports', x: 80, y: 30, description: 'Fitness center, basketball courts, and pool.' },
];

export function Map() {
    const [selectedLocation, setSelectedLocation] = useState(null);

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-6">
            {/* Map Container */}
            <div className="flex-1 bg-blue-50 rounded-xl border border-blue-100 relative overflow-hidden shadow-inner group">
                {/* Static SVG Map Background */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* Mock Campus Shapes */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M20,40 Q40,10 60,40 T90,40" fill="none" stroke="#93c5fd" strokeWidth="2" />
                    <path d="M10,60 Q50,90 90,60" fill="none" stroke="#93c5fd" strokeWidth="2" />
                    <rect x="25" y="45" width="10" height="10" fill="#dbeafe" rx="2" />
                    <rect x="65" y="55" width="12" height="8" fill="#dbeafe" rx="2" />
                    <circle cx="50" cy="40" r="5" fill="#dbeafe" />
                </svg>

                {/* Interactive Pins */}
                {locations.map(loc => (
                    <button
                        key={loc.id}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110 ${selectedLocation?.id === loc.id ? 'scale-125 z-10' : 'z-0'
                            }`}
                        style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                        onClick={() => setSelectedLocation(loc)}
                    >
                        <div className={`p-2 rounded-full shadow-lg ${selectedLocation?.id === loc.id ? 'bg-primary-600 text-white' : 'bg-white text-primary-600'
                            }`}>
                            <MapPinIcon className="h-6 w-6" />
                        </div>
                        {selectedLocation?.id === loc.id && (
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white px-3 py-1 rounded-full shadow-md text-xs font-bold whitespace-nowrap">
                                {loc.name}
                            </div>
                        )}
                    </button>
                ))}
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
