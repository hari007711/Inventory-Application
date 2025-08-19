import {
  Component,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Product } from '../store/products/product.model';
import { InventoryItem, ProductService } from '../services/product.service';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { AddProductDialog } from '../add-product-dialog/add-product-dialog';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { loadProducts } from '../store/products/product.actions';
import { selectAllProducts } from '../store/products/product.selectors';

@Component({
  selector: 'app-dash-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './dash-table.html',
  styleUrls: ['./dash-table.css'],
})
export class DashTable implements AfterViewInit {
  displayedColumns: string[] = ['name', 'category', 'price', 'actions'];
  showAddProductModal = false;
  dataSource = new MatTableDataSource<InventoryItem>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private store: Store) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.store.dispatch(loadProducts());
    this.store.select(selectAllProducts).subscribe((products) => {
      this.dataSource.data = products;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  editItem(item: Product) {
    console.log('Edit:', item);
  }

  deleteItem(item: Product) {
    console.log('Delete:', item);
  }

  @Output() addProductClick = new EventEmitter<void>();

  openAddProduct() {
    this.addProductClick.emit();
    console.log('clicked button');
  }
  showModal = false;

  OpenPopUp() {
    const dialogRef = this.dialog.open(AddProductDialog, {
      width: '60%',
      height: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(loadProducts());
      }
    });
  }
}