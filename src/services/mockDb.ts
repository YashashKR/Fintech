import type { User, LoanApplication, AuditLog, RepaymentSchedule, Role } from '../types';

const STORAGE_KEYS = {
    USERS: 'fintech_sim_users',
    LOANS: 'fintech_sim_loans',
    LOGS: 'fintech_sim_logs',
    SCHEDULES: 'fintech_sim_schedules',
};

class MockDatabaseService {
    private get<T>(key: string): T[] {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }

    private set<T>(key: string, data: T[]) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    // --- Users ---
    getUsers(): User[] {
        return this.get<User>(STORAGE_KEYS.USERS);
    }

    getUserById(id: string): User | undefined {
        return this.getUsers().find(u => u.id === id);
    }

    getUserByCredentials(name: string, role: Role, password: string): User | undefined {
        return this.getUsers().find(
            u => u.name.toLowerCase() === name.toLowerCase() &&
                u.role === role &&
                u.password === password
        );
    }

    createUser(user: User): void {
        const users = this.getUsers();
        users.push(user);
        this.set(STORAGE_KEYS.USERS, users);
        this.logAction('SYSTEM', user.id, `New user registered: ${user.name}`);
    }

    // --- Loans ---
    getLoans(): LoanApplication[] {
        return this.get<LoanApplication>(STORAGE_KEYS.LOANS);
    }

    getLoanById(id: string): LoanApplication | undefined {
        return this.getLoans().find(l => l.id === id);
    }

    createLoan(loan: LoanApplication): void {
        const loans = this.getLoans();
        loans.push(loan);
        this.set(STORAGE_KEYS.LOANS, loans);
        this.logAction('SYSTEM', loan.id, `New loan application created for ${loan.amount}`);
    }

    updateLoan(id: string, updates: Partial<LoanApplication>): void {
        const loans = this.getLoans();
        const index = loans.findIndex(l => l.id === id);
        if (index !== -1) {
            loans[index] = { ...loans[index], ...updates, updatedAt: new Date().toISOString() };
            this.set(STORAGE_KEYS.LOANS, loans);
        }
    }

    // --- Logs ---
    getLogs(): AuditLog[] {
        return this.get<AuditLog>(STORAGE_KEYS.LOGS).sort((a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
    }

    logAction(userId: string, targetId: string | undefined, action: string) {
        const logs = this.getLogs();
        const newLog: AuditLog = {
            id: crypto.randomUUID(),
            action,
            performedBy: userId,
            targetId,
            details: action,
            timestamp: new Date().toISOString(),
        };
        // Prepend new log
        this.set(STORAGE_KEYS.LOGS, [newLog, ...logs]);
    }

    // --- Seed / Reset ---
    seedInitialData() {
        if (this.getUsers().length === 0) {
            const mockUsers: User[] = [
                { id: 'user_applicant', name: 'John Doe', email: 'john@example.com', password: 'password123', role: 'APPLICANT', createdAt: new Date().toISOString() },
                { id: 'user_officer', name: 'Sarah Loan', email: 'sarah@bank.com', password: 'password123', role: 'LOAN_OFFICER', createdAt: new Date().toISOString() },
                { id: 'user_risk', name: 'Mike Risk', email: 'mike@bank.com', password: 'password123', role: 'RISK_ANALYST', createdAt: new Date().toISOString() },
                { id: 'user_admin', name: 'Admin Alice', email: 'admin@bank.com', password: 'password123', role: 'ADMIN', createdAt: new Date().toISOString() },
            ];
            this.set(STORAGE_KEYS.USERS, mockUsers);
            console.log('Database Seeded with Mock Users');
        }
    }

    clearAll() {
        localStorage.clear();
    }
}

export const db = new MockDatabaseService();
