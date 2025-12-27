import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Navbar } from './Navbar';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutDashboard, FileText, Settings, ShieldAlert, CreditCard, Users } from 'lucide-react';

export const LoanOfficerLayout: React.FC = () => {
    const { user } = useAuth();
    const [isCollapsed, setIsCollapsed] = React.useState(true);

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

            <div className={`flex flex-1 max-w-[98%] mx-auto w-full px-2 py-6 gap-4 transition-all duration-300`}>
                {/* Sidebar */}
                <aside
                    className={`flex-shrink-0 hidden md:flex flex-col transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'
                        }`}
                    onMouseEnter={() => setIsCollapsed(false)}
                    onMouseLeave={() => setIsCollapsed(true)}
                >
                    <nav className="space-y-2 sticky top-8 flex-1">
                        <div className={`flex items-center justify-between mb-6 px-4 ${isCollapsed ? 'justify-center' : ''}`}>
                            {!isCollapsed && (
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 whitespace-nowrap overflow-hidden">
                                    Main Menu
                                </p>
                            )}
                        </div>

                        {getLinks().map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                title={isCollapsed ? link.label : undefined}
                                className={({ isActive }) => `
                                    flex items-center ${isCollapsed ? 'justify-center px-2' : 'px-4'} py-3 text-sm font-medium rounded-md transition-all duration-200
                                    ${isActive
                                        ? 'bg-primary text-white shadow-clean'
                                        : 'text-text-muted hover:bg-white hover:text-primary'}
                                `}
                            >
                                <link.icon className={`${isCollapsed ? 'h-6 w-6' : 'mr-3 h-5 w-5'} transition-all`} />
                                {!isCollapsed && <span className="whitespace-nowrap overflow-hidden">{link.label}</span>}
                            </NavLink>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0 transition-all duration-300">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
