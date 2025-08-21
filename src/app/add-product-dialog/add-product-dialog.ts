import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as ProductActions from '../store/products/product.actions';
import { InventoryItem } from '../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'add-product-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product-dialog.html',
})
export class AddProductDialog {
  productForm!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddProductDialog>,
    private store: Store,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { product?: InventoryItem }
  ) {
    this.productForm = this.fb.group({
      id: [null],
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

    if (data && data.product) {
      this.isEditMode = true;
      this.productForm.patchValue(data.product);
    }
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    const product = this.productForm.value;

    if (this.isEditMode) {
      this.store.dispatch(ProductActions.updateProduct({ product }));
      this.snackBar.open('Product updated successfully', undefined, {
        duration: 3000,
        verticalPosition: 'top',
      });
    } else {
      delete product.id;
      this.store.dispatch(ProductActions.addProduct({ product }));
      this.snackBar.open('Product added successfully', undefined, {
        duration: 3000,
        verticalPosition: 'top',
      });
    }
    this.dialogRef.close(true);
  }

  onClose() {
    this.dialogRef.close();
  }
}
