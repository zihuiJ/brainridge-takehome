import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { AccountService } from '../shared/services/account.service';
import { Transaction } from '../shared/models/transaction.model';
import { Account } from '../shared/models/account.model';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule
  ]
})
export class TransactionHistoryComponent {
  displayedColumns: string[] = ['date', 'type', 'from', 'to', 'amount'];
  accounts$: Observable<Account[]>;
  transactions$: Observable<Transaction[]>;
  selectedAccountId: string = '';

  constructor(private accountService: AccountService) {
    this.accounts$ = this.accountService.getAccounts();
    this.transactions$ = this.accountService.getTransactions();
  }

  onAccountSelect(accountId: string) {
    if (accountId) {
      this.transactions$ = this.accountService.getTransactions().pipe(
        map(transactions => transactions.filter(transaction => 
          transaction.fromAccountId === accountId || 
          transaction.toAccountId === accountId
        ))
      );
    } else {
      // If no account selected (All Transactions), show all transactions
      this.transactions$ = this.accountService.getTransactions();
    }
  }
}
