import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const steps = [
    { id: 1, title: 'Verification' },
    { id: 2, title: 'Academics' },
    { id: 3, title: 'Interests' },
];

const interestsList = [
    'Gaming', 'Music', 'Art', 'Tech', 'Sports', 'Reading', 'Photography', 'Hiking', 'Cooking', 'Dance'
];

export function Onboarding() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleNext = () => {
        if (currentStep < 3) {
            setCurrentStep(c => c + 1);
        } else {
            setIsLoading(true);
            setTimeout(() => {
                navigate('/');
            }, 1500);
        }
    };

    const toggleInterest = (interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter(i => i !== interest));
        } else {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md mb-8">
                <div className="flex justify-between mb-4">
                    {steps.map((step) => (
                        <div key={step.id} className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-2 ${step.id <= currentStep ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
                                }`}>
                                {step.id < currentStep ? <CheckCircleIcon className="w-6 h-6" /> : step.id}
                            </div>
                            <span className="text-xs text-gray-500">{step.title}</span>
                        </div>
                    ))}
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary-600 transition-all duration-500 ease-in-out"
                        style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                    />
                </div>
            </div>

            <Card className="w-full max-w-md">
                <CardBody className="space-y-6">
                    {currentStep === 1 && (
                        <div className="space-y-4 animate-fadeIn">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-gray-900">Verify Your Student Status</h2>
                                <p className="text-sm text-gray-500 mt-2">Enter your university email to get started.</p>
                            </div>
                            <Input
                                label="University Email"
                                placeholder="student@university.edu"
                                type="email"
                            />
                            <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
                                <p>We'll send a verification code to this address.</p>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-4 animate-fadeIn">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-gray-900">Tell us about yourself</h2>
                                <p className="text-sm text-gray-500 mt-2">This helps us find your peers.</p>
                            </div>
                            <Input label="Full Name" placeholder="Jane Doe" />
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="Major" placeholder="Computer Science" />
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Year</label>
                                    <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border">
                                        <option>Freshman</option>
                                        <option>Sophomore</option>
                                        <option>Junior</option>
                                        <option>Senior</option>
                                        <option>Graduate</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-gray-900">What are you into?</h2>
                                <p className="text-sm text-gray-500 mt-2">Pick at least 3 interests to get personalized recommendations.</p>
                            </div>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {interestsList.map(interest => (
                                    <button
                                        key={interest}
                                        onClick={() => toggleInterest(interest)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedInterests.includes(interest)
                                                ? 'bg-primary-100 text-primary-700 ring-2 ring-primary-500'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {interest}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="pt-4">
                        <Button
                            fullWidth
                            onClick={handleNext}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Setting up your profile...' : currentStep === 3 ? 'Finish' : 'Continue'}
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
