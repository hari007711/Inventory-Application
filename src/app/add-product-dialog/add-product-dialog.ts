import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as ProductActions from '../store/products/product.actions';

@Component({
  selector: 'add-product-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product-dialog.html',
})
export class AddProductDialog {
  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddProductDialog>,
    private store: Store
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      sku: [''],
      category: [''],
      description: [''],
      price: [0],
      stockQty: [0],
      minStock: [0],
      status: [''],
      supplier: [''],
      storageLoc: [''],
      lastUpd: [''],
      imgURL: [''],
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    const newProduct = this.productForm.value;
    this.store.dispatch(ProductActions.addProduct({ product: newProduct }));
    this.dialogRef.close(true); 
  }
}