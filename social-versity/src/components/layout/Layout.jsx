import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export function Layout() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

            <div className="flex max-w-7xl mx-auto">
                <Sidebar />

                <main className="flex-1 min-w-0">
                    <div className="p-4 sm:p-6 lg:p-8">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Mobile Menu Overlay (Simple implementation for prototype) */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)} />
                    <div className="fixed inset-y-0 left-0 flex flex-col w-64 bg-white shadow-xl">
                        <div className="p-4 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">Menu</h2>
                        </div>
                        <Sidebar className="flex h-full border-none w-full static" />
                    </div>
                </div>
            )}
        </div>
    );
}
