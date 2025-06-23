import React, { useState, useEffect } from 'react';
import { Wallet, Search, Filter, Download, User, PiggyBank, TrendingUp, FileText, Plus } from 'lucide-react';
import { format, subDays } from 'date-fns';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Skeleton } from '../../components/ui/Skeleton';
import { clsx } from 'clsx';
import { Deposit, User as UserType, Staff } from '../../types';

// --- Mock Data (Self-contained for stability) ---

const mockUsers: UserType[] = [
  { id: '1', firstName: 'John', lastName: 'Doe', memberNumber: 'KS001', email: 'john.doe@example.com', role: 'member', phoneNumber: '+256701234567', idNumber: 'CM90123456ABCD', address: '', joinDate: '', status: 'active' },
  { id: '2', firstName: 'Sarah', lastName: 'Nakato', memberNumber: 'KS002', email: 'sarah.nakato@example.com', role: 'member', phoneNumber: '+256772345678', idNumber: 'CM85098765WXYZ', address: '', joinDate: '', status: 'active' },
  { id: '3', firstName: 'Robert', lastName: 'Mugisha', memberNumber: 'KS003', email: 'robert.mugisha@example.com', role: 'member', phoneNumber: '+256753456789', idNumber: 'CM92112233EFGH', address: '', joinDate: '', status: 'active' },
];

const mockStaff: Staff[] = [
  { id: 'stf1', employeeId: 'EMP-001', name: 'Jane Manager', email: 'jane.m@kawempesacco.com', phone: '+256772111222', role: 'General Manager', department: 'Management', status: 'Active', hireDate: '2020-01-15', salary: 4500000, performanceScore: 95, profileImage: 'https://randomuser.me/api/portraits/women/1.jpg', address: "Plot 1, Kampala Road", nssfNumber: "1234567890", bank: { name: "Stanbic Bank", accountNumber: "9030001234567" } },
  { id: 'stf2', employeeId: 'EMP-002', name: 'Peter Loan', email: 'peter.l@kawempesacco.com', phone: '+256782222333', role: 'Senior Loan Officer', department: 'Loans', status: 'Active', hireDate: '2021-03-10', salary: 2800000, performanceScore: 92, profileImage: 'https://randomuser.me/api/portraits/men/2.jpg', address: "Plot 2, Entebbe Road", nssfNumber: "2345678901", bank: { name: "Centenary Bank", accountNumber: "2019876543" } },
  { id: 'stf3', employeeId: 'EMP-003', name: 'Grace Cashier', email: 'grace.c@kawempesacco.com', phone: '+256752333444', role: 'Head Cashier', department: 'Operations', status: 'Active', hireDate: '2021-07-22', salary: 2200000, performanceScore: 88, profileImage: 'https://randomuser.me/api/portraits/women/3.jpg', address: "Plot 3, Jinja Road", nssfNumber: "3456789012", bank: { name: "DFCU Bank", accountNumber: "0101234567890" } },
];

const generateMockDeposits = (): Deposit[] => {
  const deposits: Deposit[] = [];
  const categories: ('savings' | 'fixed' | 'special')[] = ['savings', 'fixed', 'special'];
  const channels: ('cash' | 'bank' | 'mobile_money')[] = ['cash', 'bank', 'mobile_money'];
  
  for (let i = 0; i < 20; i++) {
    const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomChannel = channels[Math.floor(Math.random() * channels.length)];
    const randomAmount = Math.floor(Math.random() * 900000) + 100000;
    const randomDaysAgo = Math.floor(Math.random() * 60);
    const date = format(subDays(new Date(), randomDaysAgo), 'yyyy-MM-dd');
    
  deposits.push({
    id: `dep-${i + 1}`,
    memberId: randomUser.id,
    staffId: mockStaff[Math.floor(Math.random() * mockStaff.length)].id,
    category: randomCategory,
    amount: randomAmount,
    date: date,
    receiptNumber: `REC-${String(i + 1).padStart(5, '0')}`,
    channel: randomChannel,
    reference: randomChannel !== 'cash' ? `REF${Math.floor(Math.random() * 1000000)}` : '',
  });
  }
  return deposits.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// --- Utility Functions ---

const formatUGX = (amount: number): string => {
  return new Intl.NumberFormat('en-UG', {
    style: 'currency',
    currency: 'UGX',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString: string): string => {
  return format(new Date(dateString), 'dd MMM yyyy');
};

// --- Component ---

export const DepositsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [isAddDepositOpen, setIsAddDepositOpen] = useState(false);
  const [newDeposit, setNewDeposit] = useState<Omit<Deposit, 'id' | 'receiptNumber'>>({
    memberId: '',
    staffId: 'stf1', // Default to first staff member
    category: 'savings',
    amount: 0,
    date: format(new Date(), 'yyyy-MM-dd'),
    channel: 'cash',
    reference: '',
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockData = generateMockDeposits();
      setDeposits(mockData);
      setIsLoading(false);
    }, 1000);
  }, []);

  const stats = {
    totalDeposits: deposits.reduce((sum, dep) => sum + dep.amount, 0),
    savingsDeposits: deposits.filter(d => d.category === 'savings').reduce((sum, dep) => sum + dep.amount, 0),
    fixedDeposits: deposits.filter(d => d.category === 'fixed').reduce((sum, dep) => sum + dep.amount, 0),
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Deposits Management</h1>
          <p className="text-secondary-600 mt-1">
            Track and manage all member deposits.
          </p>
        </div>
        <Button onClick={() => setIsAddDepositOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Deposit
        </Button>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <div className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Total Deposits</p>
              {isLoading ? <Skeleton height={30} width={120} /> : <p className="text-2xl font-bold text-secondary-900 mt-1">{formatUGX(stats.totalDeposits)}</p>}
            </div>
            <div className="bg-primary-50 p-3 rounded-full"><Wallet className="h-6 w-6 text-primary-600" /></div>
          </div>
        </Card>
        <Card>
          <div className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Savings Deposits</p>
              {isLoading ? <Skeleton height={30} width={120} /> : <p className="text-2xl font-bold text-green-600 mt-1">{formatUGX(stats.savingsDeposits)}</p>}
            </div>
            <div className="bg-green-50 p-3 rounded-full"><PiggyBank className="h-6 w-6 text-green-600" /></div>
          </div>
        </Card>
        <Card>
          <div className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Fixed Deposits</p>
              {isLoading ? <Skeleton height={30} width={120} /> : <p className="text-2xl font-bold text-blue-600 mt-1">{formatUGX(stats.fixedDeposits)}</p>}
            </div>
            <div className="bg-blue-50 p-3 rounded-full"><TrendingUp className="h-6 w-6 text-blue-600" /></div>
          </div>
        </Card>
      </div>
      
      {/* Deposits Table */}
      <Card>
        <div className="p-4 border-b flex justify-between items-center">
            <h3 className="text-lg font-semibold">All Deposits</h3>
            <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
            </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-secondary-200">
            <thead className="bg-secondary-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Channel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Receipt #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Processed By</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-secondary-200">
              {isLoading ? (
                Array(5).fill(0).map((_, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4"><Skeleton height={20} width={150} /></td>
                    <td className="px-6 py-4"><Skeleton height={20} width={100} /></td>
                    <td className="px-6 py-4"><Skeleton height={20} width={80} /></td>
                    <td className="px-6 py-4"><Skeleton height={20} width={100} /></td>
                    <td className="px-6 py-4"><Skeleton height={20} width={100} /></td>
                    <td className="px-6 py-4"><Skeleton height={20} width={80} /></td>
                  </tr>
                ))
              ) : (
                deposits.map((deposit) => {
                  const member = mockUsers.find(u => u.id === deposit.memberId);
                  return (
                    <tr key={deposit.id} className="hover:bg-secondary-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-secondary-900">{member ? `${member.firstName} ${member.lastName}` : 'N/A'}</div>
                        <div className="text-sm text-secondary-500">{member?.memberNumber}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-900">{formatUGX(deposit.amount)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={clsx(
                          "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                          deposit.category === 'savings' && "bg-green-100 text-green-800",
                          deposit.category === 'fixed' && "bg-blue-100 text-blue-800",
                          deposit.category === 'special' && "bg-purple-100 text-purple-800"
                        )}>
                          {deposit.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600 capitalize">{deposit.channel.replace('_', ' ')}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">{formatDate(deposit.date)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-secondary-500">{deposit.receiptNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                        {deposit.staffId ? mockStaff.find(s => s.id === deposit.staffId)?.name : 'System'}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
      {/* Add Deposit Modal */}
      {isAddDepositOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-secondary-900">Record New Deposit</h2>
                <button 
                  onClick={() => setIsAddDepositOpen(false)}
                  className="text-secondary-500 hover:text-secondary-700"
                >
                  &times;
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Member <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newDeposit.memberId}
                    onChange={(e) => setNewDeposit({...newDeposit, memberId: e.target.value})}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  >
                    <option value="">Select Member</option>
                    {mockUsers.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.firstName} {user.lastName} ({user.memberNumber})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Deposit Category
                  </label>
                  <select
                    value={newDeposit.category}
                    onChange={(e) => setNewDeposit({...newDeposit, category: e.target.value as 'savings' | 'fixed' | 'special'})}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  >
                    <option value="savings">Savings</option>
                    <option value="fixed">Fixed Deposit</option>
                    <option value="special">Special Deposit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Amount (UGX) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={newDeposit.amount}
                    onChange={(e) => setNewDeposit({...newDeposit, amount: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    placeholder="100000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Payment Channel
                  </label>
                  <select
                    value={newDeposit.channel}
                    onChange={(e) => setNewDeposit({...newDeposit, channel: e.target.value as 'cash' | 'bank' | 'mobile_money'})}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  >
                    <option value="cash">Cash</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="mobile_money">Mobile Money</option>
                  </select>
                </div>

                {newDeposit.channel !== 'cash' && (
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      Reference Number
                    </label>
                    <input
                      type="text"
                      value={newDeposit.reference}
                      onChange={(e) => setNewDeposit({...newDeposit, reference: e.target.value})}
                      className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      placeholder="Enter reference number"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newDeposit.date}
                    onChange={(e) => setNewDeposit({...newDeposit, date: e.target.value})}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsAddDepositOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (!newDeposit.memberId) {
                      alert('Please select a member');
                      return;
                    }
                    if (newDeposit.amount <= 0) {
                      alert('Please enter a valid amount');
                      return;
                    }

                    const newId = `dep-${deposits.length + 1}`;
                    const newReceipt = `REC-${String(deposits.length + 1).padStart(5, '0')}`;
                    const depositToAdd: Deposit = {
                      ...newDeposit,
                      id: newId,
                      receiptNumber: newReceipt
                    };
                    setDeposits([depositToAdd, ...deposits]);
                    setIsAddDepositOpen(false);
                    setNewDeposit({
                      memberId: '',
                      staffId: 'stf1',
                      category: 'savings',
                      amount: 0,
                      date: format(new Date(), 'yyyy-MM-dd'),
                      channel: 'cash',
                      reference: '',
                    });
                    alert('Deposit recorded successfully!');
                  }}
                >
                  Record Deposit
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
