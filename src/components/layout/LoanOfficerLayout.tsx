import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Navbar } from './Navbar';
import { useAuth } from '../../contexts/AuthContext';

import { LayoutDashboard, FileText, Settings, Users, Menu } from 'lucide-react';

export const LoanOfficerLayout: React.FC = () => {

  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const { user } = useAuth();

  const userInitials = () => {
    if (!user?.name) return 'LO';
    const parts = user.name.split(' ');
    return (parts[0]?.[0] || '') + (parts[1]?.[0] || '');
  };

  const getLinks = () => {
    return [
      { to: '/officer/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { to: '/officer/applications', icon: FileText, label: 'Applications' },
      { to: '/officer/profile', icon: Users, label: 'Profile' },
      { to: '/officer/settings', icon: Settings, label: 'Settings' },
    ];
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      <Navbar />
      <div className="flex flex-1 max-w-full mx-auto w-full px-3 py-6 gap-6 transition-all duration-300">
        {/* Sidebar */}
        <aside
          className={`flex-shrink-0 hidden md:flex flex-col transition-all duration-300 ease-in-out bg-white/60 border border-slate-100 rounded-lg shadow-sm p-2 ${isCollapsed ? 'w-20' : 'w-64'}`}
          onMouseEnter={() => setIsCollapsed(false)}
          onMouseLeave={() => setIsCollapsed(true)}
        >
          <div className={`flex items-center gap-3 px-3 py-2 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="ml-auto">
              <button
                aria-label="toggle menu"
                onClick={() => setIsCollapsed((s) => !s)}
                className="p-1 rounded-md text-slate-500 hover:bg-slate-100"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          <nav className="mt-4 space-y-1 sticky top-8 flex-1 px-1">
            {getLinks().map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                title={isCollapsed ? link.label : undefined}
                className={({ isActive }) =>
                  `flex items-center ${isCollapsed ? 'justify-center px-2' : 'px-3'} py-2 rounded-md transition-colors duration-150 ${isActive
                    ? 'bg-gradient-to-r from-blue-50 to-white border-l-4 border-blue-500 text-slate-900'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                <link.icon className={`${isCollapsed ? 'h-6 w-6' : 'mr-3 h-5 w-5'} transition-all text-blue-600`} />
                {!isCollapsed && <span className="whitespace-nowrap overflow-hidden text-sm">{link.label}</span>}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Mobile collapsed header */}
        <div className="md:hidden w-full mb-2">
          <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
            <div />
            <div className="flex items-center gap-2">
              {getLinks().slice(0,2).map((l) => (
                <NavLink key={l.to} to={l.to} className="text-slate-600 hover:text-slate-900 px-2">
                  <l.icon className="w-5 h-5" />
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 min-w-0 transition-all duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LoanOfficerLayout;
