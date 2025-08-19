import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dash-cards',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './dash-cards.html',
  styleUrl: './dash-cards.css',
})
export class DashCards {
  totalItems = 120;
  lowStockItems = 15;
  expiredItems = 8;
  outOfStockItems = 5;
}
