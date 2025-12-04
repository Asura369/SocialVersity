import React, { useState } from 'react';
import { Card, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { ChatBubbleLeftIcon, HandThumbUpIcon, EyeSlashIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useToast } from '../context/ToastContext';

// Mock forum posts
const initialPosts = [
    {
        id: 1,
        title: 'Best study spots on campus?',
        content: 'Looking for quiet places to study between classes. Library is always packed!',
        author: 'Anonymous',
        isAnonymous: true,
        timestamp: '2 hours ago',
        category: 'Campus Life',
        replies: 12,
        likes: 24,
        liked: false,
    },
    {
        id: 2,
        title: 'Anyone taking CS 301 next semester?',
        content: 'Wondering if anyone has tips for this class or wants to form a study group.',
        author: 'Alex Chen',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        isAnonymous: false,
        timestamp: '5 hours ago',
        category: 'Academics',
        replies: 8,
        likes: 15,
        liked: false,
    },
    {
        id: 3,
        title: 'Lost and Found: Blue backpack',
        content: 'Found a blue backpack near the Student Center. Has a laptop inside. Contact me if it\'s yours!',
        author: 'Sarah Johnson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        isAnonymous: false,
        timestamp: '1 day ago',
        category: 'General',
        replies: 3,
        likes: 45,
        liked: false,
    },
    {
        id: 4,
        title: 'Mental health resources?',
        content: 'Feeling overwhelmed with finals coming up. Does anyone know what mental health resources are available on campus?',
        author: 'Anonymous',
        isAnonymous: true,
        timestamp: '1 day ago',
        category: 'Wellness',
        replies: 18,
        likes: 67,
        liked: false,
    },
    {
        id: 5,
        title: 'Roommate needed for Spring semester',
        content: 'Looking for a roommate for a 2-bedroom apartment near campus. $600/month. DM if interested!',
        author: 'Marcus Williams',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
        isAnonymous: false,
        timestamp: '2 days ago',
        category: 'Housing',
        replies: 5,
        likes: 12,
        liked: false,
    },
];

const categories = ['All', 'Academics', 'Campus Life', 'General', 'Housing', 'Wellness', 'Events'];

export function Forum() {
    const { addToast } = useToast();
    const [posts, setPosts] = useState(initialPosts);
    const [activeCategory, setActiveCategory] = useState('All');
    const [isNewPostOpen, setIsNewPostOpen] = useState(false);
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const [newPostCategory, setNewPostCategory] = useState('General');
    const [newPostAnonymous, setNewPostAnonymous] = useState(false);

    const handleLike = (postId) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    liked: !post.liked,
                    likes: post.liked ? post.likes - 1 : post.likes + 1,
                };
            }
            return post;
        }));
    };

    const handleCreatePost = () => {
        if (!newPostTitle.trim() || !newPostContent.trim()) {
            addToast('Please fill in all fields', 'error');
            return;
        }

        const newPost = {
            id: Date.now(),
            title: newPostTitle,
            content: newPostContent,
            author: newPostAnonymous ? 'Anonymous' : 'Current User',
            avatar: newPostAnonymous ? null : 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser',
            isAnonymous: newPostAnonymous,
            timestamp: 'Just now',
            category: newPostCategory,
            replies: 0,
            likes: 0,
            liked: false,
        };

        setPosts([newPost, ...posts]);
        addToast('Post created successfully!', 'success');
        setIsNewPostOpen(false);
        setNewPostTitle('');
        setNewPostContent('');
        setNewPostCategory('General');
        setNewPostAnonymous(false);
    };

    const filteredPosts = activeCategory === 'All'
        ? posts
        : posts.filter(post => post.category === activeCategory);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Forum</h1>
                    <p className="text-gray-600 mt-1">Join campus-wide discussions and ask questions.</p>
                </div>
                <Button onClick={() => setIsNewPostOpen(true)} className="flex items-center gap-2">
                    <PlusIcon className="h-5 w-5" />
                    New Post
                </Button>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeCategory === category
                                ? 'bg-primary-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Posts List */}
            <div className="space-y-4">
                {filteredPosts.map(post => (
                    <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardBody>
                            <div className="flex items-start gap-4">
                                {/* Avatar or Anonymous Icon */}
                                {post.isAnonymous ? (
                                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                        <EyeSlashIcon className="h-6 w-6 text-gray-500" />
                                    </div>
                                ) : (
                                    <Avatar src={post.avatar} alt={post.author} size="md" />
                                )}

                                {/* Post Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="font-semibold text-gray-900">
                                            {post.isAnonymous ? 'Anonymous' : post.author}
                                        </p>
                                        <span className="text-gray-400">•</span>
                                        <p className="text-sm text-gray-500">{post.timestamp}</p>
                                        <Badge variant="blue" className="text-xs">{post.category}</Badge>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4">{post.content}</p>

                                    {/* Actions */}
                                    <div className="flex items-center gap-6 text-sm text-gray-500">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleLike(post.id);
                                            }}
                                            className={`flex items-center gap-1 hover:text-primary-600 transition-colors ${post.liked ? 'text-primary-600 font-semibold' : ''
                                                }`}
                                        >
                                            <HandThumbUpIcon className="h-5 w-5" />
                                            <span>{post.likes}</span>
                                        </button>
                                        <button className="flex items-center gap-1 hover:text-primary-600 transition-colors">
                                            <ChatBubbleLeftIcon className="h-5 w-5" />
                                            <span>{post.replies} replies</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>

            {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No posts found in this category.</p>
                </div>
            )}

            {/* New Post Modal */}
            <Modal
                isOpen={isNewPostOpen}
                onClose={() => setIsNewPostOpen(false)}
                title="Create New Post"
            >
                <div className="space-y-4">
                    {/* Anonymous Toggle */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                            <EyeSlashIcon className="h-5 w-5 text-gray-600" />
                            <span className="text-sm font-medium text-gray-900">Post Anonymously</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={newPostAnonymous}
                                onChange={(e) => setNewPostAnonymous(e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select
                            value={newPostCategory}
                            onChange={(e) => setNewPostCategory(e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
                        >
                            {categories.filter(c => c !== 'All').map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                            type="text"
                            value={newPostTitle}
                            onChange={(e) => setNewPostTitle(e.target.value)}
                            placeholder="Enter post title..."
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                        <textarea
                            value={newPostContent}
                            onChange={(e) => setNewPostContent(e.target.value)}
                            placeholder="What's on your mind?"
                            rows={4}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
                        <Button variant="secondary" onClick={() => setIsNewPostOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleCreatePost}>
                            Create Post
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
