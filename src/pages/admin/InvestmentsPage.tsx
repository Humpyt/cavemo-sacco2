import React, { useState, useEffect } from 'react';
import { TrendingUp, Search, Filter, Download, Plus, DollarSign, PieChart, BarChart2 } from 'lucide-react';
import { format } from 'date-fns';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Skeleton } from '../../components/ui/Skeleton';
import { clsx } from 'clsx';

interface Investment {
  id: string;
  name: string;
  type: 'stocks' | 'bonds' | 'real_estate' | 'fixed_deposit';
  amount: number;
  date: string;
  returnRate: number;
  maturityDate: string;
  status: 'active' | 'matured' | 'liquidated';
  notes?: string;
}

const mockInvestments: Investment[] = [
  {
    id: 'inv1',
    name: 'Uganda Treasury Bonds',
    type: 'bonds',
    amount: 50000000,
    date: '2024-01-15',
    returnRate: 12.5,
    maturityDate: '2026-01-15',
    status: 'active'
  },
  {
    id: 'inv2',
    name: 'Stanbic Fixed Deposit',
    type: 'fixed_deposit',
    amount: 20000000,
    date: '2024-03-10',
    returnRate: 9.0,
    maturityDate: '2025-03-10',
    status: 'active'
  },
  {
    id: 'inv3',
    name: 'Commercial Property - Kampala',
    type: 'real_estate',
    amount: 150000000,
    date: '2023-06-22',
    returnRate: 15.0,
    maturityDate: '2033-06-22',
    status: 'active'
  },
  {
    id: 'inv4',
    name: 'USE Listed Stocks',
    type: 'stocks',
    amount: 30000000,
    date: '2024-02-05',
    returnRate: 18.2,
    maturityDate: 'N/A',
    status: 'active'
  },
  {
    id: 'inv5',
    name: 'Centenary Fixed Deposit',
    type: 'fixed_deposit',
    amount: 10000000,
    date: '2023-11-30',
    returnRate: 8.5,
    maturityDate: '2024-11-30',
    status: 'matured'
  }
];

const formatUGX = (amount: number): string => {
  return new Intl.NumberFormat('en-UG', {
    style: 'currency',
    currency: 'UGX',
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString: string): string => {
  return format(new Date(dateString), 'dd MMM yyyy');
};

export const InvestmentsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddInvestmentOpen, setIsAddInvestmentOpen] = useState(false);
  const [newInvestment, setNewInvestment] = useState<Omit<Investment, 'id'>>({
    name: '',
    type: 'stocks',
    amount: 0,
    date: format(new Date(), 'yyyy-MM-dd'),
    returnRate: 0,
    maturityDate: '',
    status: 'active',
    notes: ''
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setInvestments(mockInvestments);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredInvestments = investments.filter(investment => {
    const matchesSearch = investment.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || investment.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || investment.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    totalInvestments: investments.reduce((sum, inv) => sum + inv.amount, 0),
    activeInvestments: investments.filter(i => i.status === 'active').reduce((sum, inv) => sum + inv.amount, 0),
    annualReturns: investments.reduce((sum, inv) => sum + (inv.amount * inv.returnRate / 100), 0)
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Investments Portfolio</h1>
          <p className="text-secondary-600 mt-1">
            Manage SACCO investments and track performance
          </p>
        </div>
        <Button onClick={() => setIsAddInvestmentOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Investment
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <div className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Total Investments</p>
              {isLoading ? <Skeleton height={30} width={120} /> : <p className="text-2xl font-bold text-secondary-900 mt-1">{formatUGX(stats.totalInvestments)}</p>}
            </div>
            <div className="bg-primary-50 p-3 rounded-full"><DollarSign className="h-6 w-6 text-primary-600" /></div>
          </div>
        </Card>
        <Card>
          <div className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Active Investments</p>
              {isLoading ? <Skeleton height={30} width={120} /> : <p className="text-2xl font-bold text-green-600 mt-1">{formatUGX(stats.activeInvestments)}</p>}
            </div>
            <div className="bg-green-50 p-3 rounded-full"><PieChart className="h-6 w-6 text-green-600" /></div>
          </div>
        </Card>
        <Card>
          <div className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Projected Annual Returns</p>
              {isLoading ? <Skeleton height={30} width={120} /> : <p className="text-2xl font-bold text-blue-600 mt-1">{formatUGX(stats.annualReturns)}</p>}
            </div>
            <div className="bg-blue-50 p-3 rounded-full"><BarChart2 className="h-6 w-6 text-blue-600" /></div>
          </div>
      </Card>

      {/* Add Investment Modal */}
      {isAddInvestmentOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-secondary-900">Add New Investment</h2>
                <button 
                  onClick={() => setIsAddInvestmentOpen(false)}
                  className="text-secondary-500 hover:text-secondary-700"
                >
                  &times;
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Investment Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newInvestment.name}
                    onChange={(e) => setNewInvestment({...newInvestment, name: e.target.value})}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    placeholder="Investment name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Investment Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newInvestment.type}
                    onChange={(e) => setNewInvestment({...newInvestment, type: e.target.value as any})}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  >
                    <option value="stocks">Stocks</option>
                    <option value="bonds">Bonds</option>
                    <option value="real_estate">Real Estate</option>
                    <option value="fixed_deposit">Fixed Deposit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Amount (UGX) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={newInvestment.amount}
                    onChange={(e) => setNewInvestment({...newInvestment, amount: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    placeholder="10000000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Return Rate (%) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={newInvestment.returnRate}
                    onChange={(e) => setNewInvestment({...newInvestment, returnRate: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    placeholder="10.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Maturity Date
                  </label>
                  <input
                    type="date"
                    value={newInvestment.maturityDate}
                    onChange={(e) => setNewInvestment({...newInvestment, maturityDate: e.target.value})}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={newInvestment.notes}
                    onChange={(e) => setNewInvestment({...newInvestment, notes: e.target.value})}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    rows={3}
                    placeholder="Additional notes about this investment"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsAddInvestmentOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (!newInvestment.name) {
                      alert('Please enter investment name');
                      return;
                    }
                    if (newInvestment.amount <= 0) {
                      alert('Please enter a valid amount');
                      return;
                    }
                    if (newInvestment.returnRate <= 0) {
                      alert('Please enter a valid return rate');
                      return;
                    }

                    const newId = `inv-${investments.length + 1}`;
                    const investmentToAdd: Investment = {
                      ...newInvestment,
                      id: newId
                    };
                    setInvestments([investmentToAdd, ...investments]);
                    setIsAddInvestmentOpen(false);
                    setNewInvestment({
                      name: '',
                      type: 'stocks',
                      amount: 0,
                      date: format(new Date(), 'yyyy-MM-dd'),
                      returnRate: 0,
                      maturityDate: '',
                      status: 'active',
                      notes: ''
                    });
                    alert('Investment added successfully!');
                  }}
                >
                  Add Investment
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 p-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search investments..."
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
              <option value="stocks">Stocks</option>
              <option value="bonds">Bonds</option>
              <option value="real_estate">Real Estate</option>
              <option value="fixed_deposit">Fixed Deposits</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="matured">Matured</option>
              <option value="liquidated">Liquidated</option>
            </select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Investments Table */}
      <Card>
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">Investment Portfolio</h3>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-secondary-200">
            <thead className="bg-secondary-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Investment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Return Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Maturity Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-secondary-200">
              {isLoading ? (
                Array(5).fill(0).map((_, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4"><Skeleton height={20} width={150} /></td>
                    <td className="px-6 py-4"><Skeleton height={20} width={100} /></td>
                    <td className="px-6 py-4"><Skeleton height={20} width={100} /></td>
                    <td className="px-6 py-4"><Skeleton height={20} width={100} /></td>
                    <td className="px-6 py-4"><Skeleton height={20} width={80} /></td>
                    <td className="px-6 py-4"><Skeleton height={20} width={100} /></td>
                    <td className="px-6 py-4"><Skeleton height={20} width={80} /></td>
                  </tr>
                ))
              ) : (
                filteredInvestments.map((investment) => (
                  <tr key={investment.id} className="hover:bg-secondary-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-secondary-900">{investment.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="capitalize">{investment.type.replace('_', ' ')}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-900">
                      {formatUGX(investment.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                      {formatDate(investment.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                      {investment.returnRate}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                      {investment.maturityDate === 'N/A' ? 'N/A' : formatDate(investment.maturityDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={clsx(
                        "px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize",
                        investment.status === 'active' && "bg-green-100 text-green-800",
                        investment.status === 'matured' && "bg-blue-100 text-blue-800",
                        investment.status === 'liquidated' && "bg-gray-100 text-gray-800"
                      )}>
                        {investment.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
