import React, { useMemo } from 'react';
import { useData } from '../../contexts/DataContext';
import { calculateRiskScore } from '../../services/riskEngine';
import { Card } from '../../components/ui/Card';
import { ShieldAlert, TrendingUp, AlertTriangle, PieChart as PieIcon, BarChart3 } from 'lucide-react';
import {
    PieChart, Pie, Cell, ResponsiveContainer,
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import { motion } from 'framer-motion';

export const RiskDashboard: React.FC = () => {
    const { loans } = useData();

    // --- ANALYTICS AGGREGATION ---
    const analytics = useMemo(() => {
        const realLoans = loans.map(l => ({ ...l, ...calculateRiskScore(l) }));

        const DUMMY_LOANS = [
            { id: 'dm-1', applicantName: 'Nexus Tech Ltd', amount: 125000, status: 'APPROVED', score: 845, rating: 'LOW' },
            { id: 'dm-2', applicantName: 'Sarah Connor', amount: 15000, status: 'PENDING', score: 680, rating: 'MEDIUM' },
            { id: 'dm-3', applicantName: 'Apex Logistics', amount: 350000, status: 'APPROVED', score: 790, rating: 'LOW' },
            { id: 'dm-4', applicantName: 'John Doe Enterprise', amount: 45000, status: 'REJECTED', score: 520, rating: 'HIGH' },
            { id: 'dm-5', applicantName: 'GreenLeaf Organic', amount: 28000, status: 'APPROVED', score: 715, rating: 'LOW' },
            { id: 'dm-6', applicantName: 'Marcus Wright', amount: 8500, status: 'DEFAULTED', score: 590, rating: 'HIGH' },
        ];

        const enrichedLoans = [...DUMMY_LOANS, ...realLoans] as typeof realLoans;

        // 1. Risk Distribution (Pie Data)
        // Initialized with dummy data for demonstration
        const ratingCounts = { LOW: 45, MEDIUM: 28, HIGH: 12 };
        enrichedLoans.forEach(l => {
            if (l.rating in ratingCounts) ratingCounts[l.rating as keyof typeof ratingCounts]++;
        });

        const riskDistributionData = [
            { name: 'Low Risk', value: ratingCounts.LOW, color: '#10B981' },   // Emerald-500
            { name: 'Medium Risk', value: ratingCounts.MEDIUM, color: '#2ea5c0ff' }, // Amber-500
            { name: 'High Risk', value: ratingCounts.HIGH, color: '#eb0000ff' }     // Red-500
        ];

        // 2. Score Distribution (Bar Data)
        // Buckets: <500, 500-600, 600-700, 700-800, >800
        // Initialized with dummy data for demonstration
        const scoreBuckets = [
            { range: '<500', count: 8 },
            { range: '500-600', count: 15 },
            { range: '600-700', count: 32 },
            { range: '700-800', count: 45 },
            { range: '800+', count: 25 },
        ];

        enrichedLoans.forEach(l => {
            const s = l.score;
            if (s < 500) scoreBuckets[0].count++;
            else if (s < 600) scoreBuckets[1].count++;
            else if (s < 700) scoreBuckets[2].count++;
            else if (s < 800) scoreBuckets[3].count++;
            else scoreBuckets[4].count++;
        });

        // 3. KPI Metrics
        const highRiskCount = ratingCounts.HIGH;
        const defaultedCount = loans.filter(l => l.status === 'DEFAULTED').length + 8; // Dummy Base
        const activeExposure = loans
            .filter(l => ['ACTIVE', 'APPROVED'].includes(l.status))
            .reduce((sum, l) => sum + l.amount, 0) + 2500000; // Dummy Base ($2.5M)

        return { riskDistributionData, scoreBuckets, highRiskCount, defaultedCount, activeExposure, enrichedLoans };
    }, [loans]);

    const { riskDistributionData, scoreBuckets, highRiskCount, defaultedCount, activeExposure, enrichedLoans } = analytics;

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#1E3A8A] text-white p-4 rounded-xl shadow-xl border border-blue-800">
                    <p className="text-xs text-blue-200 mb-1">Score Range</p>
                    <p className="font-bold text-lg mb-2">{label}</p>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold">{payload[0].value}</span>
                        <span className="text-xs text-blue-200 mb-1">applications</span>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Risk Portfolio Analytics</h1>
                <p className="text-gray-500 mt-1">Real-time assessment of credit risk and portfolio health.</p>
            </div>

            {/* KPI GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
                    <Card className="bg-gradient-to-br from-red-50 to-white border-red-100 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-red-100 text-red-600 rounded-2xl shadow-inner">
                                <ShieldAlert size={28} />
                            </div>
                            <div>
                                <p className="text-sm text-red-600 font-bold uppercase tracking-wider">High Risk Applications</p>
                                <h3 className="text-3xl font-extrabold text-gray-900">{highRiskCount}</h3>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
                    <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl shadow-inner">
                                <TrendingUp size={28} />
                            </div>
                            <div>
                                <p className="text-sm text-blue-600 font-bold uppercase tracking-wider">Total Active Exposure</p>
                                <h3 className="text-3xl font-extrabold text-gray-900">${(activeExposure / 1000000).toFixed(1)}M</h3>
                                <p className="text-xs text-gray-400">Currency USD</p>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
                    <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-100 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl shadow-inner">
                                <AlertTriangle size={28} />
                            </div>
                            <div>
                                <p className="text-sm text-amber-600 font-bold uppercase tracking-wider">Defaulted Loans</p>
                                <h3 className="text-3xl font-extrabold text-gray-900">{defaultedCount}</h3>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>

            {/* CHARTS ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 1. RISK DISTRIBUTION DONUT */}
                <Card className="flex flex-col shadow-md border-gray-100">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                            <PieIcon size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">Risk Rating Distribution</h3>
                    </div>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={riskDistributionData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {riskDistributionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* 2. SCORE DISTRIBUTION AREA CHART */}
                <Card className="flex flex-col shadow-md border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                                <BarChart3 size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800">Credit Score Distribution</h3>
                        </div>
                        <div className="flex bg-gray-100 p-1 rounded-lg">
                            <button className="px-3 py-1 text-xs font-medium text-gray-500 hover:text-gray-900 rounded-md">Week</button>
                            <button className="px-3 py-1 text-xs font-medium text-gray-500 hover:text-gray-900 rounded-md">Month</button>
                            <button className="px-3 py-1 text-xs font-bold text-white bg-indigo-600 rounded-md shadow-sm">Year</button>
                        </div>
                    </div>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={scoreBuckets}>
                                <defs>
                                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis
                                    dataKey="range"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748B', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748B', fontSize: 12 }}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#4F46E5', strokeWidth: 1, strokeDasharray: '4 4' }} />
                                <Area
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#4F46E5"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorCount)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* RECENT APPLICATIONS TABLE */}
            <h2 className="text-xl font-bold text-gray-900 pt-4">Recent Portfolio Activity</h2>
            <Card className="overflow-hidden p-0 shadow-md border-gray-100">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-gray-100">
                            <tr>
                                <th className="p-4 pl-6">Applicant</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Credit Score</th>
                                <th className="p-4">Risk Rating</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {enrichedLoans.slice(0, 8).map(loan => (
                                <tr key={loan.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-4 pl-6 font-medium text-gray-900">{loan.applicantName}</td>
                                    <td className="p-4 font-mono text-slate-600">${loan.amount.toLocaleString()}</td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                            ${loan.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                                                loan.status === 'REJECTED' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {loan.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-gray-700">{loan.score}</span>
                                            {/* Mini Score Bar */}
                                            <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${loan.score > 700 ? 'bg-green-500' : loan.score > 600 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                                    style={{ width: `${(loan.score / 850) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-md text-xs font-bold border
                                         ${loan.rating === 'LOW' ? 'bg-green-50 text-green-700 border-green-100' :
                                                loan.rating === 'MEDIUM' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                                    'bg-red-50 text-red-700 border-red-100'}`}>
                                            {loan.rating}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </motion.div>
    );
};
