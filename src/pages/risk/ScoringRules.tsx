// src/pages/risk/ScoringRules.tsx
import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Save, History, AlertCircle } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

// Default initial state
const DEFAULT_RULES = {
    incomeWeight: 0.4,
    historyWeight: 0.3,
    minScore: 600,
    rejectUnemployed: false,
    rejectHighDebt: false
};

export const ScoringRules: React.FC = () => {
    // 1. Get real loan data for the "Backtesting" simulation
    const { loans } = useData();

    // 2. Local State
    const [rules, setRules] = useState(DEFAULT_RULES);
    const [saved, setSaved] = useState(false);
    const [auditLog, setAuditLog] = useState<any[]>([]);
    const [impactCount, setImpactCount] = useState(0);

    // 3. Load saved rules & logs on startup
    useEffect(() => {
        const storedRules = localStorage.getItem('risk_rules');
        if (storedRules) setRules(JSON.parse(storedRules));

        const storedLogs = localStorage.getItem('risk_audit_log');
        if (storedLogs) setAuditLog(JSON.parse(storedLogs));
    }, []);

    // 4. Live Backtesting Logic (Runs whenever you move a slider)
    useEffect(() => {
        if (!loans) return;

        // Filter only currently approved loans to see if they would fail now
        const approvedLoans = loans.filter(l => l.status === 'APPROVED' || l.status === 'ACTIVE');
        let failCount = 0;

        approvedLoans.forEach(loan => {
            // Simplified calculation mirroring riskEngine.ts
            let baseScore = 700;

            // Re-calculate weights
            const emi = loan.amount / loan.tenureMonths;
            const dti = (loan.existingDebts + emi) / loan.monthlyIncome;
            const dtiMultiplier = rules.incomeWeight * 2.5;

            if (dti > 0.6) baseScore -= (150 * dtiMultiplier);
            else if (dti > 0.4) baseScore -= (50 * dtiMultiplier);
            else baseScore += 50;

            const empMultiplier = rules.historyWeight * 3;
            if (loan.employmentType === 'UNEMPLOYED') baseScore -= (200 * empMultiplier);

            // Check Hard Knockouts
            let knockout = false;
            if (rules.rejectUnemployed && loan.employmentType === 'UNEMPLOYED') knockout = true;
            if (rules.rejectHighDebt && dti > 0.6) knockout = true;

            // Did they fail?
            if (knockout || baseScore < rules.minScore) {
                failCount++;
            }
        });

        setImpactCount(failCount);
    }, [rules, loans]);

    // 5. Handle Save Button
    const handleSave = () => {
        // Save to LocalStorage
        localStorage.setItem('risk_rules', JSON.stringify(rules));

        // Add Entry to Audit Log
        const newLog = {
            id: Date.now(),
            timestamp: new Date().toLocaleString(),
            action: `Updated Rules: Min Score ${rules.minScore}, Income W: ${Math.round(rules.incomeWeight * 100)}%`,
            user: 'Risk Analyst'
        };

        const updatedLogs = [newLog, ...auditLog].slice(0, 10); // Keep last 10
        setAuditLog(updatedLogs);
        localStorage.setItem('risk_audit_log', JSON.stringify(updatedLogs));

        // Show "Saved!" animation
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="space-y-6">
            {/* MAIN CONFIGURATION CARD */}
            <Card className="mt-6">
                <div className="flex justify-between items-center mb-8 border-b pb-4">
                    <h3 className="text-xl font-bold text-text-main">Credit Scoring Configuration</h3>
                    <button
                        onClick={handleSave}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition font-medium shadow-sm
                            ${saved ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                        <Save size={18} />
                        {saved ? 'Saved!' : 'Update Rules'}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* LEFT COLUMN: SLIDERS */}
                    <div className="space-y-8">
                        <h4 className="font-semibold text-gray-700 text-lg">Scoring Weights</h4>

                        {/* Slider 1 */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <label className="font-medium text-gray-700">Income/DTI Impact</label>
                                <span className="text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded">
                                    {Math.round(rules.incomeWeight * 100)}%
                                </span>
                            </div>
                            <input
                                type="range" min="0" max="1" step="0.1"
                                value={rules.incomeWeight}
                                onChange={(e) => setRules({ ...rules, incomeWeight: parseFloat(e.target.value) })}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                        </div>

                        {/* Slider 2 */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <label className="font-medium text-gray-700">Credit History Impact</label>
                                <span className="text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded">
                                    {Math.round(rules.historyWeight * 100)}%
                                </span>
                            </div>
                            <input
                                type="range" min="0" max="1" step="0.1"
                                value={rules.historyWeight}
                                onChange={(e) => setRules({ ...rules, historyWeight: parseFloat(e.target.value) })}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                        </div>

                        {/* Min Score Input */}
                        <div className="space-y-2 pt-2">
                            <label className="font-medium text-gray-700 block">Minimum Approval Score</label>
                            <input
                                type="number"
                                value={rules.minScore}
                                onChange={(e) => setRules({ ...rules, minScore: parseInt(e.target.value) })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            />
                        </div>
                    </div>

                    {/* RIGHT COLUMN: TOGGLES & SIMULATION */}
                    <div className="space-y-8">
                        <h4 className="font-semibold text-gray-700 text-lg">Policy "Knockout" Rules</h4>

                        <div className="space-y-4">
                            <label className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition shadow-sm">
                                <input
                                    type="checkbox"
                                    checked={rules.rejectUnemployed}
                                    onChange={(e) => setRules({ ...rules, rejectUnemployed: e.target.checked })}
                                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                                />
                                <span className="font-medium text-gray-700">Auto-Reject if <strong>Unemployed</strong></span>
                            </label>

                            <label className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition shadow-sm">
                                <input
                                    type="checkbox"
                                    checked={rules.rejectHighDebt}
                                    onChange={(e) => setRules({ ...rules, rejectHighDebt: e.target.checked })}
                                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                                />
                                <span className="font-medium text-gray-700">Auto-Reject if <strong>DTI &gt; 60%</strong></span>
                            </label>
                        </div>

                        {/* LIVE BACKTESTING BOX */}
                        <div className={`p-5 rounded-xl border ${impactCount > 0 ? 'bg-green-50 border-green-200' : 'bg-green-50 border-green-200'}`}>
                            <div className="flex items-start gap-4">
                                <AlertCircle size={24} className="text-green-600 mt-1" />
                                <div>
                                    <h5 className="font-bold text-green-900">
                                        Impact Analysis (Backtesting)
                                    </h5>
                                    <p className="text-sm mt-1 text-green-800 leading-relaxed">
                                        Based on current settings, <strong className="text-black">{impactCount} active loans</strong> would be rejected if reapplied today.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* AUDIT LOG TABLE */}
            <Card>
                <div className="flex items-center gap-2 mb-4 text-gray-500 pb-2 border-b">
                    <History size={18} />
                    <h4 className="text-sm font-bold uppercase tracking-wide">Compliance Audit Log</h4>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                        <thead className="bg-gray-50 text-gray-500 uppercase font-semibold">
                            <tr>
                                <th className="p-3 pl-4 rounded-l-lg">Timestamp</th>
                                <th className="p-3">User</th>
                                <th className="p-3 pr-4 rounded-r-lg">Action Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {auditLog.length === 0 ? (
                                <tr><td colSpan={3} className="p-6 text-center text-gray-400 italic">No changes recorded yet.</td></tr>
                            ) : (
                                auditLog.map(log => (
                                    <tr key={log.id} className="hover:bg-gray-50 transition">
                                        <td className="p-3 pl-4 text-gray-500 whitespace-nowrap">{log.timestamp}</td>
                                        <td className="p-3 font-medium text-gray-900">{log.user}</td>
                                        <td className="p-3 pr-4 text-gray-600">{log.action}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};
