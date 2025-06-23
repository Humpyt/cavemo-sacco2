import React, { useState } from 'react';
import { Search, Filter, Download, ArrowUpRight, ArrowDownLeft, CreditCard, Receipt } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatCard } from '../../components/charts/StatCard';

interface Transaction {
  id: string;
  memberNumber: string;
  memberName: string;
  type: 'deposit' | 'withdrawal' | 'loan_payment' | 'fine' | 'checkoff' | 'transfer';
  amount: number;
  description: string;
  date: string;
  status: 'pending' | 'completed' | 'failed';
  reference: string;
  channel: 'cash' | 'bank' | 'mobile_money' | 'checkoff';
  staffId: string;
  staffName: string;
  staffRole: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    memberNumber: 'KS001',
    memberName: 'John Doe',
    type: 'deposit',
    amount: 500000,
    description: 'Monthly savings deposit',
    date: '2024-01-15',
    status: 'completed',
    reference: 'TXN001',
    channel: 'mobile_money',
    staffId: 'stf3',
    staffName: 'Grace Cashier',
    staffRole: 'Head Cashier',
  },
  {
    id: '2',
    memberNumber: 'KS001',
    memberName: 'John Doe',
    type: 'loan_payment',
    amount: 520833,
    description: 'Development loan payment',
    date: '2024-01-10',
    status: 'completed',
    reference: 'TXN002',
    channel: 'checkoff',
    staffId: 'stf2',
    staffName: 'Peter Loan',
    staffRole: 'Senior Loan Officer',
  },
  {
    id: '3',
    memberNumber: 'KS002',
    memberName: 'Sarah Nakato',
    type: 'deposit',
    amount: 750000,
    description: 'Fixed deposit contribution',
    date: '2024-01-14',
    status: 'completed',
    reference: 'TXN003',
    channel: 'bank',
    staffId: 'stf3',
    staffName: 'Grace Cashier',
    staffRole: 'Head Cashier',
  },
  {
    id: '4',
    memberNumber: 'KS003',
    memberName: 'Peter Ssebugwawo',
    type: 'withdrawal',
    amount: 200000,
    description: 'Emergency withdrawal',
    date: '2024-01-13',
    status: 'pending',
    reference: 'TXN004',
    channel: 'cash',
    staffId: 'stf1',
    staffName: 'Jane Manager',
    staffRole: 'General Manager',
  },
  {
    id: '5',
    memberNumber: 'KS004',
    memberName: 'Mary Johnson',
    type: 'fine',
    amount: 25000,
    description: 'Late payment fine',
    date: '2024-01-12',
    status: 'completed',
    reference: 'TXN005',
    channel: 'mobile_money',
    staffId: 'stf1',
    staffName: 'Jane Manager',
    staffRole: 'General Manager',
  },
  {
    id: '6',
    memberNumber: 'KS005',
    memberName: 'David Mukasa',
    type: 'checkoff',
    amount: 300000,
    description: 'Monthly salary checkoff',
    date: '2024-01-11',
    status: 'failed',
    reference: 'TXN006',
    channel: 'checkoff',
    staffId: 'stf2',
    staffName: 'Peter Loan',
    staffRole: 'Senior Loan Officer',
  },
];

export const TransactionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [channelFilter, setChannelFilter] = useState<string>('all');

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deposit':
      case 'checkoff':
        return <ArrowDownLeft className="h-4 w-4 text-green-600" />;
      case 'withdrawal':
        return <ArrowUpRight className="h-4 w-4 text-red-600" />;
      case 'loan_payment':
        return <CreditCard className="h-4 w-4 text-blue-600" />;
      case 'fine':
        return <Receipt className="h-4 w-4 text-orange-600" />;
      default:
        return <Receipt className="h-4 w-4 text-gray-600" />;
    }
  };

  const getChannelColor = (channel: string) => {
    switch (channel) {
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

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = 
      transaction.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.memberNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesChannel = channelFilter === 'all' || transaction.channel === channelFilter;
    
    return matchesSearch && matchesType && matchesStatus && matchesChannel;
  });

  const totalTransactions = mockTransactions.length;
  const completedTransactions = mockTransactions.filter(t => t.status === 'completed').length;
  const pendingTransactions = mockTransactions.filter(t => t.status === 'pending').length;
  const totalVolume = mockTransactions.reduce((sum, t) => 
    t.status === 'completed' ? sum + t.amount : sum, 0
  );

  return (
    <div className="p-6">
      {/* Header Card */}
      <div className="flex items-center justify-between bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Transactions</h1>
          <p className="text-secondary-600 mt-1">
            Monitor all financial transactions across the SACCO
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Transactions"
          value={totalTransactions.toString()}
          change="All time"
          changeType="neutral"
          icon={Receipt}
          iconColor="text-blue-600"
        />
        <StatCard
          title="Completed Today"
          value={completedTransactions.toString()}
          change="Successfully processed"
          changeType="positive"
          icon={ArrowDownLeft}
          iconColor="text-green-600"
        />
        <StatCard
          title="Pending"
          value={pendingTransactions.toString()}
          change="Awaiting processing"
          changeType="neutral"
          icon={ArrowUpRight}
          iconColor="text-yellow-600"
        />
        <StatCard
          title="Total Volume"
          value={formatCurrency(totalVolume)}
          change="Completed transactions"
          changeType="positive"
          icon={CreditCard}
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
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            >
              <option value="all">All Types</option>
              <option value="deposit">Deposit</option>
              <option value="withdrawal">Withdrawal</option>
              <option value="loan_payment">Loan Payment</option>
              <option value="fine">Fine</option>
              <option value="checkoff">Checkoff</option>
            </select>
            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            >
              <option value="all">All Channels</option>
              <option value="mobile_money">Mobile Money</option>
              <option value="bank">Bank</option>
              <option value="cash">Cash</option>
              <option value="checkoff">Checkoff</option>
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

      {/* Transactions Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-secondary-200">
                <th className="text-left py-3 px-4 font-medium text-secondary-900">Transaction</th>
                <th className="text-left py-3 px-4 font-medium text-secondary-900">Member</th>
                <th className="text-left py-3 px-4 font-medium text-secondary-900">Type</th>
                <th className="text-left py-3 px-4 font-medium text-secondary-900">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-secondary-900">Channel</th>
                <th className="text-left py-3 px-4 font-medium text-secondary-900">Date</th>
                <th className="text-left py-3 px-4 font-medium text-secondary-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-secondary-900">Staff</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-secondary-100 hover:bg-secondary-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      {getTypeIcon(transaction.type)}
                      <div>
                        <p className="font-medium text-secondary-900">{transaction.reference}</p>
                        <p className="text-sm text-secondary-600">{transaction.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-secondary-900">{transaction.memberName}</p>
                      <p className="text-sm text-secondary-600">{transaction.memberNumber}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-secondary-100 text-secondary-800 capitalize">
                      {transaction.type.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <p className={`font-medium ${
                      transaction.type === 'deposit' || transaction.type === 'checkoff' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {transaction.type === 'deposit' || transaction.type === 'checkoff' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </p>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getChannelColor(transaction.channel)}`}>
                      {transaction.channel.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-secondary-900">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-secondary-900">{transaction.staffName}</p>
                      <p className="text-sm text-secondary-600">{transaction.staffRole}</p>
                    </div>
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
