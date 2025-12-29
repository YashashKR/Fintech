import React from 'react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import {
    Plus,
    ArrowRight,
    TrendingUp,
    ShieldCheck,
    Zap,
    Wallet,
    Calendar,
    Clock,
    PieChart,
    Lightbulb
} from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeInSection } from '../../components/ui/animations/FadeInSection';
import { SpotlightCard } from '../../components/ui/animations/SpotlightCard';
import { Aurora } from '../../components/ui/animations/Aurora';
import { cn } from '../../utils/cn';

/**
 * Dashboard.tsx
 * 
 * Enhanced Applicant Dashboard with modern Fintech 2025 aesthetics (Light Theme Hero).
 */

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const colors = {
        APPLIED: 'bg-blue-100/80 text-blue-800 border-blue-200',
        UNDER_REVIEW: 'bg-amber-100/80 text-amber-800 border-amber-200',
        APPROVED: 'bg-emerald-100/80 text-emerald-800 border-emerald-200',
        REJECTED: 'bg-rose-100/80 text-rose-800 border-rose-200',
        ACTIVE: 'bg-primary/10 text-primary border-primary/20',
        CLOSED: 'bg-slate-100/80 text-slate-800 border-slate-200',
        DEFAULTED: 'bg-red-200/80 text-red-900 border-red-300',
    } as Record<string, string>;

    return (
        <span className={cn(
            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-sm transition-all",
            colors[status] || 'bg-gray-100'
        )}>
            {status.replace('_', ' ')}
        </span>
    );
};

export const ApplicantDashboard: React.FC = () => {
    const { loans } = useData();
    const { user } = useAuth();

    return (
        <div className="space-y-10 pb-12">
            {/* HERO SECTION - LIGHT THEME */}
            <section className="relative overflow-hidden rounded-[2rem] bg-white px-8 py-12 text-slate-900 shadow-xl ring-1 ring-slate-200">
                <Aurora colorStops={["#e0f2fe", "#d1fae5", "#bfdbfe"]} />

                <div className="relative z-10 max-w-2xl">
                    <FadeInSection direction="left">
                        <span className="mb-2 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-primary uppercase">
                            Applicant Dashboard
                        </span>
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl text-slate-900">
                            Welcome back, <br />
                            <span className="text-blue-600">
                                {user?.name || 'Guest'}
                            </span>
                        </h1>
                        <p className="text-lg text-slate-600 font-medium opacity-90">
                            Your financial journey is moving fast. Manage your applications and track your progress in real-time.
                        </p>
                    </FadeInSection>
                </div>

                {/* Floating summary nodes - Light Version */}
                <div className="absolute top-1/2 right-12 hidden -translate-y-1/2 space-y-4 lg:block">
                    <FadeInSection delay={0.2} direction="right">
                        <div className="flex items-center gap-4 rounded-2xl bg-white/60 p-4 backdrop-blur-md border border-slate-200 shadow-sm">
                            <div className="rounded-xl bg-primary/10 p-2">
                                <ShieldCheck className="text-primary" size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">Total Credits</p>
                                <p className="text-lg font-bold text-slate-900">$0.00</p>
                            </div>
                        </div>
                    </FadeInSection>
                    <FadeInSection delay={0.3} direction="right">
                        <div className="flex items-center gap-4 rounded-2xl bg-white/60 p-4 backdrop-blur-md border border-slate-200 shadow-sm">
                            <div className="rounded-xl bg-emerald-100 p-2">
                                <TrendingUp className="text-emerald-600" size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">Active Applications</p>
                                <p className="text-lg font-bold text-slate-900">{loans.length}</p>
                            </div>
                        </div>
                    </FadeInSection>
                </div>
            </section>

            {/* QUICK ACTIONS */}
            <section>
                <FadeInSection delay={0.4}>
                    <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-800">
                        <Zap size={20} className="text-amber-500" /> Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <Link to="/applicant/apply" className="group">
                            <SpotlightCard className="h-full border-primary/20 bg-white shadow-sm ring-1 ring-slate-200 transition-all hover:ring-primary/50" spotlightColor="rgba(37, 99, 235, 0.08)">
                                <div className="mb-4 rounded-2xl bg-primary/10 p-3 text-primary transition-transform group-hover:scale-110 group-hover:rotate-3">
                                    <Plus size={32} />
                                </div>
                                <h3 className="mb-1 text-xl font-bold text-slate-900">Apply for Loan</h3>
                                <p className="text-sm text-slate-500">Fast tracking, minimal paperwork, and competitive rates.</p>
                                <div className="mt-6 flex items-center text-sm font-bold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                                    Start Now <ArrowRight size={16} className="ml-1" />
                                </div>
                            </SpotlightCard>
                        </Link>

                        <Link to="/applicant/progress" className="group">
                            <SpotlightCard className="h-full border-slate-200 bg-white shadow-sm ring-1 ring-slate-200 transition-all hover:ring-blue-500/50" spotlightColor="rgba(59, 130, 246, 0.08)">
                                <div className="mb-4 rounded-2xl bg-blue-50 p-3 text-blue-600 transition-transform group-hover:scale-110 group-hover:rotate-3">
                                    <PieChart size={32} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-slate-900">Track Progress</h3>
                                </div>
                                <p className="mt-1 text-sm text-slate-500 font-normal">Real-time milestones for your ongoing applications.</p>
                                <div className="mt-6 flex items-center text-sm font-bold text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                                    View Status <ArrowRight size={16} className="ml-1" />
                                </div>
                            </SpotlightCard>
                        </Link>

                        <Link to="/applicant/tips" className="group">
                            <SpotlightCard className="h-full border-slate-200 bg-white shadow-sm ring-1 ring-slate-200 transition-all hover:ring-emerald-500/50" spotlightColor="rgba(16, 185, 129, 0.08)">
                                <div className="mb-4 rounded-2xl bg-emerald-50 p-3 text-emerald-600 transition-transform group-hover:scale-110 group-hover:rotate-3">
                                    <Lightbulb size={32} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-slate-900">Financial Tips</h3>
                                </div>
                                <p className="mt-1 text-sm text-slate-500 font-normal">Personalized insights to boost your credit health.</p>
                                <div className="mt-6 flex items-center text-sm font-bold text-emerald-600 opacity-0 transition-opacity group-hover:opacity-100">
                                    Explore Tips <ArrowRight size={16} className="ml-1" />
                                </div>
                            </SpotlightCard>
                        </Link>
                    </div>
                </FadeInSection>
            </section>

            {/* ACTIVE LOANS */}
            <section>
                <FadeInSection delay={0.6}>
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800">
                            <Wallet size={20} className="text-primary" /> Active Applications
                        </h2>
                    </div>

                    {loans.length === 0 ? (
                        <SpotlightCard className="flex flex-col items-center justify-center border-dashed border-2 py-20 bg-slate-50/50 text-center" spotlightColor="rgba(94, 234, 212, 0.1)">
                            <div className="mb-6 relative">
                                <div className="absolute -inset-4 bg-emerald-400/20 blur-2xl rounded-full" />
                                <div className="relative rounded-full bg-emerald-100 p-6 text-emerald-600">
                                    <Calendar size={48} />
                                </div>
                            </div>
                            <h3 className="mb-2 text-2xl font-bold text-slate-900">Ready to Grow?</h3>
                            <p className="mx-auto mb-8 max-w-sm text-slate-500">
                                You haven&apos;t applied for any loans yet. Our smart vetting system can get you approved in minutes.
                            </p>
                            <Link to="/applicant/apply">
                                <button className="rounded-xl bg-blue-600 px-8 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95">
                                    Start Application
                                </button>
                            </Link>
                        </SpotlightCard>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {loans.map((loan, index) => (
                                <FadeInSection key={loan.id} delay={0.7 + index * 0.1} direction="up">
                                    <SpotlightCard className="overflow-hidden border-slate-200 bg-white p-0 shadow-lg ring-1 ring-slate-200 transition-all hover:shadow-xl" spotlightColor="rgba(37, 99, 235, 0.05)">
                                        <div className="flex flex-col">
                                            {/* Card Top */}
                                            <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between bg-slate-50/50">
                                                <div className="flex items-center gap-2">
                                                    <div className="rounded-lg bg-white p-1.5 shadow-sm ring-1 ring-slate-200">
                                                        <Wallet size={16} className="text-primary" />
                                                    </div>
                                                    <span className="text-xs font-bold text-slate-500">LOAN-{loan.id.slice(0, 8).toUpperCase()}</span>
                                                </div>
                                                <StatusBadge status={loan.status} />
                                            </div>

                                            {/* Card Body */}
                                            <div className="p-6">
                                                <div className="mb-6 grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Amount</p>
                                                        <p className="text-3xl font-extrabold text-slate-900">${loan.amount.toLocaleString()}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Monthly Tenure</p>
                                                        <p className="text-2xl font-bold text-slate-700">{loan.tenureMonths} <span className="text-xs font-medium text-slate-400">Months</span></p>
                                                    </div>
                                                </div>

                                                <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                                                    <div className="flex items-center justify-between text-xs">
                                                        <div className="flex items-center gap-1.5 text-slate-500">
                                                            <Clock size={14} />
                                                            <span>Applied on {new Date(loan.submittedAt).toLocaleDateString()}</span>
                                                        </div>
                                                        <Link
                                                            to={`/applicant/loan/${loan.id}`}
                                                            className="flex items-center font-bold text-primary hover:underline"
                                                        >
                                                            Details <ArrowRight size={12} className="ml-1" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SpotlightCard>
                                </FadeInSection>
                            ))}
                        </div>
                    )}
                </FadeInSection>
            </section>

            {/* BOTTOM DECORATION */}
            <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-[-1] h-[50vh] overflow-hidden opacity-20">
                <div className="absolute bottom-[-10%] left-[-10%] h-[120%] w-[120%] bg-gradient-to-t from-primary/20 via-transparent to-transparent blur-[100px]" />
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-primary-light to-transparent"
                />
            </div>
        </div>
    );
};
