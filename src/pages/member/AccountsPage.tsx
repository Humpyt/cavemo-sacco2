import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/charts/StatCard';
import { Button } from '../../components/ui/Button';

export const AccountsPage = () => {
  const accounts = [
    {
      name: "Savings Account",
      number: "SA-001234",
      balance: "UGX 1,200,000",
      lastActivity: "12/06/2025"
    },
    {
      name: "Share Account", 
      number: "SH-001234",
      balance: "UGX 500,000",
      lastActivity: "05/06/2025"
    }
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">My Accounts</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accounts.map((account, index) => (
          <Card key={index} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{account.name}</h3>
                <p className="text-sm text-gray-500">{account.number}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Balance</p>
                <p className="font-bold">{account.balance}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Last Activity</p>
              <p>{account.lastActivity}</p>
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm">View Statement</Button>
              <Button variant="outline" size="sm">Transfer</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
