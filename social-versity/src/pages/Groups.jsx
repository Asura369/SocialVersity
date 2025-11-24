import React, { useState } from 'react';
import { Card, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { groups } from '../data/mockData';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useVersion } from '../context/VersionContext';
import { useToast } from '../context/ToastContext';
import { ConfirmationModal } from '../components/ui/Modal';

export function Groups() {
    const version = useVersion();
    const { addToast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    // State for Leave Group Modal
    const [groupToLeave, setGroupToLeave] = useState(null);

    const filteredGroups = groups.filter(group =>
        group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleLeaveClick = (group) => {
        setGroupToLeave(group);
    };

    const confirmLeave = () => {
        addToast(`Left ${groupToLeave.name} successfully`, 'success');
        setGroupToLeave(null);
        // In a real app, we would update the state/backend here
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Groups</h1>
                    <p className="text-gray-600 mt-1">Discover communities and find your people.</p>
                </div>
                <Button>+ Create Group</Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        placeholder="Search groups..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button variant="secondary" className="flex items-center gap-2">
                    <FunnelIcon className="h-5 w-5" />
                    Filter
                </Button>
            </div>

            <div className="flex border-b border-gray-200">
                <button
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'all' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    onClick={() => setActiveTab('all')}
                >
                    All Groups
                </button>
                <button
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'my' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    onClick={() => setActiveTab('my')}
                >
                    My Groups
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGroups.map(group => (
                    <Card key={group.id} className="hover:shadow-md transition-shadow">
                        <div className="h-24 bg-gradient-to-r from-primary-100 to-secondary-100" />
                        <CardBody className="relative pt-0">
                            <div className="absolute -top-10 left-6">
                                <Avatar src={group.image} alt={group.name} size="xl" className="ring-4 ring-white" />
                            </div>
                            <div className="mt-8">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">{group.name}</h3>
                                        <p className="text-sm text-gray-500">{group.members} members</p>
                                    </div>
                                    <Badge variant="blue">{group.category}</Badge>
                                </div>
                                <p className="mt-3 text-sm text-gray-600 line-clamp-2">{group.description}</p>
                                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(i => (
                                            <Avatar key={i} size="sm" className="ring-2 ring-white" />
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        {version === 'v2' && group.isMember && (
                                            <Button
                                                size="sm"
                                                variant="danger" // Assuming danger variant exists or falls back
                                                className="bg-red-50 text-red-600 hover:bg-red-100"
                                                onClick={() => handleLeaveClick(group)}
                                            >
                                                Leave
                                            </Button>
                                        )}
                                        <Button
                                            size="sm"
                                            variant={group.isMember ? 'secondary' : 'primary'}
                                        >
                                            {group.isMember ? 'View' : 'Join'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>

            {/* Confirmation Modal for V2 */}
            <ConfirmationModal
                isOpen={!!groupToLeave}
                onClose={() => setGroupToLeave(null)}
                onConfirm={confirmLeave}
                title="Leave Group?"
                message={`Are you sure you want to leave ${groupToLeave?.name}? You won't receive updates from this group anymore.`}
                confirmText="Leave Group"
            />
        </div>
    );
}
