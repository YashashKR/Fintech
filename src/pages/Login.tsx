import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ShieldCheck } from 'lucide-react';

export const Login: React.FC = () => {
    const { availableUsers, login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<string | null>(null);

    const handleLogin = (userId: string, role: string) => {
        setLoading(userId);
        // Simulate network delay for realism
        setTimeout(() => {
            login(userId);
            // Redirect based on role
            switch (role) {
                case 'APPLICANT':
                    navigate('/applicant/dashboard');
                    break;
                case 'LOAN_OFFICER':
                    navigate('/officer/dashboard');
                    break;
                case 'RISK_ANALYST':
                    navigate('/risk/dashboard');
                    break;
                case 'ADMIN':
                    navigate('/admin/dashboard');
                    break;
                default:
                    navigate('/');
            }
        }, 800);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <div className="flex flex-col items-center mb-8">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white mb-4 shadow-md">
                    <ShieldCheck size={32} />
                </div>
                <h1 className="text-3xl font-bold text-primary">FinTech Lite</h1>
                <p className="text-text-muted mt-2">Secure Micro-Lending Platform Simulation</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
                <Card title="Select a Role to Simulate" className="md:col-span-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {availableUsers.map((user) => (
                            <div
                                key={user.id}
                                className="p-4 border border-gray-200 rounded-lg hover:border-primary/50 hover:bg-blue-50/50 transition-all cursor-pointer flex items-center justify-between group"
                                onClick={() => handleLogin(user.id, user.role)}
                            >
                                <div>
                                    <h3 className="font-medium text-text-main group-hover:text-primary transition-colors">{user.name}</h3>
                                    <span className="text-xs bg-gray-100 text-text-muted px-2 py-1 rounded mt-1 inline-block uppercase tracking-wider">
                                        {user.role.replace('_', ' ')}
                                    </span>
                                </div>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="group-hover:bg-primary group-hover:text-white group-hover:border-primary"
                                    isLoading={loading === user.id}
                                >
                                    Select
                                </Button>
                            </div>
                        ))}
                    </div>
                </Card>

                <div className="md:col-span-2 text-center text-sm text-text-muted mt-8">
                    <p>
                        <strong>Note:</strong> This is a frontend-only simulation.
                        No real authentication is performed. All data is stored locally.
                    </p>
                </div>
            </div>
        </div>
    );
};
