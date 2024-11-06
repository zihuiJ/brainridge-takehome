export interface Account {
    id: string;
    accountType: 'Chequing' | 'Saving';
    accountName: string;
    balance: number;
  }