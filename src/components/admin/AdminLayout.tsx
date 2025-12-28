import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { AdminSidebar } from './AdminSidebar';

export const AdminLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    console.log('AdminLayout rendering...');

    return (
        <div className="flex h-screen bg-slate-950 overflow-hidden text-white">
            <AdminSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <main className="flex-1 overflow-y-auto flex flex-col">
                {/* Mobile Header */}
                <div className="md:hidden p-4 border-b border-slate-800 flex items-center gap-4 bg-slate-900 sticky top-0 z-30">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="text-slate-400 hover:text-white"
                    >
                        <Menu size={24} />
                    </button>
                    <span className="font-bold text-blue-400">FinTech Admin</span>
                </div>

                <div className="p-4 md:p-8 flex-1">
                    <div className="mb-4 text-xs text-slate-500 uppercase tracking-widest opacity-50 hidden md:block">
                        Admin Dashboard System
                    </div>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
