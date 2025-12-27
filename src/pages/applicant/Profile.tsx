import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    DollarSign,
    Calendar,
    CheckCircle2,
    Loader2,
    ShieldCheck
} from 'lucide-react';
import { FadeInSection } from '../../components/ui/animations/FadeInSection';
import { SpotlightCard } from '../../components/ui/animations/SpotlightCard';
import { cn } from '../../utils/cn';

/**
 * Profile.tsx
 * 
 * Enhanced Applicant Profile Page with modern Fintech aesthetics.
 */

export const ApplicantProfile: React.FC = () => {
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: '+1 (555) 000-0000',
        address: '123 Finance Street, Wealth City, NY 10001',
        income: '85000',
        employment: 'Senior Software Engineer',
        employer: 'Tech Corp Inc.',
        employmentType: 'SALARIED'
    });

    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';

        if (!formData.phone) newErrors.phone = 'Phone is required';
        if (!formData.income || isNaN(Number(formData.income))) newErrors.income = 'Valid income is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSaving(false);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="relative min-h-screen space-y-8 pb-20">
            {/* Premium Background Decoration */}
            <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
                <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
                <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[120px]" />
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#2563EB 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
            </div>

            {/* HERO SECTION */}
            <FadeInSection direction="down">
                <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-xl ring-1 ring-slate-200/50">
                    <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-primary/10 to-transparent" />
                    <div className="flex flex-col items-center gap-6 md:flex-row">
                        <div className="relative">
                            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-primary-hover text-3xl font-bold text-white shadow-lg ring-4 ring-primary/20 transition-transform hover:scale-105">
                                {getInitials(formData.name)}
                            </div>
                            <div className="absolute -bottom-1 -right-1 rounded-full bg-emerald-500 p-1.5 text-white ring-4 ring-white">
                                <ShieldCheck size={16} />
                            </div>
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{formData.name}</h1>
                            <div className="mt-2 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                                <span className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                                    <Calendar size={12} /> Joined {new Date(user?.createdAt ?? Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                </span>
                                <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary ring-1 ring-primary/20">
                                    Verified Applicant
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </FadeInSection>

            <form onSubmit={handleSave} className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="space-y-8">
                    <FadeInSection delay={0.1} direction="left">
                        <SpotlightCard className="bg-white" spotlightColor="rgba(37, 99, 235, 0.05)">
                            <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
                                <div className="rounded-xl bg-primary/10 p-2 text-primary">
                                    <User size={20} />
                                </div>
                                <h2 className="text-xl font-bold text-slate-800">Personal Information</h2>
                            </div>

                            <div className="space-y-6">
                                <InputField
                                    label="Full Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    error={errors.name}
                                    icon={<User size={18} />}
                                />
                                <InputField
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    error={errors.email}
                                    icon={<Mail size={18} />}
                                />
                                <InputField
                                    label="Phone Number"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    error={errors.phone}
                                    icon={<Phone size={18} />}
                                />
                                <InputField
                                    label="Current Address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    icon={<MapPin size={18} />}
                                />
                            </div>
                        </SpotlightCard>
                    </FadeInSection>
                </div>

                <div className="space-y-8">
                    <FadeInSection delay={0.2} direction="right">
                        <SpotlightCard className="bg-white" spotlightColor="rgba(16, 185, 129, 0.05)">
                            <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
                                <div className="rounded-xl bg-emerald-100 p-2 text-emerald-600">
                                    <Briefcase size={20} />
                                </div>
                                <h2 className="text-xl font-bold text-slate-800">Professional Details</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Employment Type</label>
                                    <div className="relative">
                                        <select
                                            name="employmentType"
                                            value={formData.employmentType}
                                            onChange={handleInputChange}
                                            className="w-full appearance-none rounded-xl border-slate-200 bg-slate-50/50 py-3 pl-10 pr-4 font-medium text-slate-700 outline-none ring-2 ring-transparent transition-all focus:border-emerald-500 focus:ring-emerald-500/10"
                                        >
                                            <option value="SALARIED">Salaried Employee</option>
                                            <option value="SELF_EMPLOYED">Self Employed / Business</option>
                                            <option value="UNEMPLOYED">Unemployed</option>
                                        </select>
                                        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                            <Briefcase size={18} />
                                        </div>
                                    </div>
                                </div>

                                <InputField
                                    label="Job Title"
                                    name="employment"
                                    value={formData.employment}
                                    onChange={handleInputChange}
                                    icon={<Briefcase size={18} />}
                                />
                                <InputField
                                    label="Current Employer"
                                    name="employer"
                                    value={formData.employer}
                                    onChange={handleInputChange}
                                    icon={<MapPin size={18} />}
                                />
                                <InputField
                                    label="Annual Gross Income ($)"
                                    name="income"
                                    type="number"
                                    value={formData.income}
                                    onChange={handleInputChange}
                                    error={errors.income}
                                    icon={<DollarSign size={18} />}
                                />
                            </div>
                        </SpotlightCard>
                    </FadeInSection>

                    <FadeInSection delay={0.3}>
                        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                            <p className="max-w-xs text-xs text-slate-500">
                                Your data is protected by bank-level encryption and will only be used for loan assessment.
                            </p>
                            <button
                                type="submit"
                                disabled={isSaving}
                                className={cn(
                                    "relative flex min-w-[200px] items-center justify-center gap-2 overflow-hidden rounded-2xl px-8 py-4 font-bold text-white transition-all",
                                    isSaving ? "bg-slate-400 cursor-not-allowed" : "bg-primary hover:bg-primary-hover shadow-lg hover:shadow-primary/30",
                                    isSaved && "bg-emerald-600 shadow-emerald-500/20"
                                )}
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        <span>Saving...</span>
                                    </>
                                ) : isSaved ? (
                                    <>
                                        <CheckCircle2 size={20} />
                                        <span>Changes Saved!</span>
                                    </>
                                ) : (
                                    <span>Save Changes</span>
                                )}
                            </button>
                        </div>
                    </FadeInSection>
                </div>
            </form>
        </div>
    );
};

interface InputFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    type?: string;
    icon?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, value, onChange, error, type = 'text', icon }) => {
    return (
        <div className="group space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 group-focus-within:text-primary transition-colors">
                {label}
            </label>
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={cn(
                        "w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pr-4 font-medium text-slate-700 outline-none ring-2 ring-transparent transition-all",
                        icon ? "pl-10" : "pl-4",
                        error ? "border-red-300 ring-red-500/10" : "focus:border-primary focus:ring-primary/10",
                        "placeholder:text-slate-300"
                    )}
                />
            </div>
            {error && <p className="text-xs font-medium text-red-500">{error}</p>}
        </div>
    );
};
