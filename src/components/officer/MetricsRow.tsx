import React, { useMemo } from 'react';
import { useData } from '../../contexts/DataContext';
import { FileText, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export const MetricsRow: React.FC = () => {
    const { loans } = useData();

    const stats = useMemo(() => {
        return {
            pending: loans.filter(l => l.status === 'APPLIED' || l.status === 'UNDER_REVIEW').length,
            approved: loans.filter(l => l.status === 'APPROVED').length,
            rejected: loans.filter(l => l.status === 'REJECTED').length,
            highRisk: loans.filter(l => l.riskRating === 'HIGH').length,
        };
    }, [loans]);

    return (
        <div className="grid grid-cols-4 gap-4 mb-6">
            <MetricCard
                label="Pending Applications"
                value={stats.pending}
                icon={FileText}
                color="text-blue-600"
                bg="bg-white"
                borderColor="border-blue-200"
            />
            <MetricCard
                label="Approved Loans"
                value={stats.approved}
                icon={CheckCircle}
                color="text-green-600"
                bg="bg-white"
                borderColor="border-gray-200"
            />
            <MetricCard
                label="Rejected Loans"
                value={stats.rejected}
                icon={XCircle}
                color="text-red-600"
                bg="bg-white"
                borderColor="border-gray-200"
            />
            <MetricCard
                label="High Risk Flagged"
                value={stats.highRisk}
                icon={AlertTriangle}
                color="text-amber-600"
                bg="bg-white"
                borderColor="border-gray-200"
            />
        </div>
    );
};

interface MetricCardProps {
    label: string;
    value: number;
    icon: React.ElementType;
    color: string;
    bg: string;
    borderColor: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, icon: Icon, color, bg, borderColor }) => (
    <div className={`p-4 rounded-lg border ${borderColor} ${bg} flex items-center justify-between shadow-sm`}>
        <div>
            <p className="text-sm text-gray-600 font-medium mb-1">{label}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-2 rounded-full bg-blue-50 ${color}`}>
            <Icon className="w-5 h-5" />
        </div>
    </div>
);
