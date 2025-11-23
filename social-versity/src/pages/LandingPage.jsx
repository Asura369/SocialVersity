import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function LandingPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <header className="px-4 lg:px-8 h-20 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                        S
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
                        SocialVersity
                    </span>
                </div>
                <div className="flex gap-4">
                    <Button variant="ghost">About</Button>
                    <Link to="/onboarding">
                        <Button>Log in with University Email</Button>
                    </Link>
                </div>
            </header>

            <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
                            Your Campus, <br />
                            <span className="text-primary-600">Connected.</span>
                        </h1>
                        <p className="text-lg text-gray-600">
                            The unified platform for students to discover events, join groups, and find their community. Verified and safe.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link to="/onboarding">
                                <Button size="lg" className="w-full sm:w-auto">Get Started</Button>
                            </Link>
                            <Button size="lg" variant="secondary" className="w-full sm:w-auto">View Demo</Button>
                        </div>
                        <div className="pt-8 flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white" />
                                ))}
                            </div>
                            <p>Joined by 5,000+ students</p>
                        </div>
                    </div>
                    <div className="relative hidden lg:block">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary-200 to-secondary-200 rounded-3xl transform rotate-3 opacity-50 blur-xl" />
                        <div className="relative bg-white border border-gray-200 rounded-2xl shadow-2xl p-6 transform -rotate-2">
                            {/* Mock UI Preview */}
                            <div className="space-y-4">
                                <div className="h-8 w-1/3 bg-gray-100 rounded" />
                                <div className="h-32 bg-primary-50 rounded-xl border border-primary-100 p-4">
                                    <div className="h-4 w-1/2 bg-primary-200 rounded mb-2" />
                                    <div className="h-4 w-3/4 bg-primary-100 rounded" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="h-24 bg-gray-50 rounded-xl" />
                                    <div className="h-24 bg-gray-50 rounded-xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
