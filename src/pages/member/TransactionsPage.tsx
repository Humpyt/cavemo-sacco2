import { Card } from '../../components/ui/Card';

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: string;
  type: 'credit' | 'debit';
  account: string;
}

export const TransactionsPage = () => {
  const transactions: Transaction[] = [
    { id: 1, date: '2025-06-15', description: 'Deposit from Mobile Money', amount: 'UGX 500,000', type: 'credit', account: 'Main Savings' },
    { id: 2, date: '2025-06-14', description: 'Loan Payment', amount: 'UGX 250,000', type: 'debit', account: 'Loan Account' },
    { id: 3, date: '2025-06-10', description: 'Share Purchase', amount: 'UGX 100,000', type: 'debit', account: 'Shares Account' },
    { id: 4, date: '2025-06-05', description: 'Dividend Payment', amount: 'UGX 75,000', type: 'credit', account: 'Main Savings' }
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Transaction History</h1>
      
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">All Transactions</h2>
          <div className="flex gap-2">
            <select className="px-3 py-1 border rounded-md text-sm">
              <option>All Accounts</option>
              <option>Main Savings</option>
              <option>Loan Account</option>
              <option>Shares Account</option>
            </select>
            <input 
              type="date" 
              className="px-3 py-1 border rounded-md text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Account</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map(tx => (
                <tr key={tx.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tx.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.account}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    tx.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {tx.type === 'credit' ? '+' : '-'}{tx.amount}
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
