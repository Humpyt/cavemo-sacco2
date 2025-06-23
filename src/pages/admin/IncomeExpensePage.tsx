import React, { useState, useEffect } from 'react';
import { Plus, Download, Filter, TrendingUp, TrendingDown } from 'lucide-react';
import { clsx } from 'clsx';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Skeleton } from '../../components/ui/Skeleton';
import { format } from 'date-fns';

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  type: 'income' | 'expense';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
}

export const IncomeExpensePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState<Omit<Transaction, 'id'>>({
    date: format(new Date(), 'yyyy-MM-dd'),
    description: '',
    category: '',
    type: 'income',
    amount: 0,
    status: 'completed'
  });
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    setTimeout(() => {
      const mockTransactions: Transaction[] = [
        {
          id: 'txn-1',
          date: '2025-06-01',
          description: 'Member loan interest',
          category: 'loan_interest',
          type: 'income',
          amount: 1500000,
          status: 'completed'
        },
        {
          id: 'txn-2',
          date: '2025-06-05',
          description: 'Office rent',
          category: 'rent',
          type: 'expense',
          amount: 500000,
          status: 'completed'
        },
        {
          id: 'txn-3',
          date: '2025-06-10',
          description: 'Staff salaries',
          category: 'salaries',
          type: 'expense',
          amount: 2500000,
          status: 'completed'
        },
        {
          id: 'txn-4',
          date: '2025-06-15',
          description: 'Investment dividends',
          category: 'dividends',
          type: 'income',
          amount: 800000,
          status: 'completed'
        }
      ];
      setTransactions(mockTransactions);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleAddTransaction = () => {
    if (!newTransaction.description || !newTransaction.category || newTransaction.amount <= 0) {
      alert('Please fill all required fields');
      return;
    }

    const newId = `txn-${transactions.length + 1}`;
    setTransactions([{ ...newTransaction, id: newId }, ...transactions]);
    setIsModalOpen(false);
    setNewTransaction({
      date: format(new Date(), 'yyyy-MM-dd'),
      description: '',
      category: '',
      type: 'income',
      amount: 0,
      status: 'completed'
    });
  };

  const handleDeleteTransaction = (id: string) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      setTransactions(transactions.filter(t => t.id !== id));
    }
  };

  const filteredTransactions = transactions.filter(t => {
    const matchesType = filterType === 'all' || t.type === filterType;
    const matchesCategory = filterCategory === 'all' || t.category === filterCategory;
    return matchesType && matchesCategory;
  });

  const summary = {
    totalIncome: transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0),
    totalExpenses: transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0),
    netProfit: transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0) -
      transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0)
  };

  const formatUGX = (amount: number): string => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Income & Expense Management</h1>
          <p className="text-secondary-600 mt-1">
            Track all SACCO financial transactions
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Transaction
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <div className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Total Income</p>
              {isLoading ? <Skeleton height={30} width={120} /> : 
                <p className="text-2xl font-bold text-green-600 mt-1">{formatUGX(summary.totalIncome)}</p>}
            </div>
            <div className="bg-green-50 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Total Expenses</p>
              {isLoading ? <Skeleton height={30} width={120} /> : 
                <p className="text-2xl font-bold text-red-600 mt-1">{formatUGX(summary.totalExpenses)}</p>}
            </div>
            <div className="bg-red-50 p-3 rounded-full">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Net Profit</p>
              {isLoading ? <Skeleton height={30} width={120} /> : 
                <p className={clsx(
                  "text-2xl font-bold mt-1",
                  summary.netProfit >= 0 ? "text-blue-600" : "text-red-600"
                )}>
                  {formatUGX(summary.netProfit)}
                </p>}
            </div>
            <div className={clsx(
              "p-3 rounded-full",
              summary.netProfit >= 0 ? "bg-blue-50" : "bg-red-50"
            )}>
              {summary.netProfit >= 0 ? 
                <TrendingUp className="h-6 w-6 text-blue-600" /> : 
                <TrendingDown className="h-6 w-6 text-red-600" />}
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 p-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search transactions..."
                className="w-full pl-4 pr-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            >
              <option value="all">All Categories</option>
              <option value="loan_interest">Loan Interest</option>
              <option value="dividends">Dividends</option>
              <option value="rent">Rent</option>
              <option value="salaries">Salaries</option>
              <option value="utilities">Utilities</option>
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
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">Transactions</h3>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-secondary-200">
            <thead className="bg-secondary-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-secondary-200">
              {isLoading ? (
                Array(5).fill(0).map((_, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4"><Skeleton height={20} width={100} /></td>
                    <td className="px-6 py-4"><Skeleton height={20} width={150} /></td>
                    <td className="px-6 py-4"><Skeleton height={20} width={100} /></td>
                    <td className="px-6 py-4"><Skeleton height={20} width={80} /></td>
                    <td className="px-6 py-4"><Skeleton height={20} width={100} /></td>
                    <td className="px-6 py-4"><Skeleton height={20} width={80} /></td>
                    <td className="px-6 py-4"><Skeleton height={20} width={100} /></td>
                  </tr>
                ))
              ) : (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-secondary-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                      {format(new Date(transaction.date), 'dd MMM yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-secondary-900">{transaction.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500 capitalize">
                      {transaction.category.replace('_', ' ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={clsx(
                        "px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize",
                        transaction.type === 'income' ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      )}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {formatUGX(transaction.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={clsx(
                        "px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize",
                        transaction.status === 'completed' ? "bg-green-100 text-green-800" :
                        transaction.status === 'pending' ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                      )}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeleteTransaction(transaction.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Transaction Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-secondary-900">Add New Transaction</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-secondary-500 hover:text-secondary-700"
                >
                  &times;
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={newTransaction.date}
                    onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    placeholder="Transaction description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newTransaction.category}
                    onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  >
                    <option value="">Select category</option>
                    <option value="loan_interest">Loan Interest</option>
                    <option value="dividends">Dividends</option>
                    <option value="rent">Rent</option>
                    <option value="salaries">Salaries</option>
                    <option value="utilities">Utilities</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newTransaction.type}
                    onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value as any})}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Amount (UGX) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({...newTransaction, amount: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    placeholder="1000000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newTransaction.status}
                    onChange={(e) => setNewTransaction({...newTransaction, status: e.target.value as any})}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  >
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddTransaction}
                >
                  Add Transaction
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
