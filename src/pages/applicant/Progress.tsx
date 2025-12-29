import React from 'react';
import { motion } from 'framer-motion';
import {
    Clock,
    ArrowRight,
    ShieldCheck,
    Briefcase,
    Home,
    Car,
    CreditCard
} from 'lucide-react';
import { FadeInSection } from '../../components/ui/animations/FadeInSection';
import { SpotlightCard } from '../../components/ui/animations/SpotlightCard';
import { Aurora } from '../../components/ui/animations/Aurora';
import { cn } from '../../utils/cn';

interface Application {
    id: string;
    type: string;
    amount: number;
    date: string;
    status: 'Approved' | 'Under Review' | 'Pending' | 'Rejected';
    progress: number;
    icon: React.ElementType;
    color: string;
}

const mockApplications: Application[] = [
    {
        id: 'APP-8234',
        type: 'Personal Loan',
        amount: 5000,
        date: 'Oct 12, 2025',
        status: 'Approved',
        progress: 100,
        icon: Briefcase,
        color: 'text-emerald-500 bg-emerald-100'
    },
    {
        id: 'APP-9102',
        type: 'Home Improvement',
        amount: 15000,
        date: 'Dec 05, 2025',
        status: 'Under Review',
        progress: 65,
        icon: Home,
        color: 'text-blue-500 bg-blue-100'
    },
    {
        id: 'APP-7722',
        type: 'Auto Loan',
        amount: 22000,
        date: 'Dec 22, 2025',
        status: 'Pending',
        progress: 30,
        icon: Car,
        color: 'text-amber-500 bg-amber-100'
    }
];

const ProgressTracker: React.FC = () => {
    return (
        <div className="space-y-10 pb-12">
            {/* HERO SECTION - LIGHT THEME */}
            <section className="relative overflow-hidden rounded-[2rem] bg-white px-8 py-12 text-slate-900 shadow-xl ring-1 ring-slate-200">
                <Aurora colorStops={["#e0f2fe", "#d1fae5", "#bfdbfe"]} />

                <div className="relative z-10 max-w-2xl">
                    <FadeInSection direction="left">
                        <span className="mb-2 inline-block rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-blue-600 uppercase">
                            Status Center
                        </span>
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl text-slate-900">
                            Your Loan Progress
                        </h1>
                        <p className="text-lg text-slate-600 font-medium opacity-90">
                            Track your active applications and see exactly where you stand in the approval process.
                        </p>
                    </FadeInSection>
                </div>
            </section>

            {/* APPLICATIONS LIST */}
            <section className="space-y-6">
                <FadeInSection>
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-800">Active Applications</h2>
                        <span className="text-sm font-medium text-slate-500">{mockApplications.length} Total</span>
                    </div>
                </FadeInSection>

                <div className="grid gap-6">
                    {mockApplications.map((app, index) => (
                        <FadeInSection key={app.id} delay={index * 0.1}>
                            <SpotlightCard className="group border-slate-200 bg-white shadow-sm ring-1 ring-slate-200 transition-all hover:ring-blue-500/30" spotlightColor="rgba(59, 130, 246, 0.05)">
                                <div className="flex flex-col gap-6 md:flex-row md:items-center">
                                    {/* App Icon & Basics */}
                                    <div className="flex flex-1 items-center gap-4">
                                        <div className={cn("flex h-14 w-14 items-center justify-center rounded-2xl", app.color)}>
                                            <app.icon size={28} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900">{app.type}</h3>
                                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                                <span className="font-medium text-slate-900">${app.amount.toLocaleString()}</span>
                                                <span className="h-1 w-1 rounded-full bg-slate-300" />
                                                <span>Applied on {app.date}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress Bar Container */}
                                    <div className="flex flex-[2] flex-col gap-2">
                                        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                                            <span className={cn(
                                                app.status === 'Approved' ? 'text-emerald-600' :
                                                    app.status === 'Under Review' ? 'text-blue-600' :
                                                        app.status === 'Rejected' ? 'text-rose-600' : 'text-amber-600'
                                            )}>
                                                {app.status}
                                            </span>
                                            <span className="text-slate-400">{app.progress}% Complete</span>
                                        </div>
                                        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${app.progress}%` }}
                                                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                                className={cn(
                                                    "h-full rounded-full transition-all duration-1000",
                                                    app.status === 'Approved' ? 'bg-emerald-500' :
                                                        app.status === 'Under Review' ? 'bg-blue-500' :
                                                            app.status === 'Rejected' ? 'bg-rose-500' : 'bg-amber-500'
                                                )}
                                            />
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="flex items-center justify-end">
                                        <button className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-2 text-sm font-bold text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900">
                                            View Details <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </FadeInSection>
                    ))}
                </div>
            </section>

            {/* UP NEXT / TIPS */}
            <section className="grid gap-6 md:grid-cols-2">
                <FadeInSection delay={0.4}>
                    <SpotlightCard className="h-full border-blue-100 bg-blue-50/30" spotlightColor="rgba(59, 130, 246, 0.1)">
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                            <Clock size={20} />
                        </div>
                        <h4 className="mb-2 text-lg font-bold text-slate-900">Fast-Track Your Approval</h4>
                        <p className="mb-4 text-sm text-slate-600">Upload your latest bank statement to speed up the verification process by up to 48 hours.</p>
                        <button className="text-sm font-bold text-blue-600 hover:underline">Upload Documents →</button>
                    </SpotlightCard>
                </FadeInSection>
                <FadeInSection delay={0.5}>
                    <SpotlightCard className="h-full border-emerald-100 bg-emerald-50/30" spotlightColor="rgba(16, 185, 129, 0.1)">
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                            <ShieldCheck size={20} />
                        </div>
                        <h4 className="mb-2 text-lg font-bold text-slate-900">Security Verified</h4>
                        <p className="mb-4 text-sm text-slate-600">Your application data is protected by industry-leading 256-bit AES encryption.</p>
                        <button className="text-sm font-bold text-emerald-600 hover:underline">View Privacy Policy →</button>
                    </SpotlightCard>
                </FadeInSection>
            </section>
        </div>
    );
};

export default ProgressTracker;
