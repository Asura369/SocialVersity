import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ShieldExclamationIcon, BookOpenIcon, LifebuoyIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export function Safety() {
    const [reportSubmitted, setReportSubmitted] = useState(false);

    const handleReport = (e) => {
        e.preventDefault();
        setReportSubmitted(true);
        setTimeout(() => setReportSubmitted(false), 3000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Safety Center</h1>
                <p className="text-gray-600 mt-2">We're committed to keeping SocialVersity safe and inclusive.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Report Form */}
                <Card className="md:col-span-2">
                    <CardHeader className="bg-red-50 border-red-100">
                        <div className="flex items-center gap-3 text-red-800">
                            <ShieldExclamationIcon className="h-6 w-6" />
                            <h2 className="text-lg font-bold">Report an Issue</h2>
                        </div>
                    </CardHeader>
                    <CardBody>
                        {reportSubmitted ? (
                            <div className="text-center py-8 animate-fadeIn">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                                    <CheckCircleIcon className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Report Submitted</h3>
                                <p className="text-gray-600 mt-2">Thank you for helping keep our community safe. Our team will review this shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleReport} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="block text-sm font-medium text-gray-700">Reason</label>
                                        <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm p-2 border">
                                            <option>Harassment or Bullying</option>
                                            <option>Hate Speech</option>
                                            <option>Spam or Scam</option>
                                            <option>Inappropriate Content</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <Input label="Link to Content (Optional)" placeholder="https://..." />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        rows={4}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm p-2 border"
                                        placeholder="Please provide details about what happened..."
                                        required
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <Button variant="danger" type="submit">Submit Report</Button>
                                </div>
                            </form>
                        )}
                    </CardBody>
                </Card>

                {/* Guidelines */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <BookOpenIcon className="h-6 w-6 text-primary-600" />
                            <h2 className="text-lg font-bold text-gray-900">Community Guidelines</h2>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li className="flex gap-2">
                                <span className="font-bold text-gray-900">1.</span>
                                Be respectful and inclusive to all members.
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold text-gray-900">2.</span>
                                No harassment, hate speech, or bullying.
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold text-gray-900">3.</span>
                                Keep content relevant to campus life.
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold text-gray-900">4.</span>
                                Protect your personal information.
                            </li>
                        </ul>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <Button variant="ghost" size="sm" className="text-primary-600 p-0 hover:bg-transparent">Read Full Guidelines &rarr;</Button>
                        </div>
                    </CardBody>
                </Card>

                {/* Resources */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <LifebuoyIcon className="h-6 w-6 text-green-600" />
                            <h2 className="text-lg font-bold text-gray-900">Support Resources</h2>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900">Campus Security</p>
                                    <p className="text-xs text-gray-500">Emergency: 555-0199</p>
                                </div>
                                <Button size="sm" variant="secondary">Call</Button>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900">Counseling Center</p>
                                    <p className="text-xs text-gray-500">Mental health support</p>
                                </div>
                                <Button size="sm" variant="secondary">Book</Button>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
