import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ShieldCheck, User as UserIcon, Lock, Mail, UserCircle, Eye, EyeOff } from 'lucide-react';
import type { Role } from '../types';

export const Login: React.FC = () => {
    const { login, register, error } = useAuth();
    const navigate = useNavigate();
    const [isRegistering, setIsRegistering] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<Role>('APPLICANT');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        let success = false;
        if (isRegistering) {
            success = await register(name, email, password, role);
        } else {
            success = await login(name, role, password);
        }

        setLoading(false);

        if (success) {
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
                    navigate('/admin/overview');
                    break;
                default:
                    navigate('/');
            }
        }
    };

    const roleOptions: { value: Role; label: string;  }[] = [
        { value: 'APPLICANT', label: 'Applicant'},
        { value: 'LOAN_OFFICER', label: 'Loan Officer'},
        { value: 'RISK_ANALYST', label: 'Risk Analyst'},
        { value: 'ADMIN', label: 'Administrator'},
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center p-4">
            <div className="flex flex-col items-center mb-8">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg transform hover:scale-105 transition-transform">
                    <ShieldCheck size={36} />
                </div>
                <h1 className="text-4xl font-bold text-blue-600">
                    FinTech Platform
                </h1>
            </div>

            <Card className="w-full max-w-md shadow-xl border-0">
                <div className="p-8">
                    {/* Toggle between Login and Register */}
                    <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
                        <button
                            type="button"
                            onClick={() => setIsRegistering(false)}
                            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${!isRegistering
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsRegistering(true)}
                            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${isRegistering
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            Register
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Enter your name"
                                />
                            </div>
                        </div>

                        {/* Email Field (only for registration) */}
                        {isRegistering && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Role Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Role
                            </label>
                            <div className="relative">
                                <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value as Role)}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white cursor-pointer"
                                >
                                    {roleOptions.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                            isLoading={loading}
                        >
                            {isRegistering ? 'Create Account' : 'Sign In'}
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    );
};
