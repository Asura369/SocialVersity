import React, { useState } from 'react';
import { Card, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { groups as initialGroups } from '../data/mockData';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useVersion } from '../context/VersionContext';
import { useToast } from '../context/ToastContext';
import { ConfirmationModal, Modal } from '../components/ui/Modal';

export function Groups() {
    const version = useVersion();
    const { addToast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [localGroups, setLocalGroups] = useState(initialGroups);

    // State for Leave Group Modal
    const [groupToLeave, setGroupToLeave] = useState(null);

    // V2: Filter State
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    const filteredGroups = localGroups.filter(group => {
        // Search term filter
        const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            group.category.toLowerCase().includes(searchTerm.toLowerCase());

        // Category filter (v2 only)
        const matchesCategory = version !== 'v2' || selectedCategories.length === 0 ||
            selectedCategories.includes(group.category);

        // Tag filter (v2 only) - for now using interests/tags from description
        const matchesTags = version !== 'v2' || selectedTags.length === 0 ||
            selectedTags.some(tag => group.description.toLowerCase().includes(tag.toLowerCase()));

        return matchesSearch && matchesCategory && matchesTags;
    });

    const handleJoinClick = (groupId) => {
        setLocalGroups(prev => prev.map(g => {
            if (g.id === groupId) {
                return { ...g, isMember: true, members: g.members + 1 };
            }
            return g;
        }));
        if (version === 'v2') {
            addToast('Joined group successfully!', 'success');
        }
    };

    const handleLeaveClick = (group) => {
        setGroupToLeave(group);
    };

    const confirmLeave = () => {
        setLocalGroups(prev => prev.map(g => {
            if (g.id === groupToLeave.id) {
                return { ...g, isMember: false, members: g.members - 1 };
            }
            return g;
        }));
        addToast(`Left ${groupToLeave.name} successfully`, 'success');
        setGroupToLeave(null);
    };

    const handleCategoryToggle = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const handleTagToggle = (tag) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const clearAllFilters = () => {
        setSelectedCategories([]);
        setSelectedTags([]);
    };

    const categories = ['Academic', 'Arts', 'Gaming', 'Sports', 'Technology', 'Social'];
    const tags = ['Study', 'Competition', 'Creative', 'Fitness', 'Networking'];

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
                <Button
                    variant="secondary"
                    className="flex items-center gap-2"
                    onClick={() => version === 'v2' ? setIsFilterOpen(true) : null}
                >
                    <FunnelIcon className="h-5 w-5" />
                    Filter
                    {version === 'v2' && (selectedCategories.length > 0 || selectedTags.length > 0) && (
                        <span className="ml-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {selectedCategories.length + selectedTags.length}
                        </span>
                    )}
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
                    <Card key={group.id} className="hover:shadow-md transition-shadow h-full flex flex-col">
                        <div className="h-24 bg-gradient-to-r from-primary-100 to-secondary-100 flex-shrink-0" />
                        <CardBody className="relative pt-0 flex-1 flex flex-col">
                            <div className="absolute -top-10 left-6">
                                <Avatar src={group.image} alt={group.name} size="xl" className="ring-4 ring-white" />
                            </div>
                            <div className="mt-12 flex-1 flex flex-col">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">{group.name}</h3>
                                        <p className="text-sm text-gray-500">{group.members.toLocaleString()} members</p>
                                    </div>
                                    <Badge variant="blue">{group.category}</Badge>
                                </div>
                                <p className="mt-3 text-sm text-gray-600 line-clamp-2 flex-grow">{group.description}</p>
                                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(i => (
                                            <Avatar key={i} size="sm" className="ring-2 ring-white" />
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        {/* V2: Persistent View Button */}
                                        {version === 'v2' && (
                                            <Button size="sm" variant="secondary">
                                                View
                                            </Button>
                                        )}

                                        {group.isMember ? (
                                            version === 'v2' ? (
                                                <Button
                                                    size="sm"
                                                    variant="danger"
                                                    className="bg-red-50 text-red-600 hover:bg-red-100"
                                                    onClick={() => handleLeaveClick(group)}
                                                >
                                                    Leave
                                                </Button>
                                            ) : (
                                                <Button size="sm" variant="secondary">View</Button>
                                            )
                                        ) : (
                                            <Button
                                                size="sm"
                                                variant="primary"
                                                onClick={() => handleJoinClick(group.id)}
                                            >
                                                Join
                                            </Button>
                                        )}
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

            {/* V2: Filter Modal */}
            {version === 'v2' && (
                <Modal
                    isOpen={isFilterOpen}
                    onClose={() => setIsFilterOpen(false)}
                    title="Filter Groups"
                >
                    <div className="space-y-6">
                        {/* Active Filters Display */}
                        {(selectedCategories.length > 0 || selectedTags.length > 0) && (
                            <div className="flex flex-wrap gap-2 pb-4 border-b border-gray-200">
                                {selectedCategories.map(cat => (
                                    <Badge key={cat} variant="blue" className="flex items-center gap-1">
                                        {cat}
                                        <button
                                            onClick={() => handleCategoryToggle(cat)}
                                            className="ml-1 hover:text-red-600"
                                        >
                                            ×
                                        </button>
                                    </Badge>
                                ))}
                                {selectedTags.map(tag => (
                                    <Badge key={tag} variant="green" className="flex items-center gap-1">
                                        {tag}
                                        <button
                                            onClick={() => handleTagToggle(tag)}
                                            className="ml-1 hover:text-red-600"
                                        >
                                            ×
                                        </button>
                                    </Badge>
                                ))}
                                <button
                                    onClick={clearAllFilters}
                                    className="text-xs text-red-600 hover:text-red-700 font-medium"
                                >
                                    Clear All
                                </button>
                            </div>
                        )}

                        {/* Categories */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">Categories</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => handleCategoryToggle(category)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategories.includes(category)
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tags */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">Interests & Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {tags.map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => handleTagToggle(tag)}
                                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedTags.includes(tag)
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-600">
                                {filteredGroups.length} group{filteredGroups.length !== 1 ? 's' : ''} found
                            </p>
                            <div className="flex gap-2">
                                <Button variant="secondary" onClick={clearAllFilters} size="sm">
                                    Reset
                                </Button>
                                <Button onClick={() => setIsFilterOpen(false)} size="sm">
                                    Apply Filters
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}
