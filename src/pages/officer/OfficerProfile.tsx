import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../services/mockDb';

const formatDate = (iso?: string) => iso ? new Date(iso).toLocaleDateString() : '-';

export const OfficerProfile: React.FC = () => {
  const { user } = useAuth();

  const lastLog = db.getLogs().find(l => l.performedBy === (user?.id || ''));

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto">
        <Card>
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">{user?.name ?? '—'}</h2>
              <p className="text-sm text-slate-500">Loan Officer</p>
              <p className="mt-2 text-sm text-slate-600">{user?.email ?? '—'}</p>
            </div>
            <div className="ml-auto">
              <Button variant="secondary">Edit Profile</Button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-slate-400 uppercase">Employee ID</p>
              <p className="text-sm text-slate-700">{user?.id ?? '—'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-400 uppercase">Joined</p>
              <p className="text-sm text-slate-700">{formatDate(user?.createdAt)}</p>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-slate-400 uppercase">Phone</p>
              <p className="text-sm text-slate-700">+1 (555) 123-4567</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-400 uppercase">Office</p>
              <p className="text-sm text-slate-700">Branch 12 — New York</p>
            </div>

            <div className="col-span-1 sm:col-span-2">
              <p className="text-xs text-slate-400 uppercase">Manager</p>
              <p className="text-sm text-slate-700">Michael Bowen</p>
            </div>

            <div className="col-span-1 sm:col-span-2">
              <p className="text-xs text-slate-400 uppercase">Last Activity</p>
              <p className="text-sm text-slate-700">{lastLog ? `${lastLog.action} • ${formatDate(lastLog.timestamp)}` : 'No recent activity'}</p>
            </div>

            <div className="col-span-1 sm:col-span-2">
              <p className="text-xs text-slate-400 uppercase">Bio</p>
              <p className="text-sm text-slate-700">Experienced loan officer focused on quick, fair credit decisions and strong customer service.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OfficerProfile;
