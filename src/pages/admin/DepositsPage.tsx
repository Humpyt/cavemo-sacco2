import React, { useState } from 'react';
import { Search, Plus, Filter, Download, Calendar, TrendingUp } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatCard } from '../../components/charts/StatCard';

interface Deposit {
  id: string;
  memberNumber: string;
  memberName: string;
  accountType: 'savings' | 'fixed' | 'special';
  amount: number;
  date: string;
  method: 'cash' | 'bank' | 'mobile_money' | 'checkoff';
  reference: string;
  status: 'completed' | 'pending' | 'failed';
}

const mockDeposits: Deposit[] = [
  {
    id: '1',
    memberNumber: 'KS001',
    memberName: 'John Doe',
    accountType: 'savings',
    amount: 500000,
    date: '2024-01-15',
    method: 'mobile_money',
    reference: 'MM240115001',
    status: 'completed',
  },
  {
    id: '2',
    memberNumber: 'KS002',
    memberName: 'Sarah Nakato',
    accountType: 'fixed',
    amount: 1000000,
    date: '2024-01-15',
    method: 'bank',
    reference: 'BNK240115002',
    status: 'completed',
  },
  {
    id: '3',
    memberNumber: 'KS003',
    memberName: 'Peter Ssebugwawo',
    accountType: 'savings',
    amount: 300000,
    date: '2024-01-14',
    method: 'checkoff',
    reference: 'CHK240114003',
    status: 'completed',
  },
  {
    id: '4',
    memberNumber: 'KS004',
    memberName: 'Mary Johnson',
    accountType: 'special',
    amount: 750000,
    date: '2024-01-14',
    method: 'cash',
    reference: 'CSH240114004',
    status: 'pending',
  },
  {
    id: '5',
    memberNumber: 'KS005',
    memberName: 'David Mukasa',
    accountType: 'savings',
    amount: 200000,
    date: '2024-01-13',
    method: 'mobile_money',
    reference: 'MM240113005',
    status: 'failed',
  },
];

export const DepositsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [accountTypeFilter, setAccountTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'mobile_money':
        return 'bg-blue-100 text-blue-800';
      case 'bank':
        return 'bg-purple-100 text-purple-800';
      case 'cash':
        return 'bg-green-100 text-green-800';
      case 'checkoff':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredDeposits = mockDeposits.filter(deposit => {
    const matchesSearch = 
      deposit.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deposit.memberNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deposit.reference.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAccountType = accountTypeFilter === 'all' || deposit.accountType === accountTypeFilter;
    const matchesStatus = statusFilter === 'all' || deposit.status === statusFilter;
    
    return matchesSearch && matchesAccountType && matchesStatus;
  });

  const totalDeposits = mockDeposits.reduce((sum, deposit) => 
    deposit.status === 'completed' ? sum + deposit.amount : sum, 0
  );
  const pendingDeposits = mockDeposits.filter(d => d.status === 'pending').length;
  const todayDeposits = mockDeposits.filter(d => d.date === '2024-01-15').length;

  return (
    <div className="p-6">
      {/* Header Card */}
      <div className="flex items-center justify-between bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Deposits</h1>
          <p className="text-secondary-600 mt-1">
            Track and manage member deposits across all account types
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Record Deposit
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Deposits Today"
          value={formatCurrency(totalDeposits)}
          change="+12.5% from yesterday"
          changeType="positive"
          icon={TrendingUp}
          iconColor="text-green-600"
        />
        <StatCard
          title="Pending Deposits"
          value={pendingDeposits.toString()}
          change="Awaiting confirmation"
          changeType="neutral"
          icon={Calendar}
          iconColor="text-yellow-600"
        />
        <StatCard
          title="Deposits Today"
          value={todayDeposits.toString()}
          change="Transactions processed"
          changeType="positive"
          icon={TrendingUp}
          iconColor="text-blue-600"
        />
        <StatCard
          title="Average Deposit"
          value={formatCurrency(totalDeposits / mockDeposits.length)}
          change="Per transaction"
          changeType="neutral"
          icon={TrendingUp}
          iconColor="text-purple-600"
        />
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search deposits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <select
              value={accountTypeFilter}
              onChange={(e) => setAccountTypeFilter(e.target.value)}
              className="px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            >
              <option value="all">All Account Types</option>
              <option value="savings">Savings</option>
              <option value="fixed">Fixed Deposit</option>
              <option value="special">Special</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Deposits Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-secondary-200">
                <th className="text-left py-3 px-4 font-medium text-secondary-900">Member</th>
                <th className="text-left py-3 px-4 font-medium text-secondary-900">Account Type</th>
                <th className="text-left py-3 px-4 font-medium text-secondary-900">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-secondary-900">Method</th>
                <th className="text-left py-3 px-4 font-medium text-secondary-900">Date</th>
                <th className="text-left py-3 px-4 font-medium text-secondary-900">Reference</th>
                <th className="text-left py-3 px-4 font-medium text-secondary-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeposits.map((deposit) => (
                <tr key={deposit.id} className="border-b border-secondary-100 hover:bg-secondary-50">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-secondary-900">{deposit.memberName}</p>
                      <p className="text-sm text-secondary-600">{deposit.memberNumber}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800 capitalize">
                      {deposit.accountType.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-medium text-secondary-900">
                      {formatCurrency(deposit.amount)}
                    </p>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getMethodColor(deposit.method)}`}>
                      {deposit.method.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-secondary-900">
                      {new Date(deposit.date).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm font-mono text-secondary-900">{deposit.reference}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(deposit.status)}`}>
                      {deposit.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};