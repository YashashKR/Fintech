import type { LoanApplication } from '../types';

export const calculateRiskScore = (loan: LoanApplication): { score: number; rating: 'LOW' | 'MEDIUM' | 'HIGH'; reason: string } => {
    let score = 700; // Base Score
    let reason = 'Standard Base Score';

    // 1. Income to Loan Ratio Impact
    const monthlyIncome = loan.monthlyIncome;
    const emiEstimation = loan.amount / loan.tenureMonths; // Simplified EMI
    const dti = (loan.existingDebts + emiEstimation) / monthlyIncome;

    if (dti > 0.6) {
        score -= 150;
        reason = 'High Debt-to-Income Ratio';
    } else if (dti > 0.4) {
        score -= 50;
    } else {
        score += 50;
    }

    // 2. Employment Stability
    if (loan.employmentType === 'UNEMPLOYED') {
        score -= 200;
        reason = 'Unstable Employment';
    } else if (loan.employmentType === 'SELF_EMPLOYED') {
        score -= 20; // Slight risk
    } else {
        score += 30; // Salaried bonus
    }

    // 3. Loan Amount Risk
    if (loan.amount > 50000) {
        score -= 50;
    }

    // Determine Rating
    let rating: 'LOW' | 'MEDIUM' | 'HIGH';
    if (score >= 700) rating = 'LOW';
    else if (score >= 550) rating = 'MEDIUM';
    else rating = 'HIGH';

    return { score, rating, reason };
};

export const autoDecide = (score: number): 'APPROVE' | 'REJECT' | 'REVIEW' => {
    if (score >= 750) return 'APPROVE';
    if (score < 500) return 'REJECT';
    return 'REVIEW';
};
