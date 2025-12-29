import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
    User,
    Mail,
    Phone,
    Briefcase,
    ShieldCheck,
    Loader2,
    CheckCircle2,
    Lock
} from 'lucide-react';
import { FadeInSection } from '../../components/ui/animations/FadeInSection';
import { SpotlightCard } from '../../components/ui/animations/SpotlightCard';
import { cn } from '../../utils/cn';

export const RiskProfile: React.FC = () => {
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: '+1 (555) 123-4567',
        role: 'Risk Analyst',
        department: 'Risk Management',
        employeeId: 'RA-2024-042',
        bio: 'Experienced Risk Analyst specialist with a focus on credit scoring models and fraud detection.'
    });

    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSaving(true);
        // Simulate API call
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
            {/* Background Decoration */}
            <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
                <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[120px]" />
                <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[120px]" />
            </div>

            {/* Header Section */}
            <FadeInSection direction="down">
                <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-xl ring-1 ring-slate-200/50">
                    <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-indigo-500/10 to-transparent" />
                    <div className="flex flex-col items-center gap-6 md:flex-row">
                        <div className="relative">
                            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 text-3xl font-bold text-white shadow-lg ring-4 ring-slate-100 transition-transform hover:scale-105">
                                {getInitials(formData.name)}
                            </div>
                            <div className="absolute -bottom-1 -right-1 rounded-full bg-indigo-500 p-1.5 text-white ring-4 ring-white">
                                <ShieldCheck size={16} />
                            </div>
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{formData.name}</h1>
                            <div className="mt-2 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                                <span className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                                    <Briefcase size={12} /> {formData.role}
                                </span>
                                <span className="flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600 ring-1 ring-indigo-100">
                                    {formData.department}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </FadeInSection>

            <form onSubmit={handleSave} className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="space-y-8">
                    <FadeInSection delay={0.1} direction="left">
                        <SpotlightCard className="bg-white" spotlightColor="rgba(99, 102, 241, 0.05)">
                            <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
                                <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600">
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
                            </div>
                        </SpotlightCard>
                    </FadeInSection>
                </div>

                <div className="space-y-8">
                    <FadeInSection delay={0.2} direction="right">
                        <SpotlightCard className="bg-white" spotlightColor="rgba(99, 102, 241, 0.05)">
                            <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
                                <div className="rounded-xl bg-slate-100 p-2 text-slate-600">
                                    <Lock size={20} />
                                </div>
                                <h2 className="text-xl font-bold text-slate-800">Employee Details</h2>
                            </div>

                            <div className="space-y-6">
                                <InputField
                                    label="Employee ID"
                                    name="employeeId"
                                    value={formData.employeeId}
                                    onChange={handleInputChange}
                                    icon={<ShieldCheck size={18} />}
                                    readOnly
                                />

                                <div className="group space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                        Bio
                                    </label>
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-4 font-medium text-slate-700 outline-none ring-2 ring-transparent transition-all focus:border-indigo-600 focus:ring-indigo-600/10 placeholder:text-slate-300 resize-none"
                                    />
                                </div>

                                <div className="rounded-xl bg-orange-50 p-4 border border-orange-100">
                                    <div className="flex gap-3">
                                        <div className="text-orange-500">
                                            <Lock size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-orange-900 text-sm">Security Note</h4>
                                            <p className="text-xs text-orange-700 mt-1">
                                                Contact IT Support to update sensitive information like department or role.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SpotlightCard>
                    </FadeInSection>

                    <FadeInSection delay={0.3}>
                        <div className="flex flex-col items-center justify-end gap-4 sm:flex-row">
                            <button
                                type="submit"
                                disabled={isSaving}
                                className={cn(
                                    "relative flex w-full sm:w-auto min-w-[200px] items-center justify-center gap-2 overflow-hidden rounded-xl px-8 py-4 font-bold text-white transition-all",
                                    isSaving ? "bg-slate-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-600/30",
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
                                    <span>Save Information</span>
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
    readOnly?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, value, onChange, error, type = 'text', icon, readOnly }) => {
    return (
        <div className="group space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                {label}
            </label>
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    readOnly={readOnly}
                    className={cn(
                        "w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pr-4 font-medium text-slate-700 outline-none ring-2 ring-transparent transition-all",
                        icon ? "pl-10" : "pl-4",
                        error ? "border-red-300 ring-red-500/10" : readOnly ? "cursor-not-allowed opacity-70" : "focus:border-indigo-600 focus:ring-indigo-600/10",
                        "placeholder:text-slate-300"
                    )}
                />
            </div>
            {error && <p className="text-xs font-medium text-red-500">{error}</p>}
        </div>
    );
};
