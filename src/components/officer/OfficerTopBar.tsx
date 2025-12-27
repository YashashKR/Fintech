import React from 'react';
import { Search, Bell, LogOut, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAuth } from '../../contexts/AuthContext';

interface OfficerTopBarProps {
    search: string;
    onSearchChange: (value: string) => void;
}

export const OfficerTopBar: React.FC<OfficerTopBarProps> = ({ search, onSearchChange }) => {
    const { logout, user } = useAuth();

    return (
        <div className="bg-white border-b border-blue-200 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-40">
            <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-2 rounded-full">
                    <User className="text-blue-700 w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-blue-900 leading-none">Loan Officer</h2>
                    <span className="text-xs text-blue-500 font-medium">{user?.name || 'Officer'}</span>
                </div>
            </div>

            <div className="flex items-center gap-6 flex-1 justify-end">
                <div className="relative w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 w-4 h-4" />
                    <Input
                        placeholder="Search applicants..."
                        className="pl-10 border-blue-200 focus:border-blue-500 bg-blue-50"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>

                <button className="relative p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                <div className="h-6 w-px bg-blue-200 mx-2"></div>

                <Button
                    variant="ghost"
                    onClick={logout}
                    className="text-blue-600 hover:bg-blue-50 hover:text-blue-800 gap-2"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </Button>
            </div>
        </div>
    );
};
