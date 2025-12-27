import React from 'react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Users, FileText, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
    const { loans } = useData();
    const { availableUsers } = useAuth();

    const totalUsers = availableUsers.length;
    const totalLoans = loans.length;
    const systemHealth = 'GOOD'; // Mock health

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-text-main">System Administration</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="items-center flex gap-4">
                    <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full"><Users size={24} /></div>
                    <div>
                        <p className="text-sm text-text-muted">Total Users</p>
                        <h3 className="text-2xl font-bold">{totalUsers}</h3>
                    </div>
                </Card>
                <Card className="items-center flex gap-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-full"><FileText size={24} /></div>
                    <div>
                        <p className="text-sm text-text-muted">Total Applications</p>
                        <h3 className="text-2xl font-bold">{totalLoans}</h3>
                    </div>
                </Card>
                <Card className="items-center flex gap-4">
                    <div className="p-3 bg-green-100 text-green-600 rounded-full"><Activity size={24} /></div>
                    <div>
                        <p className="text-sm text-text-muted">System Status</p>
                        <h3 className="text-2xl font-bold text-green-700">{systemHealth}</h3>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="User Management">
                    <ul className="divide-y divide-gray-100">
                        {availableUsers.map(u => (
                            <li key={u.id} className="py-3 flex justify-between items-center">
                                <div>
                                    <p className="font-medium text-text-main">{u.name}</p>
                                    <p className="text-xs text-text-muted">{u.role}</p>
                                </div>
                                <Button variant="outline" size="sm">Edit</Button>
                            </li>
                        ))}
                    </ul>
                </Card>

                <Card title="Recent Audits">
                    <div className="text-center py-8 text-text-muted">
                        <p>Audit logs will appear here.</p>
                        <Link to="/admin/logs" className="text-primary hover:underline text-sm mt-2 inline-block">View Full Logs</Link>
                    </div>
                </Card>
            </div>
        </div>
    );
};
