import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../store/products/product.model';

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  description: string;
  category: string;
  price: number;
  stockQty: number;
  minStock: number;
  status: 'Available' | 'Low Stock' | 'Expired' | 'Not Available';
  supplier: string;
  imgURL: string;
  lastUpd?: string;
  storageLoc?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.apiUrl);
  }

  createItem(item: InventoryItem): Observable<InventoryItem> {
    return this.http.post<InventoryItem>(this.apiUrl, item);
  }

  addProduct(product: any) {
    return this.http.post<any>('http://localhost:3000/products', product);
  }
  deleteProduct(id: string) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
  updateProduct(product: InventoryItem): Observable<InventoryItem> {
    return this.http.put<InventoryItem>(
      `http://localhost:3000/products/${product.id}`,
      product
    );
  }
}
