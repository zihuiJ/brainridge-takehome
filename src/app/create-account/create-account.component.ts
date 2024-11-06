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
  accountTypes = ['Chequing', 'Saving'] as const;

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
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      balance: [0, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit() {
    if (this.accountForm.valid) {
      this.accountService.createAccount(this.accountForm.value);
      this.router.navigate(['/transfer-funds']);
    }
  }
}
