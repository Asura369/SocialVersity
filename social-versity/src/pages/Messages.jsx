import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { messages as initialMessages } from '../data/mockData';
import { PaperAirplaneIcon, PhoneIcon, VideoCameraIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

export function Messages() {
    const [activeChat, setActiveChat] = useState(initialMessages[0]);
    const [replyText, setReplyText] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { id: 1, sender: 'them', text: 'Hey! Are you going to the hackathon?', time: '9:30 AM' },
        { id: 2, sender: 'me', text: 'Yeah, I just registered! Do you have a team yet?', time: '9:32 AM' },
        { id: 3, sender: 'them', text: 'Not yet, still looking for a designer.', time: '9:33 AM' },
    ]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!replyText.trim()) return;

        const newMessage = {
            id: chatHistory.length + 1,
            sender: 'me',
            text: replyText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setChatHistory([...chatHistory, newMessage]);
        setReplyText('');
    };

    return (
        <Card className="h-[calc(100vh-8rem)] flex overflow-hidden border-gray-200">
            {/* Sidebar / Inbox */}
            <div className="w-full md:w-80 border-r border-gray-200 flex flex-col bg-white">
                <div className="p-4 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Messages</h2>
                    <Input placeholder="Search messages..." className="bg-gray-50" />
                </div>
                <div className="flex-1 overflow-y-auto">
                    {initialMessages.map(msg => (
                        <button
                            key={msg.id}
                            onClick={() => setActiveChat(msg)}
                            className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors text-left ${activeChat.id === msg.id ? 'bg-primary-50 hover:bg-primary-50' : ''
                                }`}
                        >
                            <div className="relative">
                                <Avatar src={msg.avatar} alt={msg.senderName} />
                                {msg.unread && (
                                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline">
                                    <p className="text-sm font-medium text-gray-900 truncate">{msg.senderName}</p>
                                    <p className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                                <p className={`text-sm truncate ${msg.unread ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
                                    {msg.content}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat Window */}
            <div className="hidden md:flex flex-1 flex-col bg-white">
                {/* Chat Header */}
                <div className="h-16 px-6 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar src={activeChat.avatar} alt={activeChat.senderName} size="sm" />
                        <div>
                            <h3 className="text-sm font-bold text-gray-900">{activeChat.senderName}</h3>
                            <p className="text-xs text-green-600 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                Online
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-gray-400">
                        <button className="hover:text-gray-600"><PhoneIcon className="h-5 w-5" /></button>
                        <button className="hover:text-gray-600"><VideoCameraIcon className="h-5 w-5" /></button>
                        <button className="hover:text-gray-600"><InformationCircleIcon className="h-5 w-5" /></button>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                    {chatHistory.map(msg => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${msg.sender === 'me'
                                        ? 'bg-primary-600 text-white rounded-br-none'
                                        : 'bg-white text-gray-900 shadow-sm rounded-bl-none'
                                    }`}
                            >
                                <p>{msg.text}</p>
                                <p className={`text-[10px] mt-1 text-right ${msg.sender === 'me' ? 'text-primary-100' : 'text-gray-400'
                                    }`}>
                                    {msg.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-100">
                    <form onSubmit={handleSend} className="flex gap-2">
                        <Input
                            placeholder="Type a message..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            className="flex-1 rounded-full border-gray-200 focus:ring-0 focus:border-primary-500 bg-gray-50"
                        />
                        <Button type="submit" className="rounded-full w-10 h-10 p-0 flex items-center justify-center">
                            <PaperAirplaneIcon className="h-5 w-5 -ml-0.5 transform rotate-[-30deg]" />
                        </Button>
                    </form>
                </div>
            </div>
        </Card>
    );
}
