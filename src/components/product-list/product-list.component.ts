import { Component } from '@angular/core';
import { ProductService } from '../../app/services/product.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CategoryService } from '../../app/services/category.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule, RouterModule, NgIf, NgFor],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: any[] = [];
  categories: any[] = [];
  pageNumber = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;
  pages: number[] = [];
  pageSizes = [10, 50, 100];
  productName = '';
  sortBy = "";
  sortDirection = "";
  productCategory = '';
  minCost: number = 0;
  previousPageNumber = this.pageNumber;
  maxCost: number = 0;
  imageurl: any;
  constructor(private productService: ProductService, private categoryService: CategoryService, private toastr: ToastrService, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  loadProducts(): void {
    this.productService.getProducts(this.productName, this.productCategory, this.minCost, this.maxCost, this.sortBy, this.sortDirection, this.pageNumber, this.pageSize)
      .subscribe(response => {
        this.products = response.products;
        this.totalItems = response.totalItems;
        this.pageNumber = response.pageNumber;
        this.pageSize = response.pageSize;
        this.convertByteArrayToBase64(this.products);
        if (this.products.length === 0 && this.pageNumber >= 1) {
          this.toastr.info("No more record found for this search criteria");
        }
      });
  }

  onPageChanged(pageNumber: number): void {
    this.pageNumber = pageNumber;
    this.loadProducts();
  }

  searchProducts(): void {
    this.loadProducts();
  }

  convertByteArrayToBase64(products: any[]): void {
    products.forEach(product => {
      this.imageurl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `data:image/png;base64,${product.productPhoto}`
      );
    });
  }

  sortProducts(column: string): void {
    this.sortBy = column;
    this.loadProducts();
  }

  editProduct(productId: number): void {
    this.router.navigate(['/edit-product', productId]);
  }

  viewProduct(productId: number): void {
    this.router.navigate(['/product-detail', productId]);
  }

  AddProduct(): void {
    this.router.navigate(['/add-product']);
  }

  onPageSizeChanged(): void {
    this.pageNumber = 1;
    this.loadProducts();
  }

  clearSearch(): void {
    this.productName = '';
    this.productCategory = '';
    this.minCost = 0;
    this.maxCost = 0;
    this.pageNumber = 1;
    this.pageSize = 10;
    this.loadProducts();
  }
}
