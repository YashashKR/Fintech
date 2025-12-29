import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { mockLoans } from '../../data/adminMockData';

export const LoanOverrides: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');

    const filteredLoans = mockLoans.filter(loan => {
        // Fix: Use loan.userName instead of loan.applicantName
        const name = loan.userName || '';
        const id = loan.id || '';

        const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'ALL' || loan.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ACTIVE': return 'bg-green-500/10 text-green-500 border border-green-500/20';
            case 'APPROVED': return 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20';
            case 'REJECTED': return 'bg-red-500/10 text-red-500 border border-red-500/20';
            case 'DEFAULTED': return 'bg-red-900/20 text-red-400 border border-red-500/20'; // Darker red/brown for defaulted
            case 'APPLIED': return 'bg-blue-500/10 text-blue-500 border border-blue-500/20';
            default: return 'bg-slate-500/10 text-slate-500 border border-slate-500/20';
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-white">Loan Management & Overrides</h2>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search by user or loan ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#111827] border border-slate-800 text-slate-200 pl-10 pr-4 py-2.5 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all placeholder:text-slate-600"
                    />
                </div>
                <div className="relative min-w-[200px]">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full bg-[#111827] border border-slate-800 text-slate-200 px-4 py-2.5 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 appearance-none cursor-pointer"
                    >
                        <option value="ALL">All Statuses</option>
                        <option value="PENDING">Pending</option>
                        <option value="APPROVED">Approved</option>
                        <option value="REJECTED">Rejected</option>
                        <option value="FLAGGED">Flagged</option>
                        <option value="ACTIVE">Active</option>
                        <option value="DEFAULTED">Defaulted</option>
                        <option value="APPLIED">Applied</option>
                    </select>
                    {/* Custom arrow for select if needed, but browser default often suffices or can be styled */}
                </div>
            </div>

            {/* Dark Theme Table */}
            <div className="bg-[#111827] border border-slate-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-800 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                                <th className="p-4 pl-6">User</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 pr-6 text-right">Overrides</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {filteredLoans.map((loan) => (
                                <tr key={loan.id} className="hover:bg-slate-800/50 transition-colors group">
                                    <td className="p-4 pl-6">
                                        <div>
                                            <div className="font-semibold text-slate-100">{loan.userName}</div>
                                            <div className="text-xs text-slate-500 mt-0.5">Score: {loan.creditScore}</div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="font-medium text-slate-200">${loan.amount.toLocaleString()}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wide inline-block ${getStatusColor(loan.status)}`}>
                                            {loan.status}
                                        </span>
                                    </td>
                                    <td className="p-4 pr-6 text-right">
                                        <div className="flex items-center justify-end gap-4">
                                            <button
                                                className="text-emerald-500 hover:text-emerald-400 transition-colors"
                                                title="Approve Override"
                                            >
                                                <CheckCircle size={18} strokeWidth={2} />
                                            </button>
                                            <button
                                                className="text-red-500 hover:text-red-400 transition-colors"
                                                title="Reject Override"
                                            >
                                                <XCircle size={18} strokeWidth={2} />
                                            </button>
                                            <button
                                                className="text-amber-500 hover:text-amber-400 transition-colors"
                                                title="Flag"
                                            >
                                                <AlertTriangle size={18} strokeWidth={2} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredLoans.length === 0 && (
                    <div className="p-12 text-center text-slate-500">
                        No loans found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
};
