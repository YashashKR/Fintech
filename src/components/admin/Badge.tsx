import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'admin' | 'applicant' | 'loan_officer' | 'risk_analyst' |
    'active' | 'approved' | 'rejected' | 'defaulted' | 'applied' | 'closed';
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'active', className }) => {
    const variantStyles = {
        // Role badges
        admin: 'bg-purple-600/20 text-purple-400 border-purple-500/30',
        applicant: 'bg-gray-600/20 text-gray-300 border-gray-500/30',
        loan_officer: 'bg-blue-600/20 text-blue-400 border-blue-500/30',
        risk_analyst: 'bg-orange-600/20 text-orange-400 border-orange-500/30',

        // Status badges
        active: 'bg-green-600/20 text-green-400 border-green-500/30',
        approved: 'bg-green-600/20 text-green-400 border-green-500/30',
        applied: 'bg-blue-600/20 text-blue-400 border-blue-500/30',
        rejected: 'bg-red-600/20 text-red-400 border-red-500/30',
        defaulted: 'bg-red-600/20 text-red-400 border-red-500/30',
        closed: 'bg-gray-600/20 text-gray-400 border-gray-500/30',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium border',
                variantStyles[variant],
                className
            )}
        >
            {children}
        </span>
    );
};
