import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const EWalletPage = () => {
  const wallets = [
    { provider: "MTN Mobile Money", number: "0772 123 456", balance: "UGX 250,000" },
    { provider: "Airtel Money", number: "0752 987 654", balance: "UGX 150,000" }
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">My E-Wallet</h1>
      
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Registered Wallets</h2>
          <Button>Add New Wallet</Button>
        </div>

        <div className="space-y-4">
          {wallets.map((wallet, index) => (
            <Card key={index} className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{wallet.provider}</h3>
                  <p className="text-sm text-gray-500">{wallet.number}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Balance</p>
                  <p className="font-bold">{wallet.balance}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm">Transfer</Button>
                <Button variant="outline" size="sm">Withdraw</Button>
                <Button variant="outline" size="sm">Deposit</Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};
