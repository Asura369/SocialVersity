import React from 'react';
import { cn } from '../../utils/cn';

const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-primary-500',
    accent: 'bg-accent-600 text-white hover:bg-accent-700 focus:ring-accent-500',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
};

const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
};

export function Button({
    className,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    children,
    ...props
}) {
    return (
        <button
            className={cn(
                'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
                variants[variant],
                sizes[size],
                fullWidth && 'w-full',
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
