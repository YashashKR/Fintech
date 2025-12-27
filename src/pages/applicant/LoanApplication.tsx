import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Save } from 'lucide-react';
// import type { EmploymentType } from '../../types';
type EmploymentType = 'SALARIED' | 'SELF_EMPLOYED' | 'UNEMPLOYED';

export const LoanApplicationForm: React.FC = () => {
    const navigate = useNavigate();
    const { applyForLoan } = useData();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [formData, setFormData] = useState({
        amount: 5000,
        tenureMonths: 12,
        purpose: '',
        employmentType: 'SALARIED' as EmploymentType,
        monthlyIncome: 0,
        monthlyExpenses: 0,
        existingDebts: 0,
    });

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (formData.amount <= 0) newErrors.amount = "Amount must be positive";
        if (formData.tenureMonths < 3) newErrors.tenureMonths = "Minimum tenure is 3 months";
        if (formData.monthlyIncome <= 0) newErrors.monthlyIncome = "Income is required";
        if (!formData.purpose) newErrors.purpose = "Purpose is required";

        // Rule: Loan <= 40% of annual income? Or check against monthly?
        // User constraint: "Loan <= 40% of annual income"
        const annualIncome = formData.monthlyIncome * 12;
        if (formData.amount > annualIncome * 0.40) {
            newErrors.amount = `Loan exceeds 40% of annual income limit (${(annualIncome * 0.40).toFixed(0)})`;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        // Simulate API call
        setTimeout(async () => {
            await applyForLoan(formData);
            setLoading(false);
            navigate('/applicant/dashboard');
        }, 1000);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
                    <ArrowLeft size={16} className="mr-2" /> Back
                </Button>
                <h1 className="text-2xl font-bold text-text-main">New Loan Application</h1>
            </div>

            <form onSubmit={handleSubmit}>
                <Card title="Loan Details">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Loan Amount ($)"
                            type="number"
                            value={formData.amount}
                            onChange={e => setFormData({ ...formData, amount: Number(e.target.value) })}
                            error={errors.amount}
                        />
                        <Input
                            label="Tenure (Months)"
                            type="number"
                            value={formData.tenureMonths}
                            onChange={e => setFormData({ ...formData, tenureMonths: Number(e.target.value) })}
                            error={errors.tenureMonths}
                        />
                        <Input
                            label="Purpose"
                            className="md:col-span-2"
                            value={formData.purpose}
                            onChange={e => setFormData({ ...formData, purpose: e.target.value })}
                            error={errors.purpose}
                            placeholder="e.g., Home Renovation, Education"
                        />
                    </div>
                </Card>

                <Card title="Financial Profile" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Select
                            label="Employment Type"
                            options={[
                                { value: 'SALARIED', label: 'Salaried' },
                                { value: 'SELF_EMPLOYED', label: 'Self Employed' },
                                { value: 'UNEMPLOYED', label: 'Unemployed' },
                            ]}
                            value={formData.employmentType}
                            onChange={e => setFormData({ ...formData, employmentType: e.target.value as EmploymentType })}
                        />
                        <Input
                            label="Monthly Income ($)"
                            type="number"
                            value={formData.monthlyIncome}
                            onChange={e => setFormData({ ...formData, monthlyIncome: Number(e.target.value) })}
                            error={errors.monthlyIncome}
                        />
                        <Input
                            label="Monthly Expenses ($)"
                            type="number"
                            value={formData.monthlyExpenses}
                            onChange={e => setFormData({ ...formData, monthlyExpenses: Number(e.target.value) })}
                        />
                        <Input
                            label="Existing Debts ($)"
                            type="number"
                            value={formData.existingDebts}
                            onChange={e => setFormData({ ...formData, existingDebts: Number(e.target.value) })}
                        />
                    </div>
                </Card>

                <div className="mt-6 flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
                    <Button type="submit" isLoading={loading}>
                        <Save size={16} className="mr-2" /> Submit Application
                    </Button>
                </div>
            </form>
        </div>
    );
};
