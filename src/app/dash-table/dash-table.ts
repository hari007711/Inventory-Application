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
import * as ProductActions from '../store/products/product.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  displayedColumns: string[] = [
    'id',
    'imgURL',
    'name',
    'price',
    'minStock',
    'stockQty',
    'category',
    'status',
    'sku',
    'storageLoc',
    'supplier',
    'lastUpd',
    'actions',
  ];
  showAddProductModal = false;
  dataSource = new MatTableDataSource<InventoryItem>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private store: Store,
    private snackBar: MatSnackBar
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.store.dispatch(loadProducts());
    this.store.select(selectAllProducts).subscribe((products) => {
      this.dataSource.data = products;
    });
  }

  setData(products: any[]) {
    this.dataSource.data = products;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @Output() addProductClick = new EventEmitter<void>();

  openAddProduct() {
    this.addProductClick.emit();
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
  deleteItem(element: any) {
    if (confirm(`Are you sure you want to delete ${element.name}?`)) {
      this.store.dispatch(ProductActions.deleteProduct({ id: element.id }));
      this.snackBar.open('Product deleted successfully', undefined, {
        duration: 3000,
        verticalPosition: 'top',
      });
    }
  }
  editItem(item: InventoryItem) {
    const dialogRef = this.dialog.open(AddProductDialog, {
      width: '60%',
      height: '700px',
      data: { product: item },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(loadProducts());
      }
    });
  }
}
