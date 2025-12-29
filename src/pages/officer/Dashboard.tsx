import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { Search } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { MetricsRow } from '../../components/officer/MetricsRow';
import { ApplicationsTable } from '../../components/officer/ApplicationsTable';
import { ApplicationReviewPanel } from '../../components/officer/ApplicationReviewPanel';
import { AuditTrailPanel } from '../../components/officer/AuditTrailPanel';

export const OfficerDashboard: React.FC = () => {
    const { loans } = useData();
    const { user } = useAuth();
    const [selectedLoanId, setSelectedLoanId] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [riskFilter, setRiskFilter] = useState('ALL');

    const selectedLoan = loans.find(l => l.id === selectedLoanId) || null;

    const filteredLoans = loans.filter(loan => {
        const matchesSearch = loan.applicantName.toLowerCase().includes(search.toLowerCase()) ||
            loan.id.includes(search);
        const matchesStatus = statusFilter === 'ALL' || loan.status === statusFilter;
        const matchesRisk = riskFilter === 'ALL' || (riskFilter === 'UNRATED' ? !loan.riskRating : loan.riskRating === riskFilter);

        return matchesSearch && matchesStatus && matchesRisk;
    });

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-slate-800">
            <div className="w-full space-y-8">
                {/* Dashboard Header & Search */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Loan Officer Dashboard</h1>
                        <p className="text-gray-500">Welcome back, {user?.name ?? 'there'}</p>
                    </div>
                    <div className="relative w-full sm:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="Search applicants by name or ID..."
                            className="pl-10 bg-white shadow-sm border-gray-200"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <MetricsRow />

                <section>
                    <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-1">My Queue</h2>
                            <p className="text-gray-500 text-sm">Manage and review incoming loan applications.</p>
                        </div>

                        <div className="flex gap-3">
                            <select
                                className="bg-white border border-gray-300 text-gray-700 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="ALL">All Statuses</option>
                                <option value="APPLIED">Applied</option>
                                <option value="UNDER_REVIEW">Under Review</option>
                                <option value="INFO_REQUESTED">Info Requested</option>
                                <option value="RISK_REVIEW">Risk Review</option>
                                <option value="APPROVED">Approved</option>
                                <option value="REJECTED">Rejected</option>
                            </select>

                            <select
                                className="bg-white border border-gray-300 text-gray-700 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                value={riskFilter}
                                onChange={(e) => setRiskFilter(e.target.value)}
                            >
                                <option value="ALL">All Risk Levels</option>
                                <option value="LOW">Low Risk</option>
                                <option value="MEDIUM">Medium Risk</option>
                                <option value="HIGH">High Risk</option>
                                <option value="UNRATED">Unrated</option>
                            </select>
                        </div>
                    </div>

                    <ApplicationsTable
                        loans={filteredLoans}
                        onView={(id) => setSelectedLoanId(id)}
                    />
                </section>

                <section>
                    <AuditTrailPanel />
                </section>
            </div>

            <ApplicationReviewPanel
                loan={selectedLoan}
                onClose={() => setSelectedLoanId(null)}
            />
        </div>
    );
};
