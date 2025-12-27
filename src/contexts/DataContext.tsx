import React, { createContext, useContext, useState, useEffect } from 'react';
import type { LoanApplication, LoanStatus, AuditLog } from '../types';
import { db } from '../services/mockDb';
import { useAuth } from './AuthContext';

interface DataContextType {
    loans: LoanApplication[];
    logs: AuditLog[];
    applyForLoan: (data: Omit<LoanApplication, 'id' | 'status' | 'submittedAt' | 'updatedAt' | 'applicantId' | 'applicantName'>) => Promise<void>;
    updateLoan: (id: string, updates: Partial<LoanApplication>, actionLog?: string) => void;
    refreshData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [loans, setLoans] = useState<LoanApplication[]>([]);
    const [logs, setLogs] = useState<AuditLog[]>([]);

    const refreshData = () => {
        const allLoans = db.getLoans();
        const allLogs = db.getLogs();
        setLogs(allLogs);

        if (user?.role === 'APPLICANT') {
            setLoans(allLoans.filter(l => l.applicantId === user.id));
        } else if (user?.role === 'LOAN_OFFICER') {
            // Officers see all non-draft/closed maybe? For now all.
            setLoans(allLoans);
        } else {
            setLoans(allLoans);
        }
    };

    useEffect(() => {
        refreshData();
    }, [user]);

    const applyForLoan = async (data: Omit<LoanApplication, 'id' | 'status' | 'submittedAt' | 'updatedAt' | 'applicantId' | 'applicantName'>) => {
        if (!user) return;

        const newLoan: LoanApplication = {
            ...data,
            id: crypto.randomUUID(),
            applicantId: user.id,
            applicantName: user.name,
            status: 'APPLIED',
            submittedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        db.createLoan(newLoan);
        refreshData();
    };

    const updateLoan = (id: string, updates: Partial<LoanApplication>, actionLog?: string) => {
        db.updateLoan(id, updates);
        if (user && actionLog) {
            db.logAction(user.id, id, actionLog);
        }
        refreshData();
    };

    return (
        <DataContext.Provider value={{ loans, logs, applyForLoan, updateLoan, refreshData }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
