import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { PaginatedProduct } from '../models/product-response.model';
import { ProductDetail } from '../models/product-detail.model';
import { ProductModel } from '../models/product-model.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://localhost:7145/api/Products';

  constructor(private http: HttpClient) { }

  getProducts(productName: string,
    productCategory: string, minCost: number, maxCost: number, sortBy: string, sortDirection: string, currentPage: number, pageSize: number): Observable<PaginatedProduct> {
    let params = new HttpParams()
      .set('currentPage', currentPage.toString())
      .set('pageSize', pageSize.toString());

    if (productName) {
      params = params.set('productName', productName);
    }
    if (productCategory) {
      params = params.set('productCategory', productCategory);
    }
    if (minCost !== null && minCost !== undefined && minCost != 0) {
      params = params.set('minCost', minCost.toString());
    }
    if (maxCost !== null && maxCost !== undefined && maxCost != 0) {
      params = params.set('maxCost', maxCost.toString());
    }

    if (sortBy) {
      params = params.set('sortBy', sortBy);
    }
    if (sortBy) {
      params = params.set('sortDirection', sortDirection);
    }

    return this.http.get<PaginatedProduct>(this.apiUrl, { params });
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
  getProductModels(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${this.apiUrl}/productmodel`);
  }

  getProductDetails(id: number): Observable<ProductDetail> {
    return this.http.get<ProductDetail>(`${this.apiUrl}/${id}/productdetail`);
  }

  createProduct(product: FormData): Observable<number> {
    return this.http.post<number>(this.apiUrl, product);
  }

  updateProduct(id: number, product: FormData): Observable<number> {
    return this.http.put<number>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
