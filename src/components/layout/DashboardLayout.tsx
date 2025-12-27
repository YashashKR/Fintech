import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Navbar } from './Navbar';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutDashboard, FileText, Settings, ShieldAlert, CreditCard, Users } from 'lucide-react';

export const DashboardLayout: React.FC = () => {
    const { user } = useAuth();

    const getLinks = () => {
        switch (user?.role) {
            case 'APPLICANT':
                return [
                    { to: '/applicant/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                    { to: '/applicant/apply', icon: FileText, label: 'Apply for Loan' },
                    { to: '/applicant/profile', icon: Settings, label: 'Profile' },
                ];
            case 'LOAN_OFFICER':
                return [
                    { to: '/officer/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                    { to: '/officer/applications', icon: FileText, label: 'Applications' },
                ];
            case 'RISK_ANALYST':
                return [
                    { to: '/risk/dashboard', icon: ShieldAlert, label: 'Risk Analysis' },
                    { to: '/risk/rules', icon: Settings, label: 'Scoring Rules' },
                ];
            case 'ADMIN':
                return [
                    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Overview' },
                    { to: '/admin/users', icon: Users, label: 'Users' },
                    { to: '/admin/loans', icon: CreditCard, label: 'All Loans' },
                ];
            default:
                return [];
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 gap-8">
                {/* Sidebar */}
                <aside className="w-64 flex-shrink-0 hidden md:block">
                    <nav className="space-y-1 sticky top-8">
                        {getLinks().map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) => `
                    flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors
                    ${isActive
                                        ? 'bg-primary text-white shadow-clean'
                                        : 'text-text-muted hover:bg-white hover:text-primary'}
                 `}
                            >
                                <link.icon className="mr-3 h-5 w-5" />
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
