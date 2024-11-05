import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
  ],
  templateUrl: './create-account.component.html',
})
export class CreateAccountComponent {
  accountForm: FormGroup;
  accountTypes = ['Chequing', 'Saving'];

  constructor(private fb: FormBuilder) {
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
}
