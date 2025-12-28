import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Navbar } from './Navbar';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutDashboard, FileText, Settings, ShieldAlert, CreditCard, Users, ShieldCheck } from 'lucide-react';
import { cn } from '../../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import { LoanOfficerLayout } from './LoanOfficerLayout';

export const DashboardLayout: React.FC = () => {
    const { user } = useAuth();
    // Track hover state for auto-expanding sidebar
    const [isHovered, setIsHovered] = useState(false);

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
                    { to: '/admin/overview', icon: LayoutDashboard, label: 'Overview' },
                    { to: '/admin/users', icon: Users, label: 'Users' },
                    { to: '/admin/overrides', icon: CreditCard, label: 'Overrides' },
                ];
            default:
                return [];
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <div className="flex flex-1 w-full gap-0">

                {/* AUTO-EXPANDING SIDEBAR */}
                <motion.aside
                    className="flex-shrink-0 hidden md:block sticky top-0 h-[calc(100vh-64px)] z-50 bg-white border-r border-slate-100 shadow-sm"
                    initial={{ width: "80px" }}
                    animate={{ width: isHovered ? "260px" : "80px" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <nav className="h-full flex flex-col overflow-hidden py-6 px-3">

                        {/* Header Section */}
                        <div className="mb-6 px-1 h-6 flex items-center justify-center overflow-hidden">
                            <AnimatePresence mode='wait'>
                                {isHovered ? (
                                    <motion.p
                                        key="full"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 whitespace-nowrap"
                                    >
                                        Main Menu
                                    </motion.p>
                                ) : (
                                    <motion.p
                                        key="mini"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="text-xl font-bold text-slate-300"
                                    >
                                        •••
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Navigation Links */}
                        <div className="space-y-2 flex-1">
                            {getLinks().map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    className={({ isActive }) => cn(
                                        "relative group flex items-center p-3 text-sm font-semibold rounded-2xl transition-all duration-300 overflow-hidden",
                                        isActive
                                            ? "bg-primary/5 text-primary ring-1 ring-primary/10"
                                            : "text-slate-500 hover:text-primary"
                                    )}
                                >
                                    {({ isActive }) => (
                                        <>
                                            {/* Hover Slide Effect */}
                                            {!isActive && (
                                                <motion.div
                                                    className="absolute inset-0 bg-slate-50 z-0"
                                                    initial={{ x: "-100%" }}
                                                    whileHover={{ x: "0%" }}
                                                    transition={{ duration: 0.2 }}
                                                />
                                            )}

                                            {/* Icon Container */}
                                            <motion.div
                                                className={cn(
                                                    "relative z-10 flex-shrink-0 h-9 w-9 flex items-center justify-center rounded-xl transition-colors duration-300",
                                                    isActive
                                                        ? "bg-primary text-white shadow-lg shadow-primary/25"
                                                        : "bg-slate-100 text-slate-400 group-hover:bg-white group-hover:text-primary group-hover:shadow-sm"
                                                )}
                                                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                                            >
                                                <link.icon className="h-5 w-5" />
                                            </motion.div>

                                            {/* Text Label (Hidden when collapsed) */}
                                            <motion.span
                                                className="relative z-10 ml-3 whitespace-nowrap overflow-hidden"
                                                initial={{ opacity: 0, width: 0 }}
                                                animate={{
                                                    opacity: isHovered ? 1 : 0,
                                                    width: isHovered ? "auto" : 0
                                                }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                {link.label}
                                            </motion.span>

                                            {/* Active Dot (Hidden when collapsed) */}
                                            {isActive && isHovered && (
                                                <motion.div
                                                    layoutId="active-indicator"
                                                    className="relative z-10 ml-auto h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"
                                                />
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </div>

                        {/* Premium Card (Completely hidden when collapsed) */}
                        <AnimatePresence>
                            {isHovered && (
                                <motion.div
                                    className="mt-4 pt-4 border-t border-slate-100 overflow-hidden"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.div
                                        className="rounded-3xl bg-slate-900 p-4 shadow-xl relative overflow-hidden cursor-pointer group"
                                        whileHover={{ y: -4 }}
                                    >
                                        <div className="absolute -top-8 -right-8 h-24 w-24 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-colors" />

                                        <motion.div
                                            animate={{ y: [0, -4, 0] }}
                                            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                        >
                                            <ShieldCheck className="text-emerald-400 mb-2" size={24} />
                                        </motion.div>

                                        <p className="text-white font-bold text-xs mb-1">Premium Support</p>
                                        <p className="text-slate-400 text-[10px] mb-3 leading-relaxed">
                                            Get 24/7 dedicated assistance.
                                        </p>

                                        <button className="w-full bg-primary py-2 rounded-lg text-xs font-bold text-white hover:bg-primary/90 transition-colors">
                                            Upgrade Now
                                        </button>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </nav>
                </motion.aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto w-full">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
