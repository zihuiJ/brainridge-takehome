import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Account } from '../models/account.model';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accounts = new BehaviorSubject<Account[]>([]);
  private transactions = new BehaviorSubject<Transaction[]>([]);

  constructor() {
    // Initialize with default accounts
    const defaultAccounts: Account[] = [
      {
        id: '1',
        accountType: 'Chequing',
        accountName: 'Main Chequing',
        balance: 2500
      },
      {
        id: '2',
        accountType: 'Saving',
        accountName: 'Emergency Fund',
        balance: 10000
      }
    ];

    // Set initial accounts
    this.accounts.next(defaultAccounts);

    // Create initial transactions
    const defaultTransactions: Transaction[] = [
      {
        id: '1',
        fromAccountId: '1',
        toAccountId: '2',
        amount: 500,
        date: new Date('2024-02-12'),
        type: 'Transfer',
        fromAccountName: 'Main Chequing',
        toAccountName: 'Emergency Fund'
      },
      {
        id: '2',
        fromAccountId: '2',
        toAccountId: '1',
        amount: 200,
        date: new Date('2024-03-16'),
        type: 'Transfer',
        fromAccountName: 'Emergency Fund',
        toAccountName: 'Main Chequing'
      }
    ];

    // Set initial transactions
    this.transactions.next(defaultTransactions);
  }

  getAccounts(): Observable<Account[]> {
    return this.accounts.asObservable();
  }

  getTransactions(): Observable<Transaction[]> {
    return this.transactions.asObservable();
  }

  createAccount(accountData: Omit<Account, 'id' | 'createdAt'>): void {
    const newAccount: Account = {
      ...accountData,
      id: crypto.randomUUID(),
    };

    const currentAccounts = this.accounts.getValue();
    this.accounts.next([...currentAccounts, newAccount]);

    // Record initial deposit as a transaction
    if (accountData.balance > 0) {
      this.recordTransaction({
        id: crypto.randomUUID(),
        fromAccountId: '',
        toAccountId: newAccount.id,
        amount: accountData.balance,
        date: new Date(),
        type: 'Initial Deposit',
        toAccountName: newAccount.accountName
      });
    }
  }

  transferFunds(fromAccountId: string, toAccountId: string, amount: number): boolean {
    const currentAccounts = this.accounts.getValue();
    const fromAccount = currentAccounts.find(acc => acc.id === fromAccountId);
    const toAccount = currentAccounts.find(acc => acc.id === toAccountId);

    if (!fromAccount || !toAccount || fromAccount.balance < amount) {
      return false;
    }

    // Create new array with updated balances
    const updatedAccounts = currentAccounts.map(account => {
      if (account.id === fromAccountId) {
        return { ...account, balance: account.balance - amount };
      }
      if (account.id === toAccountId) {
        return { ...account, balance: account.balance + amount };
      }
      return account;
    });

    // Update accounts BehaviorSubject
    this.accounts.next(updatedAccounts);

    // Record the transfer transaction
    this.recordTransaction({
      id: crypto.randomUUID(),
      fromAccountId,
      toAccountId,
      amount,
      date: new Date(),
      type: 'Transfer',
      fromAccountName: fromAccount.accountName,
      toAccountName: toAccount.accountName
    });

    return true;
  }

  private recordTransaction(transaction: Transaction): void {
    const currentTransactions = this.transactions.getValue();
    this.transactions.next([...currentTransactions, transaction]);
  }

  // Helper method to get current balance
  getAccountBalance(accountId: string): number {
    const account = this.accounts.getValue().find(acc => acc.id === accountId);
    return account?.balance ?? 0;
  }
}