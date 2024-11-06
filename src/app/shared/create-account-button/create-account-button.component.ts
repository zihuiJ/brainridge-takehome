import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-account-button',
  template: `
    <button 
      mat-raised-button 
      color="primary"
      [disabled]="!isAccountSelected"
      (click)="onCreate.emit()"
    >
      Create {{ accountType ? accountType : 'Account' }}
    </button>
  `,
  standalone: true,
  imports: [MatButtonModule]
})
export class CreateAccountButtonComponent {
  @Input() isAccountSelected: boolean = false;
  @Input() accountType: string = '';
  @Output() onCreate = new EventEmitter<void>();
}
