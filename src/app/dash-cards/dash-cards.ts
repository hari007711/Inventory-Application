import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { InventoryItem } from '../services/product.service'; 
import { selectAllProducts } from '../store/products/product.selectors'; 
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dash-cards',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './dash-cards.html',
  styleUrls: ['./dash-cards.css'],
})
export class DashCards {
  products$: Observable<InventoryItem[]>;

  totalItems = 0;
  lowStockItems = 0;
  expiredItems = 0;
  outOfStockItems = 0;

  constructor(private store: Store) {
    this.products$ = this.store.select(selectAllProducts);

    this.products$.subscribe((products) => {
      this.totalItems = products.length;

      this.lowStockItems = products.filter(
        (p) => p.status === 'Low Stock'
      ).length;

      this.expiredItems = products.filter(
        (p) => p.status === 'Expired'
      ).length;

      this.outOfStockItems = products.filter(
        (p) => p.status === 'Not Available'
      ).length;
    });
  }
}
