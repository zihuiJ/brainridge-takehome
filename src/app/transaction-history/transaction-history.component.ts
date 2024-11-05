import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class TransactionHistoryComponent {
  displayedColumns: string[] = ['date', 'description', 'amount'];
  transactions = [
    { date: '2024-11-05', description: 'Deposit', amount: 500 },
    { date: '2024-11-04', description: 'Withdrawal', amount: -200 }
  ];
}
