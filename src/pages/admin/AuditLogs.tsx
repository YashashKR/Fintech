import React, { useState } from 'react';
import { Search, Clock, User, FileText, Shield } from 'lucide-react';
import { mockAuditLogs } from '../../data/adminMockData';

export const AuditLogs: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredLogs = mockAuditLogs.filter(log =>
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.actorName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getActionColor = (action: string) => {
        if (action.includes('CREATE')) return 'text-blue-400';
        if (action.includes('UPDATE')) return 'text-yellow-400';
        if (action.includes('DELETE')) return 'text-red-400';
        if (action.includes('APPROVE')) return 'text-green-400';
        if (action.includes('REJECT')) return 'text-red-400';
        return 'text-slate-400';
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-white">Audit Logs</h2>
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search logs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-700/50 text-slate-400 text-sm uppercase tracking-wider">
                                <th className="p-4 font-medium">Timestamp</th>
                                <th className="p-4 font-medium">Actor</th>
                                <th className="p-4 font-medium">Action</th>
                                <th className="p-4 font-medium">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                            {filteredLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-slate-800/50 transition-colors">
                                    <td className="p-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2 text-slate-300">
                                            <Clock size={16} className="text-slate-500" />
                                            <span className="text-sm">{new Date(log.timestamp).toLocaleString()}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs text-white">
                                                {log.actorName.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-sm text-white font-medium">{log.actorName}</div>
                                                <div className="text-xs text-slate-500">{log.actorRole}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 whitespace-nowrap">
                                        <span className={`text-sm font-medium ${getActionColor(log.action)}`}>
                                            {log.action}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className="text-sm text-slate-400">{log.details}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredLogs.length === 0 && (
                    <div className="p-8 text-center text-slate-400">
                        No logs found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
};
