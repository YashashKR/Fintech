import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Search, Filter } from 'lucide-react';
import { Input } from '../../components/ui/Input';

export const OfficerDashboard: React.FC = () => {
    const { loans } = useData();
    const [filter, setFilter] = useState('ALL');
    const [search, setSearch] = useState('');

    const filteredLoans = loans.filter(loan => {
        const matchesStatus = filter === 'ALL' || loan.status === filter;
        const matchesSearch = loan.applicantName.toLowerCase().includes(search.toLowerCase()) ||
            loan.id.includes(search);
        return matchesStatus && matchesSearch;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'APPLIED': return 'bg-blue-100 text-blue-800';
            case 'UNDER_REVIEW': return 'bg-yellow-100 text-yellow-800';
            case 'APPROVED': return 'bg-green-100 text-green-800';
            case 'REJECTED': return 'bg-red-100 text-red-800';
            case 'DEFAULTED': return 'bg-red-200 text-red-900';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-text-main">Loan Applications</h1>

                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Input
                            placeholder="Search by name or ID..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-8" /* Add padding if I want icon overlap? */
                        />
                        {/* Icon might obscure text if not careful. Input component doesn't support leftIcon prop yet. 
                 I'll just keep it simple or use the native input but remove the unused import. 
                 Actually, I'll remove the unused import and keep the native input for now to preserve the icon layout 
                 since my Input component doesn't support icons. 
                 Wait, I can just remove the import. */ }
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <select
                            className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none bg-white"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="ALL">All Status</option>
                            <option value="APPLIED">Applied</option>
                            <option value="UNDER_REVIEW">Under Review</option>
                            <option value="APPROVED">Approved</option>
                            <option value="REJECTED">Rejected</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid gap-4">
                {filteredLoans.map(loan => (
                    <Card key={loan.id} className="hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="font-semibold text-text-main">{loan.applicantName}</h3>
                                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(loan.status)}`}>
                                        {loan.status.replace('_', ' ')}
                                    </span>
                                </div>
                                <div className="text-sm text-text-muted flex gap-4">
                                    <span>ID: {loan.id.slice(0, 8)}</span>
                                    <span>•</span>
                                    <span>{new Date(loan.submittedAt).toLocaleDateString()}</span>
                                    <span>•</span>
                                    <span>{loan.purpose}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <p className="text-sm text-text-muted">Requested</p>
                                    <p className="text-lg font-bold text-primary">${loan.amount.toLocaleString()}</p>
                                </div>
                                <Link to={`/officer/applications/${loan.id}`}>
                                    <Button variant="outline" size="sm">Review Application</Button>
                                </Link>
                            </div>
                        </div>
                    </Card>
                ))}

                {filteredLoans.length === 0 && (
                    <div className="text-center py-12 text-text-muted bg-white rounded-lg border border-gray-200 border-dashed">
                        No applications found matching your filters.
                    </div>
                )}
            </div>
        </div>
    );
};
