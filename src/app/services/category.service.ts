import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { ProductCategory } from '../models/product-category.model';
import { ProductSubCategory } from '../models/product-subcategory.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  private apiUrl = 'https://localhost:7145/api/Category';

    constructor(private http: HttpClient) { }

  getCategories(): Observable<ProductCategory[]> {
      return this.http.get<ProductCategory[]>(this.apiUrl);
  }

  getSubCategories(id : number): Observable<ProductSubCategory[]> {
    return this.http.get<ProductSubCategory[]>(`${this.apiUrl}/sub?productCategoryId=${id}`);
}


}
