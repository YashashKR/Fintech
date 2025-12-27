import React, { createContext, useContext, useState, useEffect } from 'react';
import type { LoanApplication, LoanStatus } from '../types';
import { db } from '../services/mockDb';
import { useAuth } from './AuthContext';

interface DataContextType {
    loans: LoanApplication[];
    applyForLoan: (data: Omit<LoanApplication, 'id' | 'status' | 'submittedAt' | 'updatedAt' | 'applicantId' | 'applicantName'>) => Promise<void>;
    updateLoanStatus: (id: string, status: LoanStatus, reason?: string) => void;
    refreshData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [loans, setLoans] = useState<LoanApplication[]>([]);

    const refreshData = () => {
        const allLoans = db.getLoans();
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

    const updateLoanStatus = (id: string, status: LoanStatus, reason?: string) => {
        const updates: Partial<LoanApplication> = { status };
        if (reason) updates.rejectionReason = reason; // Simplify for now

        db.updateLoan(id, updates);
        if (user) {
            db.logAction(user.id, id, `Updated loan status to ${status}`);
        }
        refreshData();
    };

    return (
        <DataContext.Provider value={{ loans, applyForLoan, updateLoanStatus, refreshData }}>
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
