import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { Login } from './pages/Login';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { ApplicantDashboard } from './pages/applicant/Dashboard';
import { LoanApplicationForm } from './pages/applicant/LoanApplication';

import { OfficerDashboard } from './pages/officer/Dashboard';
import { ApplicationDetail } from './pages/officer/ApplicationDetail';
import { RiskDashboard } from './pages/risk/Dashboard';
import { AdminDashboard } from './pages/admin/Dashboard';

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
                <Route path="profile" element={<div>Profile Page</div>} />
              </Route>

              {/* Officer Routes */}
              <Route path="officer">
                <Route path="dashboard" element={<OfficerDashboard />} />
                <Route path="applications" element={<OfficerDashboard />} />
                <Route path="applications/:id" element={<ApplicationDetail />} />
              </Route>

              {/* Risk Routes */}
              <Route path="risk">
                <Route path="dashboard" element={<RiskDashboard />} />
                <Route path="rules" element={<div>Scoring Rules</div>} />
              </Route>

              {/* Admin Routes */}
              <Route path="admin">
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<AdminDashboard />} />
                <Route path="loans" element={<div>All Loans</div>} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
