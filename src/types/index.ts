export type Role = 'APPLICANT' | 'LOAN_OFFICER' | 'RISK_ANALYST' | 'ADMIN';

export type User = {
    id: string;
    name: string;
    email: string;
    role: Role;
    avatarUrl?: string;
    createdAt: string;
};

export type LoanStatus =
    | 'APPLIED'
    | 'UNDER_REVIEW'
    | 'INFO_REQUESTED'
    | 'RISK_REVIEW'
    | 'APPROVED'
    | 'REJECTED'
    | 'ACTIVE'
    | 'CLOSED'
    | 'DEFAULTED';

export type EmploymentType = 'SALARIED' | 'SELF_EMPLOYED' | 'UNEMPLOYED';

export type LoanApplication = {
    id: string;
    applicantId: string;
    applicantName: string;
    amount: number;
    tenureMonths: number;
    purpose: string;
    status: LoanStatus;

    // Financial Details
    employmentType: EmploymentType;
    monthlyIncome: number;
    monthlyExpenses: number;
    existingDebts: number;

    // Risk & Audit
    creditScore?: number;
    riskRating?: 'LOW' | 'MEDIUM' | 'HIGH';
    rejectionReason?: string;

    submittedAt: string;
    updatedAt: string;
};

export type RepaymentSchedule = {
    id: string;
    loanId: string;
    dueDate: string;
    amount: number; // EMI
    status: 'PENDING' | 'PAID' | 'OVERDUE' | 'PARTIAL';
    paidAmount: number;
    paidAt?: string;
};

export type AuditLog = {
    id: string;
    action: string;
    performedBy: string; // User ID
    targetId?: string; // Loan ID or User ID
    details: string;
    timestamp: string;
};
