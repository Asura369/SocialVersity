import React, { createContext, useContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { XMarkIcon, CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { cn } from '../utils/cn';

const ToastContext = createContext(null);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}

const TOAST_DURATION = 3000;

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);

        setTimeout(() => {
            removeToast(id);
        }, TOAST_DURATION);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            {createPortal(
                <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
                    {toasts.map(toast => (
                        <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
                    ))}
                </div>,
                document.body
            )}
        </ToastContext.Provider>
    );
}

function Toast({ message, type, onClose }) {
    const icons = {
        success: <CheckCircleIcon className="w-5 h-5 text-green-500" />,
        error: <ExclamationCircleIcon className="w-5 h-5 text-red-500" />,
        info: <InformationCircleIcon className="w-5 h-5 text-blue-500" />,
    };

    const styles = {
        success: 'bg-white border-green-100',
        error: 'bg-white border-red-100',
        info: 'bg-white border-blue-100',
    };

    return (
        <div className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border animate-slideIn min-w-[300px]",
            styles[type]
        )}>
            {icons[type]}
            <p className="text-sm font-medium text-gray-900 flex-1">{message}</p>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <XMarkIcon className="w-4 h-4" />
            </button>
        </div>
    );
}
