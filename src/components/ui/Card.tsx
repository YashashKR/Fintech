import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    actions?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, actions }) => {
    return (
        <div className={`bg-white rounded-lg shadow-clean border border-gray-100 overflow-hidden ${className}`}>
            {(title || actions) && (
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    {title && <h3 className="text-lg font-medium text-text-main">{title}</h3>}
                    {actions && <div className="flex gap-2">{actions}</div>}
                </div>
            )}
            <div className="p-6">
                {children}
            </div>
        </div>
    );
};
