import { createAction, props } from '@ngrx/store';
import { InventoryItem } from '../../services/product.service';

export const loadProducts = createAction('[Product] Load Products');
export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: InventoryItem[] }>()
);
export const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: any }>()
);

export const createItem = createAction(
  '[Inventory] Create Item',
  props<{ item: InventoryItem }>()
);

export const loadInventorySuccess = createAction(
  '[Inventory] Load Items Success',
  props<{ items: InventoryItem[] }>()
);
export const loadInventoryFailure = createAction(
  '[Inventory] Load Items Failure',
  props<{ error: any }>()
);

export const addProduct = createAction(
  '[Product] Add Product',
  props<{ product: any }>()
);

export const addProductSuccess = createAction(
  '[Product] Add Product Success',
  props<{ product: any }>()
);

export const addProductFailure = createAction(
  '[Product] Add Product Failure',
  props<{ error: any }>()
);

export const deleteProduct = createAction(
  '[Product] Delete Product',
  props<{ id: string }>()
);

export const deleteProductSuccess = createAction(
  '[Product] Delete Product Success',
  props<{ id: string }>()
);

export const deleteProductFailure = createAction(
  '[Product] Delete Product Failure',
  props<{ error: any }>()
);

export const updateProduct = createAction(
  '[Product] Update Product',
  props<{ product: InventoryItem }>()
);

export const updateProductSuccess = createAction(
  '[Product] Update Product Success',
  props<{ product: InventoryItem }>()
);

export const updateProductFailure = createAction(
  '[Product] Update Product Failure',
  props<{ error: any }>()
);
