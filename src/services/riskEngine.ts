import type { LoanApplication } from '../types';

// Helper to get rules from storage
const getRules = () => {
    try {
        const stored = localStorage.getItem('risk_rules');
        return stored ? JSON.parse(stored) : null;
    } catch (e) {
        return null;
    }
};

export const calculateRiskScore = (loan: LoanApplication, rulesOverride?: any): { score: number; rating: 'LOW' | 'MEDIUM' | 'HIGH'; reason: string } => {
    // 0. FETCH DYNAMIC RULES (with defaults)
    const rules = rulesOverride || getRules() || {
        incomeWeight: 0.4,
        historyWeight: 0.3,
        minScore: 600,
        rejectUnemployed: false,
        rejectHighDebt: false
    };

    // --- CHECK POLICY KNOCKOUTS FIRST (Hard Rules) ---
    if (rules.rejectUnemployed && loan.employmentType === 'UNEMPLOYED') {
        return { score: 300, rating: 'HIGH', reason: 'Auto-Rejected: Employment Policy Violation' };
    }

    const emiCheck = loan.amount / loan.tenureMonths;
    const dtiCheck = (loan.existingDebts + emiCheck) / loan.monthlyIncome;

    if (rules.rejectHighDebt && dtiCheck > 0.6) {
        return { score: 300, rating: 'HIGH', reason: 'Auto-Rejected: Debt Ratio Policy Violation' };
    }
    // ------------------------------------------------

    // If no knockouts, proceed with Weighted Score Calculation
    let score = 700; // Base Score
    let reason = 'Standard Base Score';

    // 1. Income / DTI Logic
    const dtiMultiplier = rules.incomeWeight * 2.5;

    if (dtiCheck > 0.6) {
        score -= (150 * dtiMultiplier);
        reason = 'High Debt-to-Income Ratio';
    } else if (dtiCheck > 0.4) {
        score -= (50 * dtiMultiplier);
    } else {
        score += 50;
    }

    // 2. Employment Logic
    const empMultiplier = rules.historyWeight * 3;

    if (loan.employmentType === 'UNEMPLOYED') {
        score -= (200 * empMultiplier);
        reason = 'Unstable Employment';
    } else if (loan.employmentType === 'SELF_EMPLOYED') {
        score -= (20 * empMultiplier);
    } else {
        score += 30;
    }

    // 3. Loan Amount Logic
    if (loan.amount > 50000) {
        score -= 50;
    }

    // Determine Rating
    const finalScore = Math.max(300, Math.min(900, Math.round(score)));

    let rating: 'LOW' | 'MEDIUM' | 'HIGH';
    if (finalScore >= (rules.minScore + 100)) rating = 'LOW';
    else if (finalScore >= rules.minScore) rating = 'MEDIUM';
    else rating = 'HIGH';

    return { score: finalScore, rating, reason };
};

export const autoDecide = (score: number): 'APPROVE' | 'REJECT' | 'REVIEW' => {
    const rules = getRules() || { minScore: 600 };

    if (score >= (rules.minScore + 150)) return 'APPROVE';
    if (score < rules.minScore) return 'REJECT';
    return 'REVIEW';
};
