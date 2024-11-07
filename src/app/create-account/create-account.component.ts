import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Router } from '@angular/router';
import { SharedButtonComponent } from '../shared/components/shared-button/shared-button.component';
import { AccountService } from '../shared/services/account.service';
import { PageContainerComponent } from '../shared/components/page-container/page-container.component';
import { VALIDATION_CONSTANTS } from '../shared/constants/validation.constants';
const ACCOUNT_TYPES = ['Chequing', 'Saving'] as const;
const ACCOUNT_NAME_MIN_LENGTH = 3;
const ACCOUNT_NAME_MAX_LENGTH = 20;
const MIN_BALANCE = 0;

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    RouterModule,
    SharedButtonComponent,
    PageContainerComponent
  ],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  accountForm: FormGroup;
  accountTypes = ACCOUNT_TYPES;
  readonly MAX_ACCOUNT_NAME_LENGTH = VALIDATION_CONSTANTS.ACCOUNT.NAME.MAX_LENGTH;
  readonly VALIDATION_CONSTANTS = {
    ACCOUNT: {
      NAME: {
        REQUIRED_ERROR: 'Account name is required'
      }
    }
  };

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {
    this.accountForm = this.fb.group({
      accountType: ['', Validators.required],
      accountName: [
        '',
        [
          Validators.required,
          Validators.minLength(ACCOUNT_NAME_MIN_LENGTH),
          Validators.maxLength(ACCOUNT_NAME_MAX_LENGTH),
        ],
      ],
      balance: [MIN_BALANCE, [Validators.required, Validators.min(MIN_BALANCE)]],
    });
  }

  onSubmit() {
    if (this.accountForm.valid) {
      this.accountService.createAccount(this.accountForm.value);
      this.router.navigate(['/transfer-funds']);
    }
  }
}
