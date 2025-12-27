import React, { useState } from 'react';
import type { LoanApplication } from '../../types';
import { Button } from '../ui/Button';
import { ArrowUpDown, Eye } from 'lucide-react';

interface ApplicationsTableProps {
    loans: LoanApplication[];
    onView: (loanId: string) => void;
}

type SortField = 'amount' | 'creditScore' | 'applicantName';
type SortOrder = 'asc' | 'desc';

export const ApplicationsTable: React.FC<ApplicationsTableProps> = ({ loans, onView }) => {
    const [sortField, setSortField] = useState<SortField>('applicantName');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const sortedLoans = [...loans].sort((a, b) => {
        const factor = sortOrder === 'asc' ? 1 : -1;
        if (sortField === 'amount') return (a.amount - b.amount) * factor;
        if (sortField === 'creditScore') return ((a.creditScore || 0) - (b.creditScore || 0)) * factor;
        return a.applicantName.localeCompare(b.applicantName) * factor;
    });

    const getRiskColor = (risk?: string) => {
        switch (risk) {
            case 'LOW': return 'text-green-700 font-bold border border-green-200 bg-white';
            case 'MEDIUM': return 'text-amber-600 font-bold border border-amber-200 bg-white';
            case 'HIGH': return 'text-red-700 font-bold border border-red-200 bg-white';
            default: return 'text-gray-500 border border-gray-200 bg-white';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'APPLIED': return 'text-blue-700 font-bold border border-blue-200 bg-white';
            case 'APPROVED': return 'text-green-700 font-bold border border-green-200 bg-white';
            case 'REJECTED': return 'text-red-700 font-bold border border-red-200 bg-white';
            case 'UNDER_REVIEW': return 'text-amber-700 font-bold border border-amber-200 bg-white';
            case 'INFO_REQUESTED': return 'text-purple-700 font-bold border border-purple-200 bg-white';
            case 'RISK_REVIEW': return 'text-orange-700 font-bold border border-orange-200 bg-white';
            default: return 'text-gray-600 border border-gray-200 bg-white';
        }
    };

    return (
        <div className="bg-white border border-blue-200 rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left">
                <thead className="bg-blue-50 text-blue-900 font-semibold border-b border-blue-200">
                    <tr>
                        <th className="px-6 py-4 cursor-pointer hover:bg-blue-100" onClick={() => handleSort('applicantName')}>
                            <div className="flex items-center gap-2">Applicant Name <ArrowUpDown className="w-4 h-4" /></div>
                        </th>
                        <th className="px-6 py-4 cursor-pointer hover:bg-blue-100" onClick={() => handleSort('creditScore')}>
                            <div className="flex items-center gap-2">Credit Score <ArrowUpDown className="w-4 h-4" /></div>
                        </th>
                        <th className="px-6 py-4 cursor-pointer hover:bg-blue-100" onClick={() => handleSort('amount')}>
                            <div className="flex items-center gap-2">Loan Amount <ArrowUpDown className="w-4 h-4" /></div>
                        </th>
                        <th className="px-6 py-4">Risk Level</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-blue-100">
                    {sortedLoans.map(loan => (
                        <tr key={loan.id} className="hover:bg-blue-50/50 transition-colors">
                            <td className="px-6 py-4 font-medium text-gray-900">{loan.applicantName}</td>
                            <td className="px-6 py-4 font-mono text-gray-600">{loan.creditScore || 'N/A'}</td>
                            <td className="px-6 py-4 font-semibold text-gray-700">${loan.amount.toLocaleString()}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRiskColor(loan.riskRating)}`}>
                                    {loan.riskRating || 'UNRATED'}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(loan.status)}`}>
                                    {loan.status.replace('_', ' ')}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <Button size="sm" variant="outline" onClick={() => onView(loan.id)} className="text-blue-600 border-blue-200 hover:bg-blue-50">
                                    <Eye className="w-4 h-4 mr-1" /> View
                                </Button>
                            </td>
                        </tr>
                    ))}
                    {sortedLoans.length === 0 && (
                        <tr>
                            <td colSpan={6} className="px-6 py-8 text-center text-gray-500 italic">
                                No applications found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
