import React from 'react';
import { cn } from '../../utils/cn';

const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
};

export function Avatar({
    src,
    alt,
    size = 'md',
    className,
    ...props
}) {
    return (
        <div
            className={cn(
                'relative inline-block rounded-full overflow-hidden bg-gray-100',
                sizes[size],
                className
            )}
            {...props}
        >
            {src ? (
                <img
                    src={src}
                    alt={alt}
                    className="h-full w-full object-cover"
                />
            ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary-100 text-primary-700 font-medium">
                    {alt ? alt.charAt(0).toUpperCase() : '?'}
                </div>
            )}
        </div>
    );
}
