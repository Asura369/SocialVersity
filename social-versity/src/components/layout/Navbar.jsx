import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, BellIcon, UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { Avatar } from '../ui/Avatar';
import { currentUser } from '../../data/mockData';
import { useVersion } from '../../context/VersionContext';

export function Navbar({ onMenuClick }) {
    const version = useVersion();
    const navigate = useNavigate();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        };

        if (isUserMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isUserMenuOpen]);

    const handleSignOut = () => {
        // Navigate to version select page
        navigate('/');
    };

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left: Logo & Mobile Menu */}
                    <div className="flex items-center">
                        <button
                            type="button"
                            className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-gray-700"
                            onClick={onMenuClick}
                        >
                            <span className="sr-only">Open menu</span>
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <Link to={`/${version}`} className="flex items-center gap-2 ml-2 lg:ml-0">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                                S
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 hidden sm:block">
                                SocialVersity
                            </span>
                        </Link>
                    </div>

                    {/* Center: Search */}
                    <div className="flex-1 max-w-lg mx-4 hidden md:block">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors"
                                placeholder="Search events, groups, or people..."
                            />
                        </div>
                    </div>

                    {/* Right: Actions & Profile */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 relative">
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" />
                            <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                        </button>

                        <div className="relative flex items-center gap-3 pl-2 border-l border-gray-200" ref={menuRef}>
                            <div className="hidden sm:block text-right">
                                <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                                <p className="text-xs text-gray-500">{currentUser.major}</p>
                            </div>

                            {/* V3: Clickable Avatar with Dropdown */}
                            {version === 'v3' ? (
                                <>
                                    <button
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                        className="focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full"
                                    >
                                        <Avatar src={currentUser.avatar} alt={currentUser.name} />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 animate-fadeIn">
                                            <Link
                                                to={`/${version}/profile`}
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                onClick={() => setIsUserMenuOpen(false)}
                                            >
                                                <UserIcon className="h-5 w-5 text-gray-400" />
                                                <span>View Profile</span>
                                            </Link>
                                            <div className="border-t border-gray-100 my-1"></div>
                                            <button
                                                onClick={handleSignOut}
                                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                                                <span>Sign Out</span>
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Avatar src={currentUser.avatar} alt={currentUser.name} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
