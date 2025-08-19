import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../store/products/product.model';

export interface InventoryItem {
  id: number;
  name: string;
  sku: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  minStock: number;
  status: 'active' | 'low_stock' | 'out_of_stock' | 'expired';
  supplier: string;
  imageUrl: string;
  lastUpdated?: string;
  storageLocation?: string;
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


}