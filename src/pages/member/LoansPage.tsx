import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

interface Loan {
  id: number;
  date: string;
  amount: string;
  type: string;
  status: 'active' | 'paid' | 'pending';
  balance: string;
}

export const LoansPage = () => {
  const loans: Loan[] = [
    { id: 1, date: '2025-06-15', amount: 'UGX 1,500,000', type: 'Emergency', status: 'active', balance: 'UGX 750,000' },
    { id: 2, date: '2025-05-10', amount: 'UGX 3,000,000', type: 'Development', status: 'paid', balance: 'UGX 0' },
    { id: 3, date: '2025-06-01', amount: 'UGX 2,000,000', type: 'School Fees', status: 'pending', balance: 'UGX 2,000,000' }
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">My Loans</h1>
      
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-4">Loan Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="border rounded-lg p-4">
            <h3 className="text-sm text-gray-500">Active Loans</h3>
            <p className="text-xl font-bold">UGX 750,000</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="text-sm text-gray-500">Total Borrowed</h3>
            <p className="text-xl font-bold">UGX 6,500,000</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="text-sm text-gray-500">Available Limit</h3>
            <p className="text-xl font-bold">UGX 3,500,000</p>
          </div>
        </div>

        <Button>Apply for New Loan</Button>
      </Card>

      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-4">Loan History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loans.map(loan => (
                <tr key={loan.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{loan.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{loan.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{loan.balance}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${loan.status === 'active' ? 'bg-blue-100 text-blue-800' : 
                         loan.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {loan.status}
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
