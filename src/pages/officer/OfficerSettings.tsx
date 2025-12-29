import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

type SettingsModel = {
  emailNotifications: boolean;
  smsNotifications: boolean;
  defaultQueue: 'ALL' | 'MY_QUEUE' | 'HIGH_RISK';
  theme: 'light' | 'dark' | 'system';
  signature: string;
};

export const OfficerSettings: React.FC = () => {
  const { user } = useAuth();
  const storageKey = `officer_settings_${user?.id ?? 'guest'}`;

  const [settings, setSettings] = useState<SettingsModel>({
    emailNotifications: true,
    smsNotifications: false,
    defaultQueue: 'MY_QUEUE',
    theme: 'system',
    signature: user?.name ?? '',
  });

  useEffect(() => {
    if (!user) return;
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        setSettings(JSON.parse(raw));
      } catch (e) {
        // ignore parse errors
      }
    }
  }, [user]);

  const save = () => {
    localStorage.setItem(storageKey, JSON.stringify(settings));
    alert('Settings saved');
  };

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto">
        <Card>
          <h2 className="text-lg font-semibold text-slate-900">Settings</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="text-sm text-slate-500">Email Notifications</label>
              <div className="mt-2 flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => setSettings(s => ({ ...s, emailNotifications: e.target.checked }))}
                  className="w-4 h-4"
                />
                <span className="text-sm text-slate-700">Receive email alerts for new applications</span>
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-500">SMS Notifications</label>
              <div className="mt-2 flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.smsNotifications}
                  onChange={(e) => setSettings(s => ({ ...s, smsNotifications: e.target.checked }))}
                  className="w-4 h-4"
                />
                <span className="text-sm text-slate-700">Receive SMS alerts</span>
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-500">Default Queue</label>
              <select
                value={settings.defaultQueue}
                onChange={(e) => setSettings(s => ({ ...s, defaultQueue: e.target.value as any }))}
                className="mt-2 bg-white border border-gray-300 text-gray-700 text-sm rounded-md block p-2.5"
              >
                <option value="ALL">All Applications</option>
                <option value="MY_QUEUE">My Queue</option>
                <option value="HIGH_RISK">High Risk First</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-slate-500">Theme</label>
              <select
                value={settings.theme}
                onChange={(e) => setSettings(s => ({ ...s, theme: e.target.value as any }))}
                className="mt-2 bg-white border border-gray-300 text-gray-700 text-sm rounded-md block p-2.5"
              >
                <option value="system">System</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-slate-500">Signature</label>
              <Input value={settings.signature} onChange={(e) => setSettings(s => ({ ...s, signature: e.target.value }))} className="mt-2" />
            </div>

            <div className="pt-2">
              <Button onClick={save}>Save Settings</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OfficerSettings;
