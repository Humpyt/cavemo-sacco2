import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const DepositsPage = () => {
  const deposits = [
    {
      date: "12/06/2025",
      amount: "UGX 150,000",
      type: "Mobile Money",
      status: "Completed"
    },
    {
      date: "05/06/2025",
      amount: "UGX 200,000",
      type: "Bank Transfer",
      status: "Completed"
    },
    {
      date: "01/06/2025",
      amount: "UGX 100,000",
      type: "Cash Deposit",
      status: "Completed"
    }
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">My Deposits</h1>

      <Card className="p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {deposits.map((deposit, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 whitespace-nowrap">{deposit.date}</td>
                  <td className="px-4 py-3 whitespace-nowrap font-medium">{deposit.amount}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{deposit.type}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
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
