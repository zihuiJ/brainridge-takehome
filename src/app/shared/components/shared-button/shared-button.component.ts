import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'shared-button', // renamed selector
  template: `
    <button
      mat-raised-button
      color="primary"
      [disabled]="disabled"
      (click)="onClick.emit()"
    >
      {{ buttonText }}
    </button>
  `,
  standalone: true,
  imports: [MatButtonModule],
})
export class SharedButtonComponent {
  @Input() buttonText: string = 'Submit'; // default text
  @Input() disabled: boolean = false;
  @Output() onClick = new EventEmitter<void>();
}
