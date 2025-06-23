import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

interface Message {
  id: number;
  date: string;
  subject: string;
  content: string;
  read: boolean;
}

export const CommunicationsPage = () => {
  const messages: Message[] = [
    { 
      id: 1, 
      date: '2025-06-20', 
      subject: 'Loan Approval Notification', 
      content: 'Your loan application has been approved. UGX 1,500,000 has been disbursed to your account.',
      read: false
    },
    { 
      id: 2, 
      date: '2025-06-15', 
      subject: 'Monthly Statement', 
      content: 'Your June 2025 statement is now available. Total savings balance: UGX 1,200,000',
      read: true
    },
    { 
      id: 3, 
      date: '2025-06-10', 
      subject: 'Dividend Payment', 
      content: 'A dividend payment of UGX 75,000 has been credited to your account.',
      read: true
    }
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Messages & Notifications</h1>
      
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Messages</h2>
          <Button>Compose New Message</Button>
        </div>

        <div className="space-y-2">
          {messages.map(message => (
            <Card key={message.id} className={`p-4 ${!message.read ? 'border-l-4 border-blue-500' : ''}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className={`font-medium ${!message.read ? 'text-blue-600' : ''}`}>{message.subject}</h3>
                  <p className="text-sm text-gray-500">{message.date}</p>
                  <p className="mt-2 text-gray-700">{message.content}</p>
                </div>
                {!message.read && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    New
                  </span>
                )}
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};
