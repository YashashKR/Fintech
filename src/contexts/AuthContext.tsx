import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, Role } from '../types';
import { db } from '../services/mockDb';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (name: string, role: Role, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string, role: Role) => Promise<boolean>;
    logout: () => void;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Check if existing users have passwords, if not, reset the database
        const existingUsers = db.getUsers();
        if (existingUsers.length > 0 && !existingUsers[0].password) {
            console.log('Resetting database - users missing password field');
            db.clearAll();
        }

        // Seed DB on init
        db.seedInitialData();

        // Check for existing session
        const savedUserId = localStorage.getItem('fintech_active_user');
        if (savedUserId) {
            const activeUser = db.getUserById(savedUserId);
            if (activeUser) setUser(activeUser);
        }
    }, []);

    const login = async (name: string, role: Role, password: string): Promise<boolean> => {
        setError(null);

        const targetUser = db.getUserByCredentials(name, role, password);
        if (targetUser) {
            setUser(targetUser);
            localStorage.setItem('fintech_active_user', targetUser.id);
            db.logAction(targetUser.id, undefined, 'User Logged In');
            return true;
        } else {
            setError('Invalid credentials. Please check your name, role, and password.');
            return false;
        }
    };

    const register = async (name: string, email: string, password: string, role: Role): Promise<boolean> => {
        setError(null);

        // Check if user already exists
        const existingUsers = db.getUsers();
        if (existingUsers.some(u => u.name.toLowerCase() === name.toLowerCase() && u.role === role)) {
            setError('A user with this name and role already exists.');
            return false;
        }

        // Create new user
        const newUser: User = {
            id: crypto.randomUUID(),
            name,
            email,
            password,
            role,
            createdAt: new Date().toISOString(),
        };

        db.createUser(newUser);
        setUser(newUser);
        localStorage.setItem('fintech_active_user', newUser.id);
        db.logAction(newUser.id, undefined, 'User Registered and Logged In');
        return true;
    };

    const logout = () => {
        if (user) {
            db.logAction(user.id, undefined, 'User Logged Out');
        }
        setUser(null);
        localStorage.removeItem('fintech_active_user');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, error }}>
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
