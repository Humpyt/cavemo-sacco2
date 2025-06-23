import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';

export const ProfilePage = () => {
  const memberData = {
    name: "John Doe",
    memberId: "M-001234",
    phone: "+256 712 345 678",
    email: "john.doe@example.com",
    joinDate: "2023-01-15",
    shares: "UGX 500,000",
    savings: "UGX 1,200,000"
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">My Profile</h1>
      
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center">
            <Avatar size="lg" />
            <p className="mt-2 font-medium">{memberData.name}</p>
            <Button variant="outline" className="mt-4">
              Change Photo
            </Button>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500">Full Name</label>
              <p className="font-medium">{memberData.name}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Member ID</label>
              <p className="font-medium">{memberData.memberId}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Phone Number</label>
              <p className="font-medium">{memberData.phone}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <p className="font-medium">{memberData.email}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Join Date</label>
              <p className="font-medium">{memberData.joinDate}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Total Shares</label>
              <p className="font-medium">{memberData.shares}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Total Savings</label>
              <p className="font-medium">{memberData.savings}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline">Edit Profile</Button>
          <Button>Change Password</Button>
        </div>
      </Card>
    </div>
  );
};
