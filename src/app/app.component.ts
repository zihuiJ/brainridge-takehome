import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTabsModule,
    MatToolbarModule,
  ]
})
export class AppComponent {
  links = [
    { path: '/create-account', label: 'Create Account' },
    { path: '/transfer-funds', label: 'Transfer Funds' },
    { path: '/transaction-history', label: 'Transaction History' }
  ];
}
