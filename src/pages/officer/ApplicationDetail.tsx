import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import type { LoanApplication, LoanStatus } from '../../types';

export const ApplicationDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { loans, updateLoanStatus } = useData();
    const [loan, setLoan] = useState<LoanApplication | undefined>(undefined);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (id) {
            const found = loans.find(l => l.id === id);
            setLoan(found);
        }
    }, [id, loans]);

    if (!loan) {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl font-semibold">Application Not Found</h2>
                <Button onClick={() => navigate('/officer/dashboard')} variant="outline" className="mt-4">
                    Return to Dashboard
                </Button>
            </div>
        );
    }

    const handleAction = async (status: LoanStatus) => {
        if (confirm(`Are you sure you want to mark this application as ${status}?`)) {
            setProcessing(true);
            setTimeout(() => {
                updateLoanStatus(loan.id, status);
                setProcessing(false);
                navigate('/officer/dashboard');
            }, 800);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Button variant="outline" size="sm" onClick={() => navigate('/officer/dashboard')}>
                <ArrowLeft size={16} className="mr-2" /> Back to Queue
            </Button>

            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-text-main">Application Review</h1>
                    <p className="text-text-muted">Applicant: {loan.applicantName}</p>
                </div>
                <div className="flex gap-2">
                    {loan.status === 'APPLIED' && (
                        <Button variant="primary" onClick={() => updateLoanStatus(loan.id, 'UNDER_REVIEW')}>
                            Start Reviewing
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column - Details */}
                <div className="md:col-span-2 space-y-6">
                    <Card title="Loan Request">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-text-muted">Amount</p>
                                <p className="text-xl font-bold">${loan.amount.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-sm text-text-muted">Tenure</p>
                                <p className="text-xl font-bold">{loan.tenureMonths} Months</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm text-text-muted">Purpose</p>
                                <p className="text-base">{loan.purpose}</p>
                            </div>
                        </div>
                    </Card>

                    <Card title="Financial Assessment">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-text-muted">Monthly Income</p>
                                <p className="font-semibold">${loan.monthlyIncome.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-sm text-text-muted">Monthly Expenses</p>
                                <p className="font-semibold">${loan.monthlyExpenses.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-sm text-text-muted">Existing Debts</p>
                                <p className="font-semibold">${loan.existingDebts.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-sm text-text-muted">Employment</p>
                                <p className="font-semibold">{loan.employmentType.replace('_', ' ')}</p>
                            </div>
                        </div>

                        <div className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-100">
                            <p className="text-sm font-medium text-blue-800">System Analysis</p>
                            <div className="flex justify-between mt-2 text-sm">
                                <span>Debt-to-Income Ratio:</span>
                                <span className="font-bold">
                                    {((loan.existingDebts + loan.monthlyExpenses) / loan.monthlyIncome * 100).toFixed(1)}%
                                </span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Column - Actions */}
                <div className="space-y-6">
                    <Card title="Current Status">
                        <div className="text-center py-4">
                            <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold 
                    ${loan.status === 'APPLIED' ? 'bg-blue-100 text-blue-800' :
                                    loan.status === 'UNDER_REVIEW' ? 'bg-yellow-100 text-yellow-800' :
                                        loan.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 'bg-gray-100'}`}>
                                {loan.status.replace('_', ' ')}
                            </span>
                            <p className="text-xs text-text-muted mt-2">ID: {loan.id}</p>
                        </div>
                    </Card>

                    {(loan.status === 'APPLIED' || loan.status === 'UNDER_REVIEW') && (
                        <Card title="Decision">
                            <div className="space-y-3">
                                <Button
                                    className="w-full bg-green-600 hover:bg-green-700"
                                    onClick={() => handleAction('APPROVED')}
                                    disabled={processing}
                                >
                                    <CheckCircle size={16} className="mr-2" /> Approve Loan
                                </Button>
                                <Button
                                    className="w-full bg-red-600 hover:bg-red-700"
                                    variant="danger"
                                    onClick={() => handleAction('REJECTED')}
                                    disabled={processing}
                                >
                                    <XCircle size={16} className="mr-2" /> Reject Application
                                </Button>
                                <Button
                                    className="w-full"
                                    variant="outline"
                                    disabled={processing}
                                >
                                    <AlertTriangle size={16} className="mr-2" /> Request Info
                                </Button>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};
