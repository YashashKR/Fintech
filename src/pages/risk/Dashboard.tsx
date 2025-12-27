import React from 'react';
import { useData } from '../../contexts/DataContext';
import { calculateRiskScore } from '../../services/riskEngine';
import { Card } from '../../components/ui/Card';
import { ShieldAlert, TrendingUp, AlertTriangle } from 'lucide-react';

export const RiskDashboard: React.FC = () => {
    const { loans } = useData();

    // Calculate Metrics
    const totalLoans = loans.length;
    const highRiskLoans = loans.filter(l => {
        const { rating } = calculateRiskScore(l);
        return rating === 'HIGH' && l.status !== 'REJECTED';
    }).length;

    const defaultedLoans = loans.filter(l => l.status === 'DEFAULTED').length;
    const activeExposure = loans
        .filter(l => l.status === 'ACTIVE' || l.status === 'APPROVED')
        .reduce((sum, l) => sum + l.amount, 0);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-text-main">Risk Analysis Overview</h1>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-red-50 border-red-100">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-100 text-red-600 rounded-full">
                            <ShieldAlert size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-red-800 font-medium">High Risk Applications</p>
                            <h3 className="text-2xl font-bold text-red-900">{highRiskLoans}</h3>
                        </div>
                    </div>
                </Card>

                <Card className="bg-blue-50 border-blue-100">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-blue-800 font-medium">Total Exposure</p>
                            <h3 className="text-2xl font-bold text-blue-900">${activeExposure.toLocaleString()}</h3>
                        </div>
                    </div>
                </Card>

                <Card className="bg-yellow-50 border-yellow-100">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-yellow-800 font-medium">Defaulted Loans</p>
                            <h3 className="text-2xl font-bold text-yellow-900">{defaultedLoans}</h3>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Risk Table */}
            <h2 className="text-lg font-bold text-text-main mt-8">Recent Application Risk Scores</h2>
            <Card className="overflow-hidden p-0">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-text-muted font-medium border-b border-gray-100">
                        <tr>
                            <th className="p-4">Applicant</th>
                            <th className="p-4">Amount</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Score</th>
                            <th className="p-4">Risk Rating</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loans.slice(0, 10).map(loan => {
                            const { score, rating } = calculateRiskScore(loan);
                            return (
                                <tr key={loan.id} className="hover:bg-gray-50">
                                    <td className="p-4 font-medium text-text-main">{loan.applicantName}</td>
                                    <td className="p-4">${loan.amount.toLocaleString()}</td>
                                    <td className="p-4">{loan.status}</td>
                                    <td className="p-4 font-bold">{score}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold
                         ${rating === 'LOW' ? 'bg-green-100 text-green-800' :
                                                rating === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                            {rating}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};
