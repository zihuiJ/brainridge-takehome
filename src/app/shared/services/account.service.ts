import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accounts = new BehaviorSubject<Account[]>([]);

  getAccounts(): Observable<Account[]> {
    return this.accounts.asObservable();
  }

  createAccount(accountData: Omit<Account, 'id' | 'createdAt'>): void {
    const newAccount: Account = {
      ...accountData,
      id: crypto.randomUUID(),
    };

    const currentAccounts = this.accounts.getValue();
    this.accounts.next([...currentAccounts, newAccount]);
  }

  getAccountById(id: string): Account | undefined {
    return this.accounts.getValue().find(account => account.id === id);
  }

  transferFunds(fromAccountId: string, toAccountId: string, amount: number): boolean {
    const currentAccounts = this.accounts.getValue();
    const fromAccount = currentAccounts.find(acc => acc.id === fromAccountId);
    const toAccount = currentAccounts.find(acc => acc.id === toAccountId);

    if (!fromAccount || !toAccount || fromAccount.balance < amount) {
      return false;
    }

    const updatedAccounts = currentAccounts.map(account => {
      if (account.id === fromAccountId) {
        return { ...account, balance: account.balance - amount };
      }
      if (account.id === toAccountId) {
        return { ...account, balance: account.balance + amount };
      }
      return account;
    });

    this.accounts.next(updatedAccounts);
    return true;
  }
}