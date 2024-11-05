import { Routes } from '@angular/router';
import { CreateAccountComponent } from './create-account/create-account.component';
import { TransferFundsComponent } from './transfer-funds/transfer-funds.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';

export const routes: Routes = [
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'transfer-funds', component: TransferFundsComponent },
  { path: 'transaction-history', component: TransactionHistoryComponent },
  { path: '', redirectTo: '/create-account', pathMatch: 'full' },
];
