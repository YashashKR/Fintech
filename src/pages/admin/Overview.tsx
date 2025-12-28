import React from 'react';
import { TrendingUp, Users, AlertCircle, CheckCircle, Award } from 'lucide-react';
import { StatCard } from '../../components/admin/StatCard';
import { BarChart } from '../../components/admin/charts/BarChart';
import { DonutChart } from '../../components/admin/charts/DonutChart';
import { mockMetrics } from '../../data/adminMockData';

export const Overview: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
                <div className="flex gap-2">
                    <select className="bg-slate-800 border border-slate-700 text-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>This Year</option>
                    </select>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <StatCard
                    title="Total Loans"
                    value={mockMetrics.totalLoans.toLocaleString()}
                    subtitle="+12% from last month"
                    icon={TrendingUp}
                    iconColor="text-blue-400"
                    iconBgColor="bg-blue-500/10"
                />
                <StatCard
                    title="Approval Rate"
                    value={`${mockMetrics.approvalRate}%`}
                    subtitle="+2.4% from last month"
                    icon={CheckCircle}
                    iconColor="text-green-400"
                    iconBgColor="bg-green-500/10"
                />
                <StatCard
                    title="Default Rate"
                    value={`${mockMetrics.defaultRate}%`}
                    subtitle="-0.5% from last month"
                    icon={AlertCircle}
                    iconColor="text-red-400"
                    iconBgColor="bg-red-500/10"
                />
                <StatCard
                    title="Avg Credit Score"
                    value={mockMetrics.avgCreditScore.toString()}
                    subtitle="+5 points from last month"
                    icon={Award}
                    iconColor="text-purple-400"
                    iconBgColor="bg-purple-500/10"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart */}
                <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">Approvals vs Rejections</h3>
                        <button className="text-sm text-blue-400 hover:text-blue-300">View Report</button>
                    </div>
                    <div className="h-64 flex items-end gap-4">
                        <BarChart
                            height={220}
                            data={[
                                { label: 'Jan', value: 65, color: '#3B82F6' },
                                { label: 'Feb', value: 45, color: '#3B82F6' },
                                { label: 'Mar', value: 75, color: '#3B82F6' },
                                { label: 'Apr', value: 55, color: '#3B82F6' },
                                { label: 'May', value: 85, color: '#3B82F6' },
                                { label: 'Jun', value: 70, color: '#3B82F6' },
                            ]}
                        />
                    </div>
                </div>

                {/* Side Chart */}
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Portfolio Health</h3>
                    <div className="flex flex-col items-center justify-center h-64">
                        <DonutChart
                            data={[
                                { label: 'Active', value: 65, color: '#10B981' },
                                { label: 'Defaulted', value: 15, color: '#EF4444' },
                                { label: 'Closed', value: 20, color: '#64748B' },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
