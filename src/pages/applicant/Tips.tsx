import React from 'react';
import {
    Zap,
    TrendingUp,
    ShieldCheck,
    Wallet,
    Target,
    PieChart,
    Lightbulb,
    FileText
} from 'lucide-react';
import { FadeInSection } from '../../components/ui/animations/FadeInSection';
import { SpotlightCard } from '../../components/ui/animations/SpotlightCard';
import { Aurora } from '../../components/ui/animations/Aurora';
import { cn } from '../../utils/cn';

interface Tip {
    id: number;
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
    bgColor: string;
}

const tips: Tip[] = [
    {
        id: 1,
        title: "Improve Your Credit Score",
        description: "Consistency is key. Paying your bills on time can account for up to 35% of your credit score. Set up autopay to never miss a due date.",
        icon: TrendingUp,
        color: "text-blue-600",
        bgColor: "bg-blue-50"
    },
    {
        id: 2,
        title: "Lower Debt-to-Income Ratio",
        description: "Lenders look for a DTI under 36%. Focus on paying down high-interest credit card debt first to improve your loan eligibility.",
        icon: Wallet,
        color: "text-emerald-600",
        bgColor: "bg-emerald-50"
    },
    {
        id: 3,
        title: "Emergency Fund Buffer",
        description: "Aim for 3-6 months of expenses. Having a solid savings buffer makes you a less risky borrower in the eyes of financial institutions.",
        icon: ShieldCheck,
        color: "text-amber-600",
        bgColor: "bg-amber-50"
    },
    {
        id: 4,
        title: "Diverse Credit Mix",
        description: "A healthy mix of revolving credit and installment loans can boost your profile. Don't close old accounts as length of history matters.",
        icon: PieChart,
        color: "text-indigo-600",
        bgColor: "bg-indigo-50"
    },
    {
        id: 5,
        title: "Budget Realistic Goals",
        description: "Use the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings and debt repayment. Precision leads to faster growth.",
        icon: Target,
        color: "text-rose-600",
        bgColor: "bg-rose-50"
    },
    {
        id: 6,
        title: "Audit Your Statements",
        description: "Regularly check your monthly bank statements for subscription creep or errors. Small leaks can sink a big ship over time.",
        icon: FileText,
        color: "text-slate-600",
        bgColor: "bg-slate-50"
    }
];

const FinancialTips: React.FC = () => {
    return (
        <div className="space-y-10 pb-12">
            {/* HERO SECTION - LIGHT THEME */}
            <section className="relative overflow-hidden rounded-[2rem] bg-white px-8 py-12 text-slate-900 shadow-xl ring-1 ring-slate-200">
                <Aurora colorStops={["#e0f2fe", "#d1fae5", "#bfdbfe"]} />

                <div className="relative z-10 max-w-2xl">
                    <FadeInSection direction="left">
                        <span className="mb-2 inline-block rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-emerald-600 uppercase">
                            Knowledge Base
                        </span>
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl text-slate-900">
                            Boost Your Financial Health
                        </h1>
                        <p className="text-lg text-slate-600 font-medium opacity-90">
                            Expert-curated tips and insights designed to help you secure better rates and manage your wealth effectively.
                        </p>
                    </FadeInSection>
                </div>
            </section>

            {/* TIPS GRID */}
            <section>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {tips.map((tip, index) => (
                        <FadeInSection key={tip.id} delay={index * 0.1}>
                            <SpotlightCard
                                className="group h-full border-slate-200 bg-white transition-all hover:-translate-y-1 hover:shadow-xl hover:ring-1 hover:ring-emerald-500/20"
                                spotlightColor="rgba(16, 185, 129, 0.05)"
                            >
                                <div className={cn("mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 group-hover:rotate-3", tip.bgColor, tip.color)}>
                                    <tip.icon size={28} />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-slate-900">{tip.title}</h3>
                                <p className="text-sm leading-relaxed text-slate-600">{tip.description}</p>
                                <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-600 opacity-0 transition-opacity group-hover:opacity-100">
                                    Learn More <Zap size={14} />
                                </div>
                            </SpotlightCard>
                        </FadeInSection>
                    ))}
                </div>
            </section>

            {/* CURATED READING */}
            <FadeInSection delay={0.6}>
                <div className="rounded-[2rem] bg-emerald-600 p-8 text-white md:p-12 shadow-xl shadow-emerald-900/10">
                    <div className="flex flex-col items-center gap-8 md:flex-row">
                        <div className="flex-1 space-y-4 text-center md:text-left">
                            <h3 className="text-2xl font-bold md:text-3xl">Want a personalized financial audit?</h3>
                            <p className="text-emerald-50 opacity-90">Our AI-driven system can analyze your spending habits and provide a customized roadmap to debt-free living.</p>
                            <button className="rounded-xl bg-white px-8 py-3 font-bold text-emerald-600 shadow-lg transition-transform hover:scale-105 active:scale-95">
                                Start Your Audit
                            </button>
                        </div>
                        <div className="flex flex-1 justify-center">
                            <div className="relative">
                                <div className="absolute -inset-4 rounded-full bg-white/20 blur-2xl animate-pulse" />
                                <div className="relative rounded-3xl bg-emerald-500/50 p-6 backdrop-blur-md border border-white/20">
                                    <Lightbulb size={64} className="text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </FadeInSection>
        </div>
    );
};

export default FinancialTips;
