import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AccountService } from '../shared/services/account.service';
import { Account } from '../shared/models/account.model';
import { Transaction } from '../shared/models/transaction.model';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { PageContainerComponent } from '../shared/components/page-container/page-container.component';
import { SharedButtonComponent } from '../shared/components/shared-button/shared-button.component';

@Component({
  selector: 'app-transfer-funds',
  templateUrl: './transfer-funds.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatSelectModule,
    MatSnackBarModule,
    PageContainerComponent,
    SharedButtonComponent
  ]
})
export class TransferFundsComponent implements OnDestroy {
  transferForm: FormGroup;
  accounts$: Observable<Account[]>;
  selectedFilterAccount: string = '';
  filteredTransactions$: Observable<Transaction[]>;
  private accountsSub?: Subscription;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) {
    this.accounts$ = this.accountService.getAccounts();
    
    this.transferForm = this.fb.group({
      fromAccount: ['', Validators.required],
      toAccount: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]]
    });

    // Subscribe to account changes to update validations
    this.accountsSub = this.accounts$.subscribe(() => {
      const fromAccountId = this.transferForm.get('fromAccount')?.value;
      if (fromAccountId) {
        this.updateAmountValidation(fromAccountId);
      }
    });

    // Add validation for same account selection
    this.transferForm.get('toAccount')?.valueChanges.subscribe(() => {
      this.validateAccounts();
    });

    this.transferForm.get('fromAccount')?.valueChanges.subscribe((accountId) => {
      this.validateAccounts();
      this.updateAmountValidation(accountId);
    });

    // Initialize filtered transactions
    this.filteredTransactions$ = this.accountService.getTransactions().pipe(
      map(transactions => this.selectedFilterAccount 
        ? transactions.filter(t => 
            t.fromAccountId === this.selectedFilterAccount || 
            t.toAccountId === this.selectedFilterAccount)
        : transactions
      )
    );
  }

  ngOnDestroy() {
    this.accountsSub?.unsubscribe();
  }

  private validateAccounts() {
    const fromAccount = this.transferForm.get('fromAccount')?.value;
    const toAccount = this.transferForm.get('toAccount')?.value;
    
    if (fromAccount && toAccount && fromAccount === toAccount) {
      this.transferForm.get('toAccount')?.setErrors({ sameAccount: true });
    }
  }

  private updateAmountValidation(accountId: string) {
    this.accounts$.subscribe(accounts => {
      const account = accounts.find(acc => acc.id === accountId);
      const maxBalance = account?.balance ?? 0;
      
      this.transferForm.get('amount')?.setValidators([
        Validators.required,
        Validators.min(0.01),
        Validators.max(maxBalance)
      ]);
      
      this.transferForm.get('amount')?.updateValueAndValidity();
    });
  }

  onSubmit() {
    if (this.transferForm.valid) {
      const { fromAccount, toAccount, amount } = this.transferForm.value;
      
      const success = this.accountService.transferFunds(
        fromAccount,
        toAccount,
        Number(amount)
      );

      if (success) {
        this.snackBar.open('Transfer successful!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.transferForm.reset({
          fromAccount: '',
          toAccount: '',
          amount: 0
        });
      } else {
        this.snackBar.open('Transfer failed. Please try again.', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    }
  }

  onFilterChange(accountId: string) {
    this.selectedFilterAccount = accountId;
    this.filteredTransactions$ = this.accountService.getTransactions().pipe(
      map(transactions => accountId 
        ? transactions.filter(t => 
            t.fromAccountId === accountId || 
            t.toAccountId === accountId)
        : transactions
      )
    );
  }
}
