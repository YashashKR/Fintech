import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 z-10 block">
            <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold shadow-sm">
                        FL
                    </div>
                    <span className="text-xl font-bold text-primary tracking-tight">FinTech</span>
                </div>

                {user && (
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end">
                            <span className="text-sm font-medium text-text-main">{user.name}</span>
                            <span className="text-xs text-secondary-text bg-secondary/30 px-2 py-0.5 rounded-full font-medium">
                                {user.role}
                            </span>
                        </div>
                        <div className="h-8 w-px bg-gray-200 mx-1"></div>
                        <button
                            onClick={() => {
                                logout();
                                navigate('/', { replace: true });
                            }}
                            className="p-2 text-text-muted hover:text-error hover:bg-red-50 rounded-full transition-colors"
                            title="Logout"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};
