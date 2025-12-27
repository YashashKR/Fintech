import React, { useState } from 'react';
import type { LoanApplication } from '../../types';
import { Button } from '../ui/Button';
import { X, DollarSign, Briefcase } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { ConfirmationModal } from './ConfirmationModal';
import { RejectionModal } from './RejectionModal';

interface ApplicationReviewPanelProps {
    loan: LoanApplication | null;
    onClose: () => void;
}

export const ApplicationReviewPanel: React.FC<ApplicationReviewPanelProps> = ({ loan, onClose }) => {
    const { updateLoan } = useData();
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [approving, setApproving] = useState(false);

    if (!loan) return null;

    // --- Calculations & Validation ---
    const interestRate = 0.12; // 12% annual
    const monthlyRate = interestRate / 12;
    const emi = (loan.amount * monthlyRate * Math.pow(1 + monthlyRate, loan.tenureMonths)) / (Math.pow(1 + monthlyRate, loan.tenureMonths) - 1);

    const emiRatio = (emi / loan.monthlyIncome) * 100;
    const isEmiHigh = emiRatio > 30;
    const isRiskHigh = loan.riskRating === 'HIGH';
    const isCreditLow = (loan.creditScore || 0) < 650;

    const canApprove = !isEmiHigh && !isRiskHigh && !isCreditLow && loan.status !== 'APPROVED' && loan.status !== 'REJECTED';

    const getValidationErrors = () => {
        const errors = [];
        if (isEmiHigh) errors.push(`EMI (${emiRatio.toFixed(1)}%) exceeds 30% of income.`);
        if (isRiskHigh) errors.push('Applicant is flagged as High Risk.');
        if (isCreditLow) errors.push(`Credit Score (${loan.creditScore}) is below 650.`);
        return errors;
    };

    // --- Handlers ---
    const handleApprove = () => {
        setApproving(true);
        // Simulate API delay
        setTimeout(() => {
            updateLoan(loan.id, { status: 'APPROVED' }, 'Approved loan application');
            setApproving(false);
            setShowApproveModal(false);
            onClose();
        }, 1000);
    };

    const handleReject = (reason: string) => {
        updateLoan(loan.id, { status: 'REJECTED', rejectionReason: reason }, `Rejected application: ${reason}`);
        setShowRejectModal(false);
        onClose();
    };

    const handleRequestInfo = () => {
        updateLoan(loan.id, { status: 'INFO_REQUESTED' }, 'Requested additional information from applicant');
        onClose();
    };

    const handleFlagRisk = () => {
        updateLoan(loan.id, { status: 'RISK_REVIEW', riskRating: 'HIGH' }, 'Flagged for Risk Review');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-blue-50">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{loan.applicantName}</h2>
                        <span className="text-sm text-blue-600 font-medium">Application ID: {loan.id.slice(0, 8)}</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full w-8 h-8 p-0 hover:bg-blue-100 text-gray-500">
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">

                    {/* Status Banner */}
                    <div className="flex items-center gap-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <div className="flex-1">
                            <p className="text-sm text-blue-600 font-semibold uppercase tracking-wider">Current Status</p>
                            <p className="text-lg font-bold text-blue-900">{loan.status.replace('_', ' ')}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-blue-600 font-semibold uppercase tracking-wider">Risk Level</p>
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${loan.riskRating === 'HIGH' ? 'bg-red-100 text-red-700' :
                                    loan.riskRating === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-green-100 text-green-700'
                                }`}>
                                {loan.riskRating || 'PENDING'}
                            </span>
                        </div>
                    </div>

                    {/* Validation Alerts */}
                    {!canApprove && (loan.status === 'APPLIED' || loan.status === 'UNDER_REVIEW') && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r shadow-sm">
                            <h4 className="text-red-800 font-bold mb-1 flex items-center gap-2">Attention Needed</h4>
                            <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                                {getValidationErrors().map((err, i) => (
                                    <li key={i}>{err}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Loan Details Grid */}
                    <section>
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-blue-500" /> Loan Details
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <DetailItem label="Amount Requested" value={`$${loan.amount.toLocaleString()}`} />
                            <DetailItem label="Tenure" value={`${loan.tenureMonths} Months`} />
                            <DetailItem label="Purpose" value={loan.purpose} />
                            <DetailItem label="EMI (Est.)" value={`$${emi.toFixed(2)}`} />
                        </div>
                    </section>

                    {/* Financial Profiling */}
                    <section>
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-blue-500" /> Financial Profile
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <DetailItem label="Employment Type" value={loan.employmentType.replace('_', ' ')} />
                            <DetailItem label="Monthly Income" value={`$${loan.monthlyIncome.toLocaleString()}`} />
                            <DetailItem label="Monthly Expenses" value={`$${loan.monthlyExpenses.toLocaleString()}`} />
                            <DetailItem label="Credit Score" value={loan.creditScore ? loan.creditScore.toString() : 'N/A'} />
                        </div>
                    </section>

                </div>

                {/* Footer - Actions */}
                <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between items-center gap-3">
                    <Button variant="ghost" onClick={handleFlagRisk} className="text-amber-600 hover:text-amber-700 hover:bg-amber-50" disabled={loan.status === 'RISK_REVIEW'}>
                        Flag Risk
                    </Button>

                    <div className="flex gap-3">
                        <Button variant="outline" onClick={handleRequestInfo} disabled={loan.status === 'INFO_REQUESTED'}>Request Info</Button>
                        <Button variant="danger" onClick={() => setShowRejectModal(true)} disabled={loan.status === 'REJECTED' || loan.status === 'APPROVED'}>Reject</Button>
                        <Button
                            variant="primary"
                            onClick={() => setShowApproveModal(true)}
                            isLoading={approving}
                            disabled={!canApprove}
                            className={!canApprove ? "opacity-50 cursor-not-allowed" : ""}
                        >
                            Approve
                        </Button>
                    </div>
                </div>

                {/* Modals */}
                <ConfirmationModal
                    isOpen={showApproveModal}
                    title="Approve Loan Application"
                    message={`Are you sure you want to approve this loan for ${loan.applicantName}? This action cannot be undone.`}
                    confirmLabel="Approve Loan"
                    onConfirm={handleApprove}
                    onCancel={() => setShowApproveModal(false)}
                    variant="primary"
                />

                <RejectionModal
                    isOpen={showRejectModal}
                    onConfirm={handleReject}
                    onCancel={() => setShowRejectModal(false)}
                />
            </div>
        </div>
    );
};

const DetailItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="p-3 bg-gray-50 rounded border border-gray-100">
        <p className="text-xs text-gray-500 uppercase font-semibold">{label}</p>
        <p className="text-base font-medium text-gray-900">{value}</p>
    </div>
);
