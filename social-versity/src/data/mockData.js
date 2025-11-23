export const currentUser = {
    id: 'u1',
    name: 'John Doe',
    email: 'John.Doe@university.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    major: 'Computer Science',
    year: '2025',
    verified: true,
    interests: ['Gaming', 'Tech', 'Music', 'Coding'],
};

export const groups = [
    {
        id: 'g1',
        name: 'CS Society',
        category: 'Academic',
        members: 1240,
        image: 'https://ui-avatars.com/api/?name=CS+Society&background=0D8ABC&color=fff',
        description: 'Official Computer Science student organization.',
        isMember: true,
    },
    {
        id: 'g2',
        name: 'Photography Club',
        category: 'Arts',
        members: 450,
        image: 'https://ui-avatars.com/api/?name=Photo+Club&background=random',
        description: 'Capture the moments that matter.',
        isMember: false,
    },
    {
        id: 'g3',
        name: 'Esports Team',
        category: 'Gaming',
        members: 890,
        image: 'https://ui-avatars.com/api/?name=Esports&background=111&color=fff',
        description: 'Competitive gaming at the collegiate level.',
        isMember: true,
    },
];

export const events = [
    {
        id: 'e1',
        title: 'Hackathon 2025 Kickoff',
        date: '2025-11-25T18:00:00',
        location: 'Engineering Hall',
        organizer: 'CS Society',
        category: 'Tech',
        attendees: 150,
    },
    {
        id: 'e2',
        title: 'Campus Photography Walk',
        date: '2025-11-26T14:00:00',
        location: 'Main Quad',
        organizer: 'Photography Club',
        category: 'Arts',
        attendees: 30,
    },
    {
        id: 'e3',
        title: 'Career Fair',
        date: '2025-12-01T10:00:00',
        location: 'Student Center',
        organizer: 'University Career Center',
        category: 'Career',
        attendees: 500,
    },
];

export const messages = [
    {
        id: 'm1',
        senderId: 'u2',
        senderName: 'Sarah Chen',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        content: 'Hey! Are you going to the hackathon?',
        timestamp: '2025-11-23T09:30:00',
        unread: true,
    },
    {
        id: 'm2',
        senderId: 'u3',
        senderName: 'Mike Ross',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
        content: 'We need one more person for our team.',
        timestamp: '2025-11-22T16:45:00',
        unread: false,
    },
];
