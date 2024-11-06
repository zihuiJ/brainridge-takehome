import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule, Sort } from '@angular/material/sort';
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
    MatSelectModule,
    MatSortModule
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

  sortData(sort: Sort) {
    this.transactions$ = this.transactions$.pipe(
      map(transactions => {
        if (!sort.active || sort.direction === '') {
          return transactions;
        }

        return transactions.slice().sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return (sort.direction === 'asc' ? dateA - dateB : dateB - dateA);
        });
      })
    );
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
