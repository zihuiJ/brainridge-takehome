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
import { AccountService } from '../shared/services/account.service';
import { Account } from '../shared/models/account.model';
import { Observable } from 'rxjs';

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
    MatListModule
  ]
})
export class TransferFundsComponent {
  transferForm: FormGroup;
  accounts$: Observable<Account[]>;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService
  ) {
    this.transferForm = this.fb.group({
      fromAccount: ['', Validators.required],
      toAccount: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
    });
    this.accounts$ = this.accountService.getAccounts();
  }
}
