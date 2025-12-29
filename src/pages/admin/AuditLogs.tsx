import React, { useState } from 'react';
// Icons are no longer used in the simplified table design
import { mockAuditLogs } from '../../data/adminMockData';

export const AuditLogs: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredLogs = mockAuditLogs.filter(log => {
        // Safe access to properties
        const action = log.action || '';
        const details = log.details || '';
        const actor = log.actor || '';

        return action.toLowerCase().includes(searchTerm.toLowerCase()) ||
            details.toLowerCase().includes(searchTerm.toLowerCase()) ||
            actor.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const getActionColor = (action: string) => {
        if (action.includes('CREATE')) return 'text-blue-400';
        if (action.includes('UPDATE')) return 'text-blue-400'; // Matched screenshot blue
        if (action.includes('DELETE')) return 'text-red-400';
        if (action.includes('APPROVE')) return 'text-blue-400'; // Matched screenshot blue
        if (action.includes('REJECT')) return 'text-blue-400'; // Matched screenshot blue
        return 'text-blue-400'; // Default to blue scheme as per screenshot
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-white">System Audit Logs</h2>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative w-full sm:w-96">
                    <input
                        type="text"
                        placeholder="Search logs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#111827] border border-slate-800 text-slate-200 pl-4 pr-4 py-2.5 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 placeholder:text-slate-600 transition-all"
                    />
                </div>
            </div>

            <div className="bg-[#111827] border border-slate-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-800 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                                <th className="p-4 pl-6 font-semibold">Timestamp</th>
                                <th className="p-4 font-semibold">Actor</th>
                                <th className="p-4 font-semibold">Action</th>
                                <th className="p-4 font-semibold">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {filteredLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-slate-800/50 transition-colors group">
                                    <td className="p-4 pl-6 whitespace-nowrap">
                                        <div className="text-sm text-slate-400">{log.timestamp}</div>
                                    </td>
                                    <td className="p-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-semibold text-slate-100">{log.actor}</div>
                                            <div className="text-xs text-slate-500 uppercase">{log.actorRole}</div>
                                        </div>
                                    </td>
                                    <td className="p-4 whitespace-nowrap">
                                        <span className={`text-xs font-bold uppercase tracking-wide ${getActionColor(log.action)}`}>
                                            {log.action}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className="text-sm text-slate-300">{log.details}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredLogs.length === 0 && (
                    <div className="p-12 text-center text-slate-500">
                        No logs found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
};
