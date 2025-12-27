import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Navbar } from './Navbar';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutDashboard, FileText, Settings, ShieldAlert, CreditCard, Users, ShieldCheck } from 'lucide-react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';
import { LoanOfficerLayout } from './LoanOfficerLayout';

export const DashboardLayout: React.FC = () => {
    const { user } = useAuth();

    if (user?.role === 'LOAN_OFFICER') {
        return <LoanOfficerLayout />;
    }

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
                <aside className="w-72 flex-shrink-0 hidden md:block">
                    <nav className="space-y-2 sticky top-8">
                        <div className="px-4 mb-6">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Main Menu</p>
                        </div>
                        {getLinks().map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) => cn(
                                    "group flex items-center px-4 py-3.5 text-sm font-semibold rounded-2xl transition-all duration-300",
                                    isActive
                                        ? "bg-white text-primary shadow-[0_10px_20px_-5px_rgba(37,99,235,0.15)] ring-1 ring-slate-200"
                                        : "text-slate-500 hover:bg-white/60 hover:text-primary"
                                )}
                            >
                                {({ isActive }) => (
                                    <>
                                        <div className={cn(
                                            "mr-3 flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300",
                                            isActive
                                                ? "bg-primary text-white shadow-lg shadow-primary/20 scale-110"
                                                : "bg-slate-50 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary group-hover:scale-110"
                                        )}>
                                            <link.icon className="h-5 w-5" />
                                        </div>
                                        <span className="flex-1">{link.label}</span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="active-indicator"
                                                className="h-1.5 w-1.5 rounded-full bg-primary"
                                            />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}

                        <div className="mt-10 px-4 pt-10 border-t border-slate-100">
                            <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-xl relative overflow-hidden">
                                <div className="absolute -top-4 -right-4 h-16 w-16 bg-white/5 rounded-full blur-xl" />
                                <ShieldCheck className="text-emerald-400 mb-3" size={24} />
                                <p className="text-white font-bold text-sm mb-1">Premium Support</p>
                                <p className="text-slate-400 text-[10px] mb-4">Get 24/7 dedicated assistance for your applications.</p>
                                <button className="w-full bg-primary py-2 rounded-xl text-xs font-bold text-white hover:bg-primary-hover transition-colors">
                                    Upgrade Now
                                </button>
                            </div>
                        </div>
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
