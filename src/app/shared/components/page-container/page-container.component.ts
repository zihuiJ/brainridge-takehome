import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-page-container',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="page-container">
      <mat-card>
        <h4>{{ title }}</h4>
        <ng-content></ng-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .page-container {
      box-sizing: border-box;
    }
    
    h4 {
      margin-bottom: 1rem;
    }

    mat-card {
      margin: 0 auto;
    }
  `]
})
export class PageContainerComponent {
  @Input() title: string = '';
} 