import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: LucideIcon;
    iconColor?: string;
    iconBgColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    subtitle,
    icon: Icon,
    iconColor = 'text-blue-400',
    iconBgColor = 'bg-blue-500/10',
}) => {
    return (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-slate-600/50 transition-colors">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm text-slate-400 mb-1">{title}</p>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 break-all">{value}</h3>
                    {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
                </div>
                <div className={`p-3 rounded-lg ${iconBgColor}`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>
            </div>
        </div>
    );
};
