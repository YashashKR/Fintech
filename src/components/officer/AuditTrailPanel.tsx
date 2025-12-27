import React from 'react';
import { useData } from '../../contexts/DataContext';
import { Clock } from 'lucide-react';

export const AuditTrailPanel: React.FC = () => {
    const { logs } = useData();
    // In a real app we might filter by the officer's ID or relevant events.
    // For this simulation, we show all logs to simulate a shared dashboard or system view.
    const officerLogs = logs;

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden h-96 flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-500" />
                <h3 className="font-bold text-gray-700">Audit Trail</h3>
            </div>

            <div className="overflow-y-auto p-0">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-medium sticky top-0">
                        <tr>
                            <th className="px-6 py-3">Time</th>
                            <th className="px-6 py-3">Action</th>
                            <th className="px-6 py-3">Details</th>
                            <th className="px-6 py-3">User</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {officerLogs.map(log => (
                            <tr key={log.id} className="hover:bg-gray-50/50">
                                <td className="px-6 py-3 text-gray-500 whitespace-nowrap">
                                    {new Date(log.timestamp).toLocaleString()}
                                </td>
                                <td className="px-6 py-3 font-medium text-gray-900">
                                    {log.action}
                                </td>
                                <td className="px-6 py-3 text-gray-600">
                                    {log.details}
                                </td>
                                <td className="px-6 py-3 text-gray-500">
                                    {log.performedBy}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {officerLogs.length === 0 && (
                    <div className="text-center py-12 text-gray-400">No activity recorded.</div>
                )}
            </div>
        </div>
    );
};
