import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './product.actions';
import { ProductService } from '../../services/product.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions);
  private dataService = inject(ProductService);

  constructor() {}
  loadInventory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this.dataService.getProducts().pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error }))
          
          )
        )
      )
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.addProduct),
      mergeMap(({ product }) =>
        this.dataService.addProduct(product).pipe(
          map((newProduct) =>
            ProductActions.addProductSuccess({ product: newProduct })
          ),
          catchError((error) => of(ProductActions.addProductFailure({ error })))
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      mergeMap(({ id }) =>
        this.dataService.deleteProduct(id).pipe(
          map(() => ProductActions.deleteProductSuccess({ id })),
          catchError((error) => of(ProductActions.deleteProductFailure({ error })))
        )
      )
    )
  );
  updateProduct$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProductActions.updateProduct),
    mergeMap(({ product }) =>
      this.dataService.updateProduct(product).pipe(
        map((updatedProduct) =>
          ProductActions.updateProductSuccess({ product: updatedProduct })
        ),
        catchError((error) =>
          of(ProductActions.updateProductFailure({ error }))
        )
      )
    )
  )
);

}
