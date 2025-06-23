import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/charts/StatCard';

export const MemberDashboard = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Member Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          title="Total Savings" 
          value="UGX 1,200,000" 
          change="+12%"
          icon="savings"
        />
        <StatCard 
          title="Active Loans" 
          value="UGX 1,500,000" 
          change="-5%"
          icon="loan"
        />
        <StatCard 
          title="Shares Value" 
          value="UGX 500,000" 
          change="+8%"
          icon="shares"
        />
      </div>

      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-2">
          <div className="flex justify-between border-b pb-2">
            <span>Deposit - 12/06/2025</span>
            <span className="text-green-600">+UGX 150,000</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span>Loan Payment - 10/06/2025</span>
            <span className="text-red-600">-UGX 75,000</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
