import React, { useState } from 'react';
import { Search, Plus, Filter, MoreHorizontal, Edit, Trash2, Eye, UserCheck, UserX } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

interface Member {
  id: string;
  memberNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'suspended';
  totalSavings: number;
  activeLoans: number;
}

const mockMembers: Member[] = [
  {
    id: '1',
    memberNumber: 'KS001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@gmail.com',
    phoneNumber: '+256702345678',
    joinDate: '2021-03-20',
    status: 'active',
    totalSavings: 2450000,
    activeLoans: 2,
  },
  {
    id: '2',
    memberNumber: 'KS002',
    firstName: 'Sarah',
    lastName: 'Nakato',
    email: 'sarah.nakato@gmail.com',
    phoneNumber: '+256703456789',
    joinDate: '2021-05-15',
    status: 'active',
    totalSavings: 1800000,
    activeLoans: 1,
  },
  {
    id: '3',
    memberNumber: 'KS003',
    firstName: 'Peter',
    lastName: 'Ssebugwawo',
    email: 'peter.ssebugwawo@gmail.com',
    phoneNumber: '+256704567890',
    joinDate: '2020-11-10',
    status: 'active',
    totalSavings: 3200000,
    activeLoans: 0,
  },
  {
    id: '4',
    memberNumber: 'KS004',
    firstName: 'Mary',
    lastName: 'Johnson',
    email: 'mary.johnson@gmail.com',
    phoneNumber: '+256705678901',
    joinDate: '2022-01-08',
    status: 'inactive',
    totalSavings: 950000,
    activeLoans: 1,
  },
  {
    id: '5',
    memberNumber: 'KS005',
    firstName: 'David',
    lastName: 'Mukasa',
    email: 'david.mukasa@gmail.com',
    phoneNumber: '+256706789012',
    joinDate: '2021-09-22',
    status: 'suspended',
    totalSavings: 1200000,
    activeLoans: 3,
  },
];

export const MembersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showDropdown, setShowDropdown] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMembers = mockMembers.filter(member => {
    const matchesSearch = 
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.memberNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      {/* Header Card */}
      <div className="flex items-center justify-between bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Members</h1>
          <p className="text-secondary-600 mt-1">
            Manage SACCO members and their information
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Members Table */}
      <Card className="mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-secondary-200">
                <th className="text-left py-3 px-4 font-medium text-secondary-900">Member</th>
                <th className="text-left py-3 px-4 font-medium text-secondary-900">Contact</th>
                <th className="text-left py-3 px-4 font-medium text-secondary-900">Join Date</th>
                <th className="text-left py-3 px-4 font-medium text-secondary-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-secondary-900">Savings</th>
                <th className="text-left py-3 px-4 font-medium text-secondary-900">Loans</th>
                <th className="text-left py-3 px-4 font-medium text-secondary-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr key={member.id} className="border-b border-secondary-100 hover:bg-secondary-50">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-secondary-900">
                        {member.firstName} {member.lastName}
                      </p>
                      <p className="text-sm text-secondary-600">{member.memberNumber}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-sm text-secondary-900">{member.email}</p>
                      <p className="text-sm text-secondary-600">{member.phoneNumber}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-secondary-900">
                      {new Date(member.joinDate).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(member.status)}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm font-medium text-secondary-900">
                      {formatCurrency(member.totalSavings)}
                    </p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-secondary-900">{member.activeLoans}</p>
                  </td>
                  <td className="py-4 px-4">
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowDropdown(showDropdown === member.id ? null : member.id)}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                      {showDropdown === member.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-secondary-200 z-10">
                          <div className="py-1">
                            <button className="flex items-center w-full px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </button>
                            <button className="flex items-center w-full px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Member
                            </button>
                            <button className="flex items-center w-full px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50">
                              <UserCheck className="h-4 w-4 mr-2" />
                              Activate
                            </button>
                            <button className="flex items-center w-full px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50">
                              <UserX className="h-4 w-4 mr-2" />
                              Suspend
                            </button>
                            <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <p className="text-2xl font-bold text-green-600">{mockMembers.filter(m => m.status === 'active').length}</p>
          <p className="text-sm text-secondary-600">Active Members</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-yellow-600">{mockMembers.filter(m => m.status === 'inactive').length}</p>
          <p className="text-sm text-secondary-600">Inactive Members</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-red-600">{mockMembers.filter(m => m.status === 'suspended').length}</p>
          <p className="text-sm text-secondary-600">Suspended Members</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-primary-600">{mockMembers.length}</p>
          <p className="text-sm text-secondary-600">Total Members</p>
        </Card>
      </div>
    </div>
  );
};