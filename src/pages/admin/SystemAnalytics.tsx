import React from 'react';
import { Download, TrendingUp, AlertTriangle, RefreshCw } from 'lucide-react';
import { BarChart } from '../../components/admin/charts/BarChart';
import { mockMetrics } from '../../data/adminMockData';

export const SystemAnalytics: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-white">System Analytics</h2>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors w-full sm:w-auto justify-center">
                    <Download size={18} />
                    <span>Export CSV</span>
                </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-slate-400 text-sm font-medium">Approval Rate</h3>
                        <TrendingUp className="text-blue-400" size={20} />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{mockMetrics.approvalRate}%</div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${mockMetrics.approvalRate}%` }}
                        />
                    </div>
                </div>

                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-slate-400 text-sm font-medium">Default Rate</h3>
                        <AlertTriangle className="text-red-400" size={20} />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{mockMetrics.defaultRate}%</div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                            className="bg-red-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${mockMetrics.defaultRate}%` }}
                        />
                    </div>
                </div>

                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-slate-400 text-sm font-medium">Recovery Rate</h3>
                        <RefreshCw className="text-green-400" size={20} />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">68.5%</div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: '68.5%' }}
                        />
                    </div>
                </div>
            </div>

            {/* Performance Chart */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Performance Metrics</h3>
                <div className="h-80 flex items-end gap-4 sm:gap-8">
                    <BarChart
                        data={[
                            { label: 'Q1', value: 85, color: '#3B82F6' },
                            { label: 'Q2', value: 92, color: '#3B82F6' },
                            { label: 'Q3', value: 78, color: '#3B82F6' },
                            { label: 'Q4', value: 95, color: '#3B82F6' },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};
