// Mock data for Admin Dashboard

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'APPLICANT' | 'LOAN_OFFICER' | 'RISK_ANALYST';
  status: 'Active' | 'Inactive';
}

export interface MockLoan {
  id: string;
  userName: string;
  creditScore: number;
  amount: number;
  status: 'APPLIED' | 'APPROVED' | 'ACTIVE' | 'REJECTED' | 'DEFAULTED' | 'CLOSED';
}

export interface MockAuditLog {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: string;
  action: string;
  details: string;
}

export const mockUsers: MockUser[] = [
  {
    id: '1',
    name: 'spoo',
    email: 'shifahshifali77@gmail.com',
    role: 'ADMIN',
    status: 'Active',
  },
  {
    id: '2',
    name: 'David Default',
    email: 'david@test.com',
    role: 'APPLICANT',
    status: 'Active',
  },
  {
    id: '3',
    name: 'Charlie Applicant',
    email: 'charlie@test.com',
    role: 'APPLICANT',
    status: 'Active',
  },
  {
    id: '4',
    name: 'Bob Applicant',
    email: 'bob@test.com',
    role: 'APPLICANT',
    status: 'Active',
  },
  {
    id: '5',
    name: 'Alice Applicant',
    email: 'alice@test.com',
    role: 'APPLICANT',
    status: 'Active',
  },
  {
    id: '6',
    name: 'Risk Analyst',
    email: 'analyst@fintech.com',
    role: 'RISK_ANALYST',
    status: 'Active',
  },
];

export const mockLoans: MockLoan[] = [
  {
    id: '1',
    userName: 'Alice Applicant',
    creditScore: 750,
    amount: 5000,
    status: 'ACTIVE',
  },
  {
    id: '2',
    userName: 'Bob Applicant',
    creditScore: 680,
    amount: 15000,
    status: 'APPROVED',
  },
  {
    id: '3',
    userName: 'Charlie Applicant',
    creditScore: 550,
    amount: 10000,
    status: 'REJECTED',
  },
  {
    id: '4',
    userName: 'David Default',
    creditScore: 300,
    amount: 2000,
    status: 'DEFAULTED',
  },
  {
    id: '5',
    userName: 'Alice Applicant',
    creditScore: 750,
    amount: 2000,
    status: 'APPLIED',
  },
];

export const mockAuditLogs: MockAuditLog[] = [
  {
    id: '1',
    timestamp: '26/12/2025, 6:44:19 pm',
    actor: 'Admin User',
    actorRole: 'ADMIN',
    action: 'USER_CREATED',
    details: 'Created user spoo (shifahshifali77@gmail.com) as ADMIN',
  },
  {
    id: '2',
    timestamp: '26/12/2025, 6:17:25 pm',
    actor: 'Admin User',
    actorRole: 'ADMIN',
    action: 'USER_ROLE_UPDATE',
    details: 'Promoted Loan Officer to LOAN_OFFICER',
  },
  {
    id: '3',
    timestamp: '26/12/2025, 6:17:25 pm',
    actor: 'Loan Officer',
    actorRole: 'LOAN_OFFICER',
    action: 'LOAN_REJECTED',
    details: 'Rejected loan for Charlie Applicant - Low Credit Score',
  },
  {
    id: '4',
    timestamp: '26/12/2025, 6:17:25 pm',
    actor: 'Loan Officer',
    actorRole: 'LOAN_OFFICER',
    action: 'LOAN_APPROVED',
    details: 'Approved loan for Bob Applicant',
  },
];

export const mockMetrics = {
  totalLoans: 5,
  approvalRate: 20.0,
  defaultRate: 20.0,
  avgCreditScore: 516,
  recoveryRate: 0.0,
  approvals: 1,
  rejections: 1,
  activeLoans: 1,
  defaultedLoans: 1,
  closedLoans: 0,
};
