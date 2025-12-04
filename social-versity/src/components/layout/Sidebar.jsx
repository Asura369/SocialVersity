import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    HomeIcon,
    UserGroupIcon,
    CalendarIcon,
    MapIcon,
    ChatBubbleLeftRightIcon,
    UserIcon,
    ShieldCheckIcon,
    UsersIcon,
    ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline';
import { cn } from '../../utils/cn';
import { useVersion } from '../../context/VersionContext';

const navigationV1V2 = [
    { name: 'Dashboard', href: '', icon: HomeIcon },
    { name: 'Messages', href: 'messages', icon: ChatBubbleLeftRightIcon },
    { name: 'Groups', href: 'groups', icon: UserGroupIcon },
    { name: 'Events', href: 'events', icon: CalendarIcon },
    { name: 'Map', href: 'map', icon: MapIcon },
    { name: 'Profile', href: 'profile', icon: UserIcon },
    { name: 'Safety', href: 'safety', icon: ShieldCheckIcon },
];

const navigationV3 = [
    { name: 'Dashboard', href: '', icon: HomeIcon },
    { name: 'Messages', href: 'messages', icon: ChatBubbleLeftRightIcon },
    { name: 'Connect', href: 'connect', icon: UsersIcon },
    { name: 'Groups', href: 'groups', icon: UserGroupIcon },
    { name: 'Events', href: 'events', icon: CalendarIcon },
    { name: 'Forum', href: 'forum', icon: ChatBubbleBottomCenterTextIcon },
    { name: 'Map', href: 'map', icon: MapIcon },
    { name: 'Profile', href: 'profile', icon: UserIcon },
    { name: 'Safety', href: 'safety', icon: ShieldCheckIcon },
];

export function Sidebar({ className }) {
    const version = useVersion();
    const navigation = version === 'v3' ? navigationV3 : navigationV1V2;

    return (
        <aside className={cn("w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col h-[calc(100vh-4rem)] sticky top-16", className)}>
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                {navigation.map((item) => (
                    <NavLink
                        key={item.name}
                        to={`/${version}/${item.href}`}
                        end={item.href === ''}
                        className={({ isActive }) => cn(
                            'group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors',
                            isActive
                                ? 'bg-primary-50 text-primary-700'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        )}
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon
                                    className={cn(
                                        'mr-3 h-6 w-6 flex-shrink-0 transition-colors',
                                        isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'
                                    )}
                                    aria-hidden="true"
                                />
                                {item.name}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-200">
                <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-gray-900">Student Support</h3>
                    <p className="text-xs text-gray-600 mt-1 mb-3">Need help? Reach out to campus resources.</p>
                    <button className="text-xs font-medium text-primary-700 hover:text-primary-800">
                        View Resources &rarr;
                    </button>
                </div>
            </div>
        </aside>
    );
}
