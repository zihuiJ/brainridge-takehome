import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { AccountService } from '../shared/services/account.service';
import { Transaction } from '../shared/models/transaction.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ]
})
export class TransactionHistoryComponent{
  displayedColumns: string[] = ['date', 'type', 'from', 'to', 'amount'];
  transactions$: Observable<Transaction[]>;

  constructor(private accountService: AccountService) {
    this.transactions$ = this.accountService.getTransactions();
  }
}
