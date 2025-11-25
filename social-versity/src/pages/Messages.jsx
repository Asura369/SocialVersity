import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { messages as initialMessages } from '../data/mockData';
import { PaperAirplaneIcon, PhoneIcon, VideoCameraIcon, InformationCircleIcon, ArrowLeftIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { useVersion } from '../context/VersionContext';
import { useToast } from '../context/ToastContext';
import { ConfirmationModal, Modal } from '../components/ui/Modal';
import { cn } from '../utils/cn';

export function Messages() {
    const version = useVersion();
    const { addToast } = useToast();

    // State for conversations list (lifted from mockData to allow additions)
    const [conversations, setConversations] = useState(initialMessages);
    const [activeChat, setActiveChat] = useState(conversations[0]);

    const [replyText, setReplyText] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { id: 1, sender: 'them', text: 'Hey! Are you going to the hackathon?', time: '9:30 AM' },
        { id: 2, sender: 'me', text: 'Yeah, I just registered! Do you have a team yet?', time: '9:32 AM' },
        { id: 3, sender: 'them', text: 'Not yet, still looking for a designer.', time: '9:33 AM' },
    ]);

    // V2: Mobile Navigation State
    const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

    // V2: Delete Message State
    const [messageToDelete, setMessageToDelete] = useState(null);

    // V2: Edit Message State
    const [messageToEdit, setMessageToEdit] = useState(null);
    const [editContent, setEditContent] = useState('');

    // V2: New Chat State
    const [isNewChatOpen, setIsNewChatOpen] = useState(false);

    const handleChatSelect = (chat) => {
        setActiveChat(chat);
        if (version === 'v2') {
            setIsMobileChatOpen(true);
        }
    };

    const handleBackToInbox = () => {
        setIsMobileChatOpen(false);
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (!replyText.trim()) return;

        const newMessage = {
            id: Date.now(),
            sender: 'me',
            text: replyText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setChatHistory([...chatHistory, newMessage]);
        setReplyText('');
    };

    const handleDeleteClick = (msg) => {
        setMessageToDelete(msg);
    };

    const confirmDelete = () => {
        setChatHistory(chatHistory.filter(m => m.id !== messageToDelete.id));
        addToast('Message deleted', 'success');
        setMessageToDelete(null);
    };

    const handleEditClick = (msg) => {
        setMessageToEdit(msg);
        setEditContent(msg.text);
    };

    const saveEdit = () => {
        setChatHistory(chatHistory.map(m =>
            m.id === messageToEdit.id ? { ...m, text: editContent } : m
        ));
        addToast('Message updated', 'success');
        setMessageToEdit(null);
    };

    const startNewChat = (user) => {
        // Check if chat already exists
        const existingChat = conversations.find(c => c.senderName === user.name);
        if (existingChat) {
            handleChatSelect(existingChat);
        } else {
            const newChat = {
                id: `new_${Date.now()}`,
                senderId: user.id,
                senderName: user.name,
                avatar: user.avatar,
                content: 'Start a new conversation',
                timestamp: new Date().toISOString(),
                unread: false,
            };
            setConversations([newChat, ...conversations]);
            setActiveChat(newChat);
            setChatHistory([]); // Start with empty history
            if (version === 'v2') {
                setIsMobileChatOpen(true);
            }
        }
        setIsNewChatOpen(false);
        addToast(`Chat started with ${user.name}`, 'success');
    };

    // V2: Conditional Classes for Mobile View
    const inboxClasses = version === 'v2'
        ? cn("w-full md:w-80 border-r border-gray-200 flex flex-col bg-white", isMobileChatOpen ? "hidden md:flex" : "flex")
        : "w-full md:w-80 border-r border-gray-200 flex flex-col bg-white";

    const chatClasses = version === 'v2'
        ? cn("flex-1 flex-col bg-white", isMobileChatOpen ? "flex fixed inset-0 z-50 md:static" : "hidden md:flex")
        : "hidden md:flex flex-1 flex-col bg-white";

    return (
        <Card className="h-[calc(100vh-8rem)] flex overflow-hidden border-gray-200">
            {/* Sidebar / Inbox */}
            <div className={inboxClasses}>
                <div className="p-4 border-b border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-gray-900">Messages</h2>
                        {version === 'v2' && (
                            <Button size="sm" onClick={() => setIsNewChatOpen(true)} title="New Chat">
                                <PencilSquareIcon className="h-5 w-5" />
                            </Button>
                        )}
                    </div>
                    <Input placeholder="Search messages..." className="bg-gray-50" />
                </div>
                <div className="flex-1 overflow-y-auto">
                    {conversations.map(msg => (
                        <button
                            key={msg.id}
                            onClick={() => handleChatSelect(msg)}
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
            <div className={chatClasses}>
                {/* Chat Header */}
                <div className="h-16 px-4 md:px-6 border-b border-gray-100 flex items-center justify-between bg-white">
                    <div className="flex items-center gap-3">
                        {version === 'v2' && (
                            <button
                                onClick={handleBackToInbox}
                                className="md:hidden p-1 -ml-2 text-gray-500 hover:text-gray-700"
                            >
                                <ArrowLeftIcon className="h-6 w-6" />
                            </button>
                        )}
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
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-gray-50">
                    {chatHistory.map(msg => (
                        <div
                            key={msg.id}
                            className={`flex group ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex items-end gap-2 ${msg.sender === 'me' ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div
                                    className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-2 text-sm ${msg.sender === 'me'
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

                                {/* V2: Delete & Edit Buttons */}
                                {version === 'v2' && msg.sender === 'me' && (
                                    <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleEditClick(msg)}
                                            className="p-1 text-gray-400 hover:text-blue-500"
                                            title="Edit message"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(msg)}
                                            className="p-1 text-gray-400 hover:text-red-500"
                                            title="Delete message"
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                        </button>
                                    </div>
                                )}
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

            {/* V2: Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={!!messageToDelete}
                onClose={() => setMessageToDelete(null)}
                onConfirm={confirmDelete}
                title="Delete Message?"
                message="Are you sure you want to delete this message? This action cannot be undone."
                confirmText="Delete"
            />

            {/* V2: Edit Message Modal */}
            {version === 'v2' && (
                <ConfirmationModal
                    isOpen={!!messageToEdit}
                    onClose={() => setMessageToEdit(null)}
                    onConfirm={saveEdit}
                    title="Edit Message"
                    confirmText="Save Changes"
                    type="primary"
                    message={
                        <div className="mt-2">
                            <Input
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                autoFocus
                            />
                        </div>
                    }
                />
            )}

            {/* V2: New Chat Modal */}
            {version === 'v2' && (
                <Modal
                    isOpen={isNewChatOpen}
                    onClose={() => setIsNewChatOpen(false)}
                    title="New Message"
                >
                    <div className="space-y-4">
                        <Input placeholder="Search users..." autoFocus />
                        <div className="space-y-2">
                            <p className="text-xs font-medium text-gray-500 uppercase">Suggested</p>
                            {[
                                { id: 'u4', name: 'Alex Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
                                { id: 'u5', name: 'Emily Davis', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily' },
                                { id: 'u6', name: 'Chris Lee', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chris' }
                            ].map(user => (
                                <button
                                    key={user.id}
                                    className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors text-left"
                                    onClick={() => startNewChat(user)}
                                >
                                    <Avatar src={user.avatar} alt={user.name} size="sm" />
                                    <span className="font-medium text-gray-900">{user.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </Modal>
            )}
        </Card>
    );
}
