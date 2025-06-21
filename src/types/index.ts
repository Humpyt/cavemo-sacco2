export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'staff' | 'member';
  memberNumber?: string;
  phoneNumber: string;
  idNumber: string;
  address: string;
  employerName?: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'suspended';
  profileImage?: string;
}

export interface Account {
  id: string;
  memberId: string;
  accountType: 'savings' | 'fixed' | 'special';
  balance: number;
  interestRate: number;
  openingDate: string;
  lastTransactionDate: string;
  status: 'active' | 'dormant' | 'closed';
}

export interface Loan {
  id: string;
  memberId: string;
  loanType: 'emergency' | 'development' | 'education' | 'business';
  principalAmount: number;
  interestRate: number;
  termMonths: number;
  monthlyPayment: number;
  outstandingBalance: number;
  applicationDate: string;
  approvalDate?: string;
  disbursementDate?: string;
  status: 'pending' | 'approved' | 'disbursed' | 'active' | 'completed' | 'defaulted';
  guarantors: string[];
  purpose: string;
}

export interface Transaction {
  id: string;
  memberId: string;
  accountId?: string;
  loanId?: string;
  type: 'deposit' | 'withdrawal' | 'loan_payment' | 'fine' | 'checkoff' | 'transfer';
  amount: number;
  description: string;
  date: string;
  status: 'pending' | 'completed' | 'failed';
  reference: string;
  channel: 'cash' | 'bank' | 'mobile_money' | 'checkoff';
}

export interface Fine {
  id: string;
  memberId: string;
  category: 'late_payment' | 'meeting_absence' | 'policy_violation' | 'other';
  amount: number;
  description: string;
  dateIssued: string;
  datePaid?: string;
  status: 'pending' | 'paid' | 'waived';
}

export interface Investment {
  id: string;
  name: string;
  type: 'fixed_deposit' | 'government_bonds' | 'treasury_bills' | 'real_estate' | 'equity';
  amount: number;
  interestRate: number;
  maturityDate: string;
  currentValue: number;
  status: 'active' | 'matured' | 'sold';
  purchaseDate: string;
}

export interface Communication {
  id: string;
  title: string;
  message: string;
  type: 'sms' | 'email' | 'push';
  recipients: string[];
  scheduledDate: string;
  sentDate?: string;
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
}

export interface DashboardStats {
  totalMembers: number;
  activeLoans: number;
  totalDeposits: number;
  monthlyGrowth: number;
  pendingApplications: number;
  totalInvestments: number;
}