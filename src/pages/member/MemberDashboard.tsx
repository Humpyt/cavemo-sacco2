import React from 'react';
import { PiggyBank, CreditCard, TrendingUp, Receipt, Clock, CheckCircle } from 'lucide-react';
import { StatCard } from '../../components/charts/StatCard';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { mockAccounts, mockLoans, mockTransactions } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

export const MemberDashboard: React.FC = () => {
  const { user } = useAuth();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const totalSavings = mockAccounts.reduce((sum, account) => sum + account.balance, 0);
  const totalLoans = mockLoans.reduce((sum, loan) => sum + loan.outstandingBalance, 0);
  const recentTransactions = mockTransactions.slice(0, 5);

  return (
    <div className="p-6">
      {/* Header Card */}
      <div className="flex items-center justify-between bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-secondary-600 mt-1">
            Here's your financial overview for today.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Receipt className="h-4 w-4 mr-2" />
            View Statements
          </Button>
          <Button size="sm">
            <CreditCard className="h-4 w-4 mr-2" />
            Apply for Loan
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Savings"
          value={formatCurrency(totalSavings)}
          change="+5.2% this month"
          changeType="positive"
          icon={PiggyBank}
        />
        <StatCard
          title="Active Loans"
          value={mockLoans.length.toString()}
          change="2 active loans"
          changeType="neutral"
          icon={CreditCard}
        />
        <StatCard
          title="Outstanding Balance"
          value={formatCurrency(totalLoans)}
          change="Next payment due in 5 days"
          changeType="neutral"
          icon={Clock}
        />
        <StatCard
          title="Member Since"
          value={new Date(user?.joinDate || '').getFullYear().toString()}
          change="4 years of membership"
          changeType="positive"
          icon={CheckCircle}
        />
      </div>

      {/* Account Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Accounts */}
        <Card>
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">My Accounts</h3>
          <div className="space-y-4">
            {mockAccounts.map((account) => (
              <div key={account.id} className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                <div>
                  <p className="font-medium text-secondary-900 capitalize">
                    {account.accountType} Account
                  </p>
                  <p className="text-sm text-secondary-600">
                    Interest Rate: {account.interestRate}%
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-secondary-900">
                    {formatCurrency(account.balance)}
                  </p>
                  <p className="text-sm text-secondary-600 capitalize">
                    {account.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Loans */}
        <Card>
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">My Loans</h3>
          <div className="space-y-4">
            {mockLoans.map((loan) => (
              <div key={loan.id} className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                <div>
                  <p className="font-medium text-secondary-900 capitalize">
                    {loan.loanType.replace('_', ' ')} Loan
                  </p>
                  <p className="text-sm text-secondary-600">
                    Monthly Payment: {formatCurrency(loan.monthlyPayment)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-secondary-900">
                    {formatCurrency(loan.outstandingBalance)}
                  </p>
                  <p className="text-sm text-secondary-600 capitalize">
                    {loan.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-secondary-900">Recent Transactions</h3>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 border border-secondary-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  transaction.type === 'deposit' ? 'bg-green-100 text-green-600' :
                  transaction.type === 'loan_payment' ? 'bg-blue-100 text-blue-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  {transaction.type === 'deposit' ? <TrendingUp className="h-4 w-4" /> :
                   transaction.type === 'loan_payment' ? <CreditCard className="h-4 w-4" /> :
                   <Receipt className="h-4 w-4" />}
                </div>
                <div>
                  <p className="font-medium text-secondary-900">
                    {transaction.description}
                  </p>
                  <p className="text-sm text-secondary-600">
                    {new Date(transaction.date).toLocaleDateString()} • {transaction.channel}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${
                  transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'deposit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </p>
                <p className="text-sm text-secondary-600 capitalize">
                  {transaction.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <Card>
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="flex-col h-20 space-y-2">
            <PiggyBank className="h-5 w-5" />
            <span className="text-sm">Deposit</span>
          </Button>
          <Button variant="outline" className="flex-col h-20 space-y-2">
            <CreditCard className="h-5 w-5" />
            <span className="text-sm">Loan</span>
          </Button>
          <Button variant="outline" className="flex-col h-20 space-y-2">
            <Receipt className="h-5 w-5" />
            <span className="text-sm">Statement</span>
          </Button>
          <Button variant="outline" className="flex-col h-20 space-y-2">
            <TrendingUp className="h-5 w-5" />
            <span className="text-sm">Invest</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};