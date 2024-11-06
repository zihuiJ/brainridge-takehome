import { Component } from '@angular/core';
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
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    MatSnackBarModule
  ]
})
export class TransferFundsComponent {
  transferForm: FormGroup;
  accounts$: Observable<Account[]>;

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

    // Add validation for same account selection
    this.transferForm.get('toAccount')?.valueChanges.subscribe(() => {
      this.validateAccounts();
    });

    this.transferForm.get('fromAccount')?.valueChanges.subscribe((accountId) => {
      this.validateAccounts();
      this.updateAmountValidation(accountId);
    });
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
}
