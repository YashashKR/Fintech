import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { Login } from './pages/Login';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { ApplicantDashboard } from './pages/applicant/Dashboard';
import { LoanApplicationForm } from './pages/applicant/LoanApplication';
import { ApplicantProfile } from './pages/applicant/Profile';
import ProgressTracker from './pages/applicant/Progress';
import FinancialTips from './pages/applicant/Tips';

import { OfficerDashboard } from './pages/officer/Dashboard';
import { ApplicationDetail } from './pages/officer/ApplicationDetail';
import { ApplicationsPage } from './pages/officer/ApplicationsPage';
import { ScoringRules } from './pages/risk/ScoringRules';
import { RiskDashboard } from './pages/risk/Dashboard';
import { RiskProfile } from './pages/risk/Profile';

// Admin imports
import { AdminLayout } from './components/admin/AdminLayout';
import { Overview } from './pages/admin/Overview';
import { UserManagement } from './pages/admin/UserManagement';
import { LoanOverrides } from './pages/admin/LoanOverrides';
import { SystemAnalytics } from './pages/admin/SystemAnalytics';
import { AuditLogs } from './pages/admin/AuditLogs';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<Navigate to="/login" replace />} />

              {/* Applicant Routes */}
              <Route path="applicant">
                <Route path="dashboard" element={<ApplicantDashboard />} />
                <Route path="apply" element={<LoanApplicationForm />} />
                <Route path="profile" element={<ApplicantProfile />} />
                <Route path="progress" element={<ProgressTracker />} />
                <Route path="tips" element={<FinancialTips />} />
              </Route>

              {/* Officer Routes */}
              <Route path="officer">
                <Route path="dashboard" element={<OfficerDashboard />} />
                <Route path="applications" element={<ApplicationsPage />} />
                <Route path="applications/:id" element={<ApplicationDetail />} />
              </Route>

              {/* Risk Routes */}
              <Route path="risk">
                <Route path="dashboard" element={<RiskDashboard />} />
                <Route path="rules" element={<ScoringRules />} />
                <Route path="profile" element={<RiskProfile />} />
              </Route>
            </Route>

            {/* Admin Routes - Separate Layout */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/overview" replace />} />
              <Route path="dashboard" element={<Navigate to="/admin/overview" replace />} />
              <Route path="overview" element={<Overview />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="overrides" element={<LoanOverrides />} />
              <Route path="analytics" element={<SystemAnalytics />} />
              <Route path="audit-logs" element={<AuditLogs />} />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={
              <div className="flex items-center justify-center h-screen bg-slate-900 text-white">
                <div className="text-center">
                  <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                  <p className="mb-6 text-slate-400">The page you are looking for doesn't exist.</p>
                  <a href="/" className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                    Go Home
                  </a>
                </div>
              </div>
            } />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
