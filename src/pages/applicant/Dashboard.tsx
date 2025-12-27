import React from 'react';
import { useData } from '../../contexts/DataContext';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Plus } from 'lucide-react';

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const colors = {
        APPLIED: 'bg-blue-100 text-blue-800',
        UNDER_REVIEW: 'bg-yellow-100 text-yellow-800',
        APPROVED: 'bg-green-100 text-green-800',
        REJECTED: 'bg-red-100 text-red-800',
        ACTIVE: 'bg-emerald-100 text-emerald-800',
        CLOSED: 'bg-gray-100 text-gray-800',
        DEFAULTED: 'bg-red-200 text-red-900',
    } as Record<string, string>;

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[status] || 'bg-gray-100'}`}>
            {status.replace('_', ' ')}
        </span>
    );
};

export const ApplicantDashboard: React.FC = () => {
    const { loans } = useData();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-text-main">My Dashboard</h1>
                <Link to="/applicant/apply">
                    <Button><Plus size={16} className="mr-2" /> New Loan</Button>
                </Link>
            </div>

            {loans.length === 0 ? (
                <Card className="text-center py-12">
                    <h3 className="text-lg font-medium text-text-main mb-2">No Active Loans</h3>
                    <p className="text-text-muted mb-6">You haven't applied for any loans yet.</p>
                    <Link to="/applicant/apply">
                        <Button variant="outline">Start Application</Button>
                    </Link>
                </Card>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {loans.map(loan => (
                        <Card key={loan.id} title={`Loan #${loan.id.slice(0, 8)}`}>
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <p className="text-sm text-text-muted">Amount</p>
                                    <p className="text-xl font-bold text-primary">${loan.amount.toLocaleString()}</p>
                                </div>
                                <div className="space-y-1 text-right">
                                    <p className="text-sm text-text-muted">Status</p>
                                    <StatusBadge status={loan.status} />
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm text-text-muted">
                                <span>{loan.tenureMonths} Months</span>
                                <span>{new Date(loan.submittedAt).toLocaleDateString()}</span>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};
