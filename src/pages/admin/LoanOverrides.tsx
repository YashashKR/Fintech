import React, { useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Badge } from '../../components/admin/Badge';
import { mockLoans } from '../../data/adminMockData';

export const LoanOverrides: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');

    const filteredLoans = mockLoans.filter(loan => {
        const matchesSearch = loan.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            loan.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'ALL' || loan.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">Loan Overrides</h2>
                    <p className="text-slate-400 text-sm mt-1">Manage and override loan decisions manually</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by applicant or loan ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex gap-2">
                    <div className="relative min-w-[150px]">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 appearance-none"
                        >
                            <option value="ALL">All Statuses</option>
                            <option value="PENDING">Pending</option>
                            <option value="APPROVED">Approved</option>
                            <option value="REJECTED">Rejected</option>
                            <option value="FLAGGED">Flagged</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Loans Table */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-700/50 text-slate-400 text-sm uppercase tracking-wider">
                                <th className="p-4 font-medium">Applicant</th>
                                <th className="p-4 font-medium">Amount</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium text-right">Override Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                            {filteredLoans.map((loan) => (
                                <tr key={loan.id} className="hover:bg-slate-800/50 transition-colors">
                                    <td className="p-4">
                                        <div>
                                            <div className="font-medium text-white">{loan.applicantName}</div>
                                            <div className="text-sm text-slate-400">Score: {loan.creditScore}</div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="font-medium text-white">${loan.amount.toLocaleString()}</div>
                                        <div className="text-sm text-slate-400">{loan.termMonths} months</div>
                                    </td>
                                    <td className="p-4">
                                        <Badge variant={loan.status.toLowerCase() as any}>
                                            {loan.status}
                                        </Badge>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 hover:bg-green-500/20 rounded-lg text-slate-400 hover:text-green-400 transition-colors" title="Approve">
                                                <CheckCircle size={20} />
                                            </button>
                                            <button className="p-2 hover:bg-red-500/20 rounded-lg text-slate-400 hover:text-red-400 transition-colors" title="Reject">
                                                <XCircle size={20} />
                                            </button>
                                            <button className="p-2 hover:bg-yellow-500/20 rounded-lg text-slate-400 hover:text-yellow-400 transition-colors" title="Flag for Review">
                                                <AlertTriangle size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredLoans.length === 0 && (
                    <div className="p-8 text-center text-slate-400">
                        No loans found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
};
