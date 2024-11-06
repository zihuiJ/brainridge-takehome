import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-account-button',
  template: `
    <button mat-raised-button [disabled]="!isAccountSelected">
      Create {{ accountType ? accountType : 'Account' }}
    </button>
  `,
  standalone: true,
  imports: [MatButtonModule]
})
export class CreateAccountButtonComponent {
  @Input() isAccountSelected: boolean = false;
  @Input() accountType: string = '';
}

