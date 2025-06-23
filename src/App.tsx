import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/auth/Login';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { MemberDashboard } from './pages/member/MemberDashboard';
import { MembersPage } from './pages/admin/MembersPage';
import { DepositsPage as AdminDepositsPage } from './pages/admin/DepositsPage';
import { DepositsPage } from './pages/member/DepositsPage';
import { AccountsPage } from './pages/member/AccountsPage';
import { LoansPage } from './pages/admin/LoansPage';
import { TransactionsPage } from './pages/admin/TransactionsPage';
import { OnboardingPage } from './pages/admin/OnboardingPage';
import { FinesPage } from './pages/admin/FinesPage';
import { MobileMoneyPage } from './pages/admin/MobileMoneyPage';
import { ReportsPage } from './pages/admin/ReportsPage';
import { SettingsPage } from './pages/admin/SettingsPage';
import { StaffPage } from './pages/admin/StaffPage';
import { IncomeExpensePage } from './pages/admin/IncomeExpensePage';
import { InvestmentsPage } from './pages/admin/InvestmentsPage';
import { CommunicationsPage } from './pages/admin/CommunicationsPage';
import { LoansPage as MemberLoansPage } from './pages/member/LoansPage';
import { TransactionsPage as MemberTransactionsPage } from './pages/member/TransactionsPage';
import { StatementsPage } from './pages/member/StatementsPage';
import { EWalletPage } from './pages/member/EWalletPage';
import { ProfilePage } from './pages/member/ProfilePage';

/**
 * Temporary placeholder component for routes that are
 * not yet implemented. This prevents build-time errors
 * while allowing us to register all required paths.
 */
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-secondary-900 mb-2">{title}</h1>
    <p className="text-secondary-600">This feature is coming soon.</p>
  </div>
);

const ProtectedRoute: React.FC<{ children: React.ReactNode; requiredRole?: string }> = ({ 
  children, 
  requiredRole 
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-secondary-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/member'} replace />;
  }

  return <Layout>{children}</Layout>;
};

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route path="/admin/onboarding" element={<ProtectedRoute requiredRole="admin"><OnboardingPage /></ProtectedRoute>} />
      <Route path="/admin/fines" element={<ProtectedRoute requiredRole="admin"><FinesPage /></ProtectedRoute>} />
      <Route path="/admin/checkoffs" element={<ProtectedRoute requiredRole="admin"><PlaceholderPage title="Payroll Check-offs" /></ProtectedRoute>} />
      <Route path="/admin/e-wallets" element={<ProtectedRoute requiredRole="admin"><MobileMoneyPage /></ProtectedRoute>} />
      <Route path="/admin/reports" element={<ProtectedRoute requiredRole="admin"><ReportsPage /></ProtectedRoute>} />
      <Route path="/admin/statements" element={<ProtectedRoute requiredRole="admin"><PlaceholderPage title="Statements Viewer" /></ProtectedRoute>} />
      <Route path="/admin/communications" element={<ProtectedRoute requiredRole="admin"><CommunicationsPage /></ProtectedRoute>} />
      <Route path="/admin/investments" element={<ProtectedRoute requiredRole="admin"><InvestmentsPage /></ProtectedRoute>} />
      <Route path="/admin/income-expense" element={<ProtectedRoute requiredRole="admin"><IncomeExpensePage /></ProtectedRoute>} />
      <Route path="/admin/settings" element={<ProtectedRoute requiredRole="admin"><SettingsPage /></ProtectedRoute>} />
      <Route path="/admin/members" element={<ProtectedRoute requiredRole="admin"><MembersPage /></ProtectedRoute>} />
      <Route path="/admin/deposits" element={<ProtectedRoute requiredRole="admin"><AdminDepositsPage /></ProtectedRoute>} />
      <Route path="/admin/loans" element={<ProtectedRoute requiredRole="admin"><LoansPage /></ProtectedRoute>} />
      <Route path="/admin/transactions" element={<ProtectedRoute requiredRole="admin"><TransactionsPage /></ProtectedRoute>} />
      <Route path="/admin/staff" element={<ProtectedRoute requiredRole="admin"><StaffPage /></ProtectedRoute>} />

      {/* Member Routes */}
      <Route path="/member" element={<ProtectedRoute requiredRole="member"><MemberDashboard /></ProtectedRoute>} />
      <Route path="/member/deposits" element={<ProtectedRoute requiredRole="member"><DepositsPage /></ProtectedRoute>} />
      <Route path="/member/accounts" element={<ProtectedRoute requiredRole="member"><AccountsPage /></ProtectedRoute>} />
      <Route path="/member/loans" element={<ProtectedRoute requiredRole="member"><MemberLoansPage /></ProtectedRoute>} />
      <Route path="/member/transactions" element={<ProtectedRoute requiredRole="member"><MemberTransactionsPage /></ProtectedRoute>} />
      <Route path="/member/statements" element={<ProtectedRoute requiredRole="member"><StatementsPage /></ProtectedRoute>} />
      <Route path="/member/communications" element={<ProtectedRoute requiredRole="member"><CommunicationsPage /></ProtectedRoute>} />
      <Route path="/member/e-wallet" element={<ProtectedRoute requiredRole="member"><EWalletPage /></ProtectedRoute>} />
      <Route path="/member/profile" element={<ProtectedRoute requiredRole="member"><ProfilePage /></ProtectedRoute>} />

      <Route
        path="/"
        element={
          user ? (
            <Navigate to={user.role === 'admin' ? '/admin' : '/member'} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
