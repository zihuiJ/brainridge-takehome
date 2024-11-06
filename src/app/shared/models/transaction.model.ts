export interface Transaction {
  id: string;
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  date: Date;
  type: 'Transfer' | 'Initial Deposit';
  fromAccountName?: string;
  toAccountName?: string;
} 