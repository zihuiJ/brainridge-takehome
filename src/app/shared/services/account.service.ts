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
}