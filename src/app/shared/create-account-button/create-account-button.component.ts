import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-create-account-button',
  template: `<button mat-raised-button [disabled]="!isAccountSelected">Create Account</button>`
})
export class CreateAccountButtonComponent {
  @Input() isAccountSelected: boolean = false;
}

