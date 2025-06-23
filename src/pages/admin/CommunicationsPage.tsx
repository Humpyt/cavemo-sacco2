import { useState, useEffect, useRef } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Avatar } from '../../components/ui/Avatar';
import { Paperclip, Smile, Send, Check, CheckCheck } from 'lucide-react';

interface User {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
}

interface Message {
  id: string;
  sender: User;
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  replies?: Message[];
}

export const CommunicationsPage = () => {
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [newMessage, setNewMessage] = useState('');
  const [activeThread, setActiveThread] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock users data
  const users: User[] = [
    { id: '1', name: 'You', avatar: '', online: true },
    { id: '2', name: 'John Doe', avatar: '', online: true },
    { id: '3', name: 'Jane Smith', avatar: '', online: false },
  ];

  // Initialize empty message threads for each user
  useEffect(() => {
    const initialThreads: Record<string, Message[]> = {};
    users.slice(1).forEach(user => {
      initialThreads[user.id] = [];
    });
    setMessages(initialThreads);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() && activeThread) {
      const message: Message = {
        id: Date.now().toString(),
        sender: users[0], // Current user
        content: newMessage,
        timestamp: new Date(),
        status: 'sent'
      };
      
      setMessages(prev => ({
        ...prev,
        [activeThread]: [...(prev[activeThread] || []), message]
      }));
      setNewMessage('');
      
      // Simulate reply after 1-3 seconds
      setTimeout(() => {
        const replyUser = users.find(u => u.id === activeThread);
        if (replyUser) {
          const reply: Message = {
            id: Date.now().toString(),
            sender: replyUser,
            content: `Reply to: "${newMessage}"`,
            timestamp: new Date(),
            status: 'read'
          };
          setMessages(prev => ({
            ...prev,
            [activeThread]: [...(prev[activeThread] || []), reply]
          }));
        }
      }, 1000 + Math.random() * 2000);
    }
  };

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sent': return <Check className="h-3 w-3 text-gray-400" />;
      case 'delivered': return <CheckCheck className="h-3 w-3 text-gray-400" />;
      case 'read': return <CheckCheck className="h-3 w-3 text-blue-500" />;
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Sidebar with users */}
      <div className="w-64 border-r border-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-4">Team Members</h2>
        <div className="space-y-2">
          {users.slice(1).map((user) => (
            <div 
              key={user.id} 
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => setActiveThread(user.id)}
            >
              <div className="relative">
                <Avatar src={user.avatar} alt={user.name} />
                {user.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">
                  {user.online ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        <div className="border-b border-gray-200 p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">
            {activeThread ? `Chat with ${users.find(u => u.id === activeThread)?.name}` : 'Team Communications'}
          </h1>
          {activeThread && (
            <button 
              onClick={() => setActiveThread(null)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Back to all
            </button>
          )}
        </div>

        <Card className="flex-1 m-4 overflow-hidden flex flex-col">
          {/* Messages area */}
          <div className="flex-1 p-4 overflow-y-auto">
            {!activeThread ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500">Select a team member to start chatting</p>
              </div>
            ) : messages[activeThread]?.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500">Start a conversation with {users.find(u => u.id === activeThread)?.name}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages[activeThread]?.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender.id === '1' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs md:max-w-md rounded-lg p-3 ${message.sender.id === '1' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        {message.sender.id !== '1' && (
                          <Avatar src={message.sender.avatar} alt={message.sender.name} size="sm" />
                        )}
                        <span className="font-semibold">{message.sender.name}</span>
                        <span className="text-xs text-gray-500 ml-auto">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-gray-800">{message.content}</p>
                      {message.sender.id === '1' && (
                        <div className="flex justify-end mt-1">
                          {getStatusIcon(message.status)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-2">
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Paperclip className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Smile className="h-5 w-5" />
              </button>
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} className="gap-2">
                <Send className="h-4 w-4" />
                Send
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
