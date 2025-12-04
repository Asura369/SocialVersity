import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { MagnifyingGlassIcon, UserPlusIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { useToast } from '../context/ToastContext';
import { useVersion } from '../context/VersionContext';

// Mock data for students
const mockStudents = [
    {
        id: 1,
        name: 'Alex Chen',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        major: 'Computer Science',
        year: '2025',
        courses: ['CS 101', 'MATH 201', 'PHYS 150'],
        groups: ['Tech Club', 'Gaming Society'],
        interests: ['AI', 'Gaming', 'Robotics'],
        bio: 'Passionate about machine learning and game development.',
    },
    {
        id: 2,
        name: 'Sarah Johnson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        major: 'Business Administration',
        year: '2026',
        courses: ['BUS 301', 'ECON 101', 'MATH 201'],
        groups: ['Entrepreneurship Club', 'Student Government'],
        interests: ['Startups', 'Marketing', 'Finance'],
        bio: 'Aspiring entrepreneur interested in tech startups.',
    },
    {
        id: 3,
        name: 'Marcus Williams',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
        major: 'Computer Science',
        year: '2025',
        courses: ['CS 101', 'CS 250', 'MATH 201'],
        groups: ['Tech Club', 'ACM Chapter'],
        interests: ['Web Development', 'Open Source', 'AI'],
        bio: 'Full-stack developer and open source contributor.',
    },
    {
        id: 4,
        name: 'Emily Davis',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
        major: 'Psychology',
        year: '2026',
        courses: ['PSY 101', 'BIO 150', 'STAT 200'],
        groups: ['Mental Health Awareness', 'Yoga Club'],
        interests: ['Mental Health', 'Wellness', 'Research'],
        bio: 'Interested in clinical psychology and mental health advocacy.',
    },
    {
        id: 5,
        name: 'David Kim',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
        major: 'Mechanical Engineering',
        year: '2025',
        courses: ['ENGR 201', 'PHYS 150', 'MATH 301'],
        groups: ['Robotics Club', 'Engineering Society'],
        interests: ['Robotics', 'CAD', 'Manufacturing'],
        bio: 'Building robots and designing mechanical systems.',
    },
    {
        id: 6,
        name: 'Jessica Martinez',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
        major: 'Art & Design',
        year: '2027',
        courses: ['ART 101', 'DES 200', 'HIST 150'],
        groups: ['Art Society', 'Photography Club'],
        interests: ['Digital Art', 'Photography', 'UI/UX'],
        bio: 'Digital artist and aspiring UX designer.',
    },
    {
        id: 7,
        name: 'Ryan Thompson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan',
        major: 'Computer Science',
        year: '2025',
        courses: ['CS 101', 'CS 250', 'MATH 301'],
        groups: ['Tech Club', 'Cybersecurity Team'],
        interests: ['Security', 'Networking', 'Linux'],
        bio: 'Cybersecurity enthusiast and ethical hacker.',
    },
    {
        id: 8,
        name: 'Olivia Brown',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia',
        major: 'Biology',
        year: '2026',
        courses: ['BIO 150', 'CHEM 101', 'MATH 201'],
        groups: ['Pre-Med Society', 'Research Club'],
        interests: ['Medicine', 'Research', 'Genetics'],
        bio: 'Pre-med student passionate about genetics research.',
    },
    {
        id: 9,
        name: 'James Lee',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
        major: 'Economics',
        year: '2025',
        courses: ['ECON 101', 'MATH 201', 'STAT 200'],
        groups: ['Investment Club', 'Debate Team'],
        interests: ['Finance', 'Trading', 'Economics'],
        bio: 'Interested in financial markets and economic policy.',
    },
    {
        id: 10,
        name: 'Sophia Garcia',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia',
        major: 'Environmental Science',
        year: '2026',
        courses: ['ENV 101', 'BIO 150', 'CHEM 101'],
        groups: ['Sustainability Club', 'Outdoor Adventure'],
        interests: ['Climate', 'Conservation', 'Hiking'],
        bio: 'Environmental activist working on sustainability projects.',
    },
    {
        id: 11,
        name: 'Ethan Miller',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan',
        major: 'Physics',
        year: '2025',
        courses: ['PHYS 150', 'MATH 301', 'CS 101'],
        groups: ['Physics Society', 'Astronomy Club'],
        interests: ['Astrophysics', 'Quantum', 'Space'],
        bio: 'Aspiring astrophysicist fascinated by the cosmos.',
    },
    {
        id: 12,
        name: 'Ava Wilson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ava',
        major: 'Political Science',
        year: '2026',
        courses: ['POLI 101', 'HIST 150', 'ECON 101'],
        groups: ['Student Government', 'Debate Team'],
        interests: ['Policy', 'Law', 'Activism'],
        bio: 'Future lawyer interested in public policy and social justice.',
    },
    {
        id: 13,
        name: 'Noah Anderson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Noah',
        major: 'Music',
        year: '2027',
        courses: ['MUS 101', 'ART 101', 'HIST 150'],
        groups: ['Music Production', 'Jazz Band'],
        interests: ['Music', 'Production', 'Performance'],
        bio: 'Musician and producer creating beats and performing live.',
    },
    {
        id: 14,
        name: 'Isabella Taylor',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella',
        major: 'Chemistry',
        year: '2025',
        courses: ['CHEM 101', 'MATH 201', 'BIO 150'],
        groups: ['Chemistry Lab Partners', 'Research Club'],
        interests: ['Chemistry', 'Lab Work', 'Research'],
        bio: 'Chemistry major focused on pharmaceutical research.',
    },
    {
        id: 15,
        name: 'Liam Martinez',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Liam',
        major: 'Marketing',
        year: '2026',
        courses: ['MKT 101', 'BUS 301', 'ECON 101'],
        groups: ['Marketing Club', 'Entrepreneurship Club'],
        interests: ['Branding', 'Social Media', 'Advertising'],
        bio: 'Creative marketer specializing in digital campaigns.',
    },
    {
        id: 16,
        name: 'Mia Robinson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mia',
        major: 'Computer Science',
        year: '2025',
        courses: ['CS 101', 'MATH 201', 'CS 250'],
        groups: ['Tech Club', 'Women in STEM'],
        interests: ['Mobile Dev', 'UI/UX', 'Startups'],
        bio: 'iOS developer building apps for social impact.',
    },
    {
        id: 17,
        name: 'Lucas White',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas',
        major: 'History',
        year: '2026',
        courses: ['HIST 150', 'POLI 101', 'ENG 101'],
        groups: ['History Club', 'Debate Team'],
        interests: ['History', 'Writing', 'Research'],
        bio: 'History buff researching ancient civilizations.',
    },
    {
        id: 18,
        name: 'Charlotte Harris',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlotte',
        major: 'Nursing',
        year: '2027',
        courses: ['NUR 101', 'BIO 150', 'CHEM 101'],
        groups: ['Pre-Med Society', 'Volunteer Corps'],
        interests: ['Healthcare', 'Volunteering', 'Wellness'],
        bio: 'Nursing student passionate about patient care.',
    },
];

export function Connect() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const version = useVersion();
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [connectedStudents, setConnectedStudents] = useState([]);

    const handleConnect = (student) => {
        if (connectedStudents.includes(student.id)) {
            setConnectedStudents(connectedStudents.filter(id => id !== student.id));
            addToast(`Disconnected from ${student.name}`, 'success');
        } else {
            setConnectedStudents([...connectedStudents, student.id]);
            addToast(`Connected with ${student.name}!`, 'success');
        }
    };

    const handleMessage = (student) => {
        navigate(`/${version}/messages`);
        addToast(`Opening chat with ${student.name}...`, 'success');
    };

    const filteredStudents = mockStudents.filter(student => {
        const matchesSearch = searchTerm === '' ||
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.major.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.interests.some(i => i.toLowerCase().includes(searchTerm.toLowerCase()));

        if (activeFilter === 'all') return matchesSearch;
        if (activeFilter === 'sameCourses') {
            // Mock: Show students with CS 101 or MATH 201
            return matchesSearch && student.courses.some(c => ['CS 101', 'MATH 201'].includes(c));
        }
        if (activeFilter === 'sameMajor') {
            return matchesSearch && student.major === 'Computer Science';
        }
        if (activeFilter === 'sameGroups') {
            return matchesSearch && student.groups.some(g => ['Tech Club', 'Gaming Society'].includes(g));
        }
        return matchesSearch;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Connect</h1>
                    <p className="text-gray-600 mt-1">Discover and connect with fellow students.</p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Search by name, major, or interests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
                {[
                    { id: 'all', label: 'Everyone' },
                    { id: 'sameCourses', label: 'Same Courses' },
                    { id: 'sameMajor', label: 'Same Major' },
                    { id: 'sameGroups', label: 'Same Groups' },
                ].map(filter => (
                    <button
                        key={filter.id}
                        onClick={() => setActiveFilter(filter.id)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeFilter === filter.id
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            {/* Results Count */}
            <p className="text-sm text-gray-600">
                {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''} found
            </p>

            {/* Students Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStudents.map(student => (
                    <Card key={student.id} className="hover:shadow-md transition-shadow">
                        <CardBody>
                            <div className="flex items-start gap-4">
                                <Avatar src={student.avatar} alt={student.name} size="lg" />
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-bold text-gray-900 truncate">{student.name}</h3>
                                    <p className="text-sm text-gray-600">{student.major}</p>
                                    <p className="text-xs text-gray-500">Class of {student.year}</p>
                                </div>
                            </div>

                            <p className="mt-3 text-sm text-gray-600 line-clamp-2">{student.bio}</p>

                            {/* Interests */}
                            <div className="mt-3 flex flex-wrap gap-1">
                                {student.interests.slice(0, 3).map(interest => (
                                    <Badge key={interest} variant="blue" className="text-xs">
                                        {interest}
                                    </Badge>
                                ))}
                            </div>

                            {/* Courses */}
                            <div className="mt-3">
                                <p className="text-xs font-medium text-gray-700 mb-1">Courses:</p>
                                <div className="flex flex-wrap gap-1">
                                    {student.courses.slice(0, 3).map(course => (
                                        <span key={course} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                            {course}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Groups */}
                            <div className="mt-2">
                                <p className="text-xs font-medium text-gray-700 mb-1">Groups:</p>
                                <div className="flex flex-wrap gap-1">
                                    {student.groups.slice(0, 2).map(group => (
                                        <span key={group} className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                                            {group}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                                <Button
                                    size="sm"
                                    variant={connectedStudents.includes(student.id) ? 'secondary' : 'primary'}
                                    className="flex-1 flex items-center justify-center gap-2"
                                    onClick={() => handleConnect(student)}
                                >
                                    <UserPlusIcon className="h-4 w-4" />
                                    {connectedStudents.includes(student.id) ? 'Connected' : 'Connect'}
                                </Button>
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    className="flex items-center justify-center gap-2"
                                    onClick={() => handleMessage(student)}
                                >
                                    <ChatBubbleLeftRightIcon className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>

            {filteredStudents.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No students found matching your criteria.</p>
                </div>
            )}
        </div>
    );
}
