import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

interface Statement {
  id: number;
  period: string;
  account: string;
  balance: string;
  transactions: number;
  downloadUrl: string;
}

export const StatementsPage = () => {
  const handleDownload = (statement: Statement) => {
    // In a real app, this would fetch from an API endpoint
    const pdfUrl = `/api/statements/${statement.id}`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `statement_${statement.period.replace(' ', '_')}_${statement.account.replace(' ', '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const statements: Statement[] = [
    { id: 1, period: 'June 2025', account: 'Main Savings', balance: 'UGX 1,250,000', transactions: 12, downloadUrl: '/api/statements/1' },
    { id: 2, period: 'May 2025', account: 'Main Savings', balance: 'UGX 950,000', transactions: 8, downloadUrl: '/api/statements/2' },
    { id: 3, period: 'April 2025', account: 'Main Savings', balance: 'UGX 750,000', transactions: 6, downloadUrl: '/api/statements/3' },
    { id: 4, period: 'June 2025', account: 'Loan Account', balance: 'UGX 750,000', transactions: 4, downloadUrl: '/api/statements/4' }
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Account Statements</h1>
      
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Available Statements</h2>
          <div className="flex gap-2">
            <select className="px-3 py-1 border rounded-md text-sm">
              <option>All Accounts</option>
              <option>Main Savings</option>
              <option>Loan Account</option>
              <option>Shares Account</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Account</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transactions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {statements.map(statement => (
                <tr key={statement.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{statement.period}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{statement.account}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{statement.balance}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{statement.transactions}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDownload(statement)}
                    >
                      Download
                    </Button>
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
