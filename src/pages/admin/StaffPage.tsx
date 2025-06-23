import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Staff } from '../../types';
import { User } from 'lucide-react';

const mockStaff: Staff[] = [
  {
    id: 'stf1',
    employeeId: 'EMP-001',
    name: 'Jane Manager',
    email: 'jane.m@kawempesacco.com',
    phone: '+256772111222',
    role: 'General Manager',
    department: 'Management',
    status: 'Active',
    hireDate: '2020-01-15',
    salary: 4500000,
    performanceScore: 95,
    profileImage: 'https://randomuser.me/api/portraits/women/1.jpg',
    address: "Plot 1, Kampala Road",
    nssfNumber: "1234567890",
    bank: { name: "Stanbic Bank", accountNumber: "9030001234567" }
  },
  {
    id: 'stf2',
    employeeId: 'EMP-002',
    name: 'Peter Loan',
    email: 'peter.l@kawempesacco.com',
    phone: '+256782222333',
    role: 'Senior Loan Officer',
    department: 'Loans',
    status: 'Active',
    hireDate: '2021-03-10',
    salary: 2800000,
    performanceScore: 92,
    profileImage: 'https://randomuser.me/api/portraits/men/2.jpg',
    address: "Plot 2, Entebbe Road",
    nssfNumber: "2345678901",
    bank: { name: "Centenary Bank", accountNumber: "2019876543" }
  },
  {
    id: 'stf3',
    employeeId: 'EMP-003',
    name: 'Grace Cashier',
    email: 'grace.c@kawempesacco.com',
    phone: '+256752333444',
    role: 'Head Cashier',
    department: 'Operations',
    status: 'Active',
    hireDate: '2021-07-22',
    salary: 2200000,
    performanceScore: 88,
    profileImage: 'https://randomuser.me/api/portraits/women/3.jpg',
    address: "Plot 3, Jinja Road",
    nssfNumber: "3456789012",
    bank: { name: "DFCU Bank", accountNumber: "0101234567890" }
  }
];

const AddStaffModal: React.FC<{ 
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (staff: Omit<Staff, 'id'>) => void;
}> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<Omit<Staff, 'id'>>({
    employeeId: '',
    name: '',
    email: '',
    phone: '',
    role: '',
    department: 'Operations',
    status: 'Active',
    hireDate: new Date().toISOString().split('T')[0],
    salary: 0,
    performanceScore: 0,
    profileImage: 'https://randomuser.me/api/portraits/lego/1.jpg',
    address: '',
    nssfNumber: '',
    bank: { name: '', accountNumber: '' }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('bank.')) {
      const bankField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        bank: {
          ...prev.bank,
          [bankField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'salary' || name === 'performanceScore' 
          ? Number(value) 
          : value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Add New Staff Member</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Employee ID"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              required
            />
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <Input
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            />
            <Input
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
            <Input
              label="Salary (UGX)"
              name="salary"
              type="number"
              value={formData.salary}
              onChange={handleChange}
              required
            />
            <Input
              label="Hire Date"
              name="hireDate"
              type="date"
              value={formData.hireDate}
              onChange={handleChange}
              required
            />
            <Input
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <Input
              label="NSSF Number"
              name="nssfNumber"
              value={formData.nssfNumber}
              onChange={handleChange}
              required
            />
            <Input
              label="Bank Name"
              name="bank.name"
              value={formData.bank.name}
              onChange={handleChange}
              required
            />
            <Input
              label="Account Number"
              name="bank.accountNumber"
              value={formData.bank.accountNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Add Staff
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ViewStaffDrawer: React.FC<{
  staff: Staff | null;
  onClose: () => void;
}> = ({ staff, onClose }) => {
  if (!staff) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Staff Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              &times;
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <div className="h-20 w-20 rounded-full bg-secondary-100 flex items-center justify-center mb-4">
                <User className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-lg font-semibold">{staff.name}</h3>
              <p className="text-secondary-500">{staff.role}</p>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-secondary-700 mb-1">Employee Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-secondary-500">Employee ID</p>
                    <p>{staff.employeeId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-500">Department</p>
                    <p>{staff.department}</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-500">Status</p>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      staff.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {staff.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-500">Hire Date</p>
                    <p>{staff.hireDate}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-secondary-700 mb-1">Contact Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-secondary-500">Email</p>
                    <p>{staff.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-500">Phone</p>
                    <p>{staff.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-500">Address</p>
                    <p>{staff.address}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-secondary-700 mb-1">Financial Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-secondary-500">Salary</p>
                    <p>{staff.salary.toLocaleString()} UGX</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-500">Performance</p>
                    <p>{staff.performanceScore}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-500">NSSF Number</p>
                    <p>{staff.nssfNumber}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-secondary-700 mb-1">Bank Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-secondary-500">Bank Name</p>
                    <p>{staff.bank.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-500">Account Number</p>
                    <p>{staff.bank.accountNumber}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const StaffPage: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewingStaff, setViewingStaff] = useState<Staff | null>(null);
  const [staffList, setStaffList] = useState<Staff[]>(mockStaff);

  const handleViewStaff = (staff: Staff) => {
    setViewingStaff(staff);
  };

  const handleAddStaff = (newStaff: Omit<Staff, 'id'>) => {
    const staffWithId: Staff = {
      ...newStaff,
      id: `stf${staffList.length + 1}`
    };
    setStaffList([...staffList, staffWithId]);
  };

  return (
    <div>
      <ViewStaffDrawer
        staff={viewingStaff}
        onClose={() => setViewingStaff(null)}
      />
      <AddStaffModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddStaff}
      />
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-secondary-900">Staff Management</h1>
        <p className="text-secondary-600 mt-1">
          Manage all SACCO staff members and their performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <div className="p-5">
            <h3 className="font-medium text-secondary-700 mb-2">Total Staff</h3>
            <p className="text-3xl font-bold text-primary-600">{mockStaff.length}</p>
          </div>
        </Card>
        <Card>
          <div className="p-5">
            <h3 className="font-medium text-secondary-700 mb-2">Avg Performance</h3>
            <p className="text-3xl font-bold text-green-600">
              {Math.round(mockStaff.reduce((sum, s) => sum + s.performanceScore, 0) / mockStaff.length)}%
            </p>
          </div>
        </Card>
        <Card>
          <div className="p-5">
            <h3 className="font-medium text-secondary-700 mb-2">Departments</h3>
            <p className="text-3xl font-bold text-blue-600">
              {new Set(mockStaff.map(s => s.department)).size}
            </p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">All Staff Members</h3>
          <Button onClick={() => setIsAddModalOpen(true)}>
            Add New Staff
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-secondary-200">
            <thead className="bg-secondary-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Performance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-secondary-200">
              {staffList.map((staff) => (
                <tr key={staff.id} className="hover:bg-secondary-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-secondary-100 flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-secondary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-secondary-900">{staff.name}</p>
                        <p className="text-sm text-secondary-500">{staff.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                    {staff.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                    {staff.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      staff.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {staff.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-secondary-200 rounded-full h-2.5 mr-2">
                        <div 
                          className={`h-2.5 rounded-full ${
                            staff.performanceScore > 90 ? 'bg-green-600' : 
                            staff.performanceScore > 80 ? 'bg-blue-600' : 'bg-yellow-600'
                          }`}
                          style={{ width: `${staff.performanceScore}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-secondary-600">
                        {staff.performanceScore}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleViewStaff(staff)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
    </div>
  );
};
