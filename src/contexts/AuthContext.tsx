import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';
import { db } from '../services/mockDb';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (userId: string) => void;
    logout: () => void;
    availableUsers: User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [availableUsers, setAvailableUsers] = useState<User[]>([]);

    useEffect(() => {
        // Seed DB on init
        db.seedInitialData();
        const users = db.getUsers();
        setAvailableUsers(users);

        // Check for existing session
        const savedUserId = localStorage.getItem('fintech_active_user');
        if (savedUserId) {
            const activeUser = users.find(u => u.id === savedUserId);
            if (activeUser) setUser(activeUser);
        }
    }, []);

    const login = (userId: string) => {
        const targetUser = availableUsers.find(u => u.id === userId);
        if (targetUser) {
            setUser(targetUser);
            localStorage.setItem('fintech_active_user', userId);
            // Log login event
            db.logAction(userId, undefined, 'User Logged In');
        }
    };

    const logout = () => {
        if (user) {
            db.logAction(user.id, undefined, 'User Logged Out');
        }
        setUser(null);
        localStorage.removeItem('fintech_active_user');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, availableUsers }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
