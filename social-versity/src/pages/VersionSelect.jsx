import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export function VersionSelect() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                    SocialVersity Prototype
                </h1>
                <p className="text-xl text-gray-600">
                    Select a version to explore
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
                {/* Part 1 Card */}
                <Card className="hover:shadow-xl transition-shadow border-primary-100 flex flex-col">
                    <div className="h-2 bg-primary-500" />
                    <CardBody className="p-8 flex flex-col items-center text-center flex-grow">
                        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                            <span className="text-2xl font-bold text-primary-600">V1</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">GP3 Part 1</h2>
                        <p className="text-gray-500 mb-8 flex-grow">
                            Initial high-fidelity prototype implementation.
                        </p>
                        <Link to="/v1/landing" className="w-full mt-auto">
                            <Button fullWidth size="lg">Launch Part 1</Button>
                        </Link>
                    </CardBody>
                </Card>

                {/* Part 2 Card */}
                <Card className="hover:shadow-xl transition-shadow border-secondary-100 flex flex-col">
                    <div className="h-2 bg-secondary-500" />
                    <CardBody className="p-8 flex flex-col items-center text-center flex-grow">
                        <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mb-6">
                            <span className="text-2xl font-bold text-secondary-600">V2</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">GP3 Part 2</h2>
                        <p className="text-gray-500 mb-8 flex-grow">
                            Revised prototype with heuristic evaluation fixes.
                        </p>
                        <Link to="/v2/landing" className="w-full mt-auto">
                            <Button fullWidth size="lg" variant="secondary">Launch Part 2</Button>
                        </Link>
                    </CardBody>
                </Card>

                {/* Part 3 Card */}
                <Card className="hover:shadow-xl transition-shadow border-accent-100 flex flex-col">
                    <div className="h-2 bg-accent-500" />
                    <CardBody className="p-8 flex flex-col items-center text-center flex-grow">
                        <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mb-6">
                            <span className="text-2xl font-bold text-accent-600">V3</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">GP3 Part 3</h2>
                        <p className="text-gray-500 mb-8 flex-grow">
                            Final revisions based on usability testing.
                        </p>
                        <Link to="/v3/landing" className="w-full mt-auto">
                            <Button fullWidth size="lg" variant="accent">Launch Part 3</Button>
                        </Link>
                    </CardBody>
                </Card>
            </div>

            <p className="mt-12 text-gray-400 text-sm">
                SocialVersity Team • Fall 2025
            </p>
        </div>
    );
}
